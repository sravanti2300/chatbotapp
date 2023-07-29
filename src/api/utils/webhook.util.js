const moment = require('moment');
const _ = require('lodash');
const redisUtils = require('./redis.util');
const sessionModel = require('../models/session.model');
const statusService = require('../services/predisbstatusservice');

const fetchUserSessionData = async (phoneNumber) => {
  let cachedValue = await redisUtils.getFromCache(phoneNumber);
  cachedValue = !_.isEmpty(cachedValue) ? JSON.parse(cachedValue) : {};
  if (_.isEmpty(cachedValue)) {
    const sessionData = await sessionModel.findOneAndUpdate({
      usernumber: phoneNumber,
      createdAt: { $gte: moment().subtract(1, 'hours') },
    }, {
      usernumber: phoneNumber,
    }, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    });
    const sessionInfo = {
      sessionId: sessionData.id,
      status: 'languageStage',
      language: sessionData.language,
      type: sessionData.type,
      convlog: [],
    };
    await redisUtils.setToCache(phoneNumber, JSON.stringify(sessionInfo));
    return sessionInfo;
  }
  return cachedValue;
};

const processMessage = async (reqPaylod, file) => {
  const { From: receiver } = reqPaylod;
  const {
    sessionId, status, language, type, convlog,
  } = await fetchUserSessionData(receiver);
  await statusService[status].processMessage({
    reqPaylod,
    sessionId,
    language,
    receiver,
    status,
    type,
    convlog,
    file,
  });
};

exports.processMessage = processMessage;
