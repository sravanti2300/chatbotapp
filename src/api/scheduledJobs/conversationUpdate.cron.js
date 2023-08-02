const { Promise } = require('bluebird');
const moment = require('moment');
const _ = require('lodash');
const redisUtil = require('../utils/redis.util');
const sessionModel = require('../models/session.model');

module.exports = {
  name: 'DailyConversationUpdateCron',
  frequency: '1 minute',
  fn: async () => {
    const from = moment().subtract(5, 'hours').toISOString();
    // const to = moment().utc().subtract(1, 'minute').toISOString();
    const latestSessions = await sessionModel.find({
      updatedAt: { $gte: from },
      status: 'created',
    });
    await Promise.map(latestSessions, async (eachSession) => {
      let cachedValue = await redisUtil.getFromCache(eachSession.usernumber);
      cachedValue = !_.isEmpty(cachedValue) ? JSON.parse(cachedValue) : {};
      if (_.isEmpty(cachedValue)) {
        await sessionModel.findOneAndUpdate({
          usernumber: eachSession.usernumber,
          status: 'created',
        }, {
          status: 'completed',
          userInfo: cachedValue.data,
          convlog: [...eachSession.convlog, ...cachedValue.convlog],
        });
      } else if (!_.isEmpty(cachedValue.convlog)) {
        await sessionModel.findOneAndUpdate({
          usernumber: eachSession.usernumber,
          status: 'created',
        }, {
          userInfo: cachedValue.data,
          convlog: [...eachSession.convlog, ...cachedValue.convlog],
        });
        await redisUtil.setToCache(eachSession.usernumber, JSON.stringify({
          option: cachedValue.option,
          sessionId: eachSession.id,
          language: cachedValue.language,
          type: cachedValue.type,
          status: cachedValue.status,
          convlog: [],
          data: cachedValue.data,
        }));
      }
    });
  },
};
