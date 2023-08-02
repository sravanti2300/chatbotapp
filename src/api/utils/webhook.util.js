const _ = require('lodash');
const redisUtils = require('./redis.util');
const sessionModel = require('../models/session.model');
const statusService = require('../services/predisbstatusservice');

const fetchUserSessionData = async (phoneNumber) => {
  let cachedValue = await redisUtils.getFromCache(phoneNumber);
  cachedValue = !_.isEmpty(cachedValue) ? JSON.parse(cachedValue) : {};
  if (_.isEmpty(cachedValue)) {
    await sessionModel.updateMany({
      usernumber: phoneNumber,
    }, {
      status: 'completed',
    });
    const sessionData = await sessionModel.create({
      usernumber: phoneNumber,
    });
    const sessionInfo = {
      sessionId: sessionData.id,
      status: 'languageStage',
      language: sessionData.language,
      type: sessionData.type,
      convlog: [],
      data: {},
    };
    await redisUtils.setToCache(phoneNumber, JSON.stringify(sessionInfo), 'EX', 3600);
    return sessionInfo;
  }
  return cachedValue;
};

const processMessage = async (reqPaylod) => {
  const { From: receiver } = reqPaylod;
  const {
    sessionId, status, language, type, convlog, data,
  } = await fetchUserSessionData(receiver);
  await statusService[status].processMessage({
    reqPaylod,
    sessionId,
    language,
    receiver,
    status,
    type,
    convlog,
    data,
  });
};

exports.processMessage = processMessage;
