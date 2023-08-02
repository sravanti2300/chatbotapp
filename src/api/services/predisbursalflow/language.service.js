/* eslint-disable no-unused-vars */

const _ = require('lodash');
const ruleEngineUtils = require('../../utils/ruleEngine.util');
const redisUtil = require('../../utils/redis.util');
const templateModel = require('../../models/templates.model');
const twilioService = require('../twilio.service');

// currently populating randomly
const populateRequiredDynamicData = (customData, eventData, language) => {
  const dynamicData = {};
  // if (_.includes(customData, 'time') || _.includes(customData, 'date')) {
  //   dynamicData = {
  //     time: '3:00 PM',
  //     date: 'July 30',
  //   };
  // }
  // if (_.isEmpty(dynamicData)) {
  //   // eslint-disable-next-line no-param-reassign
  //   eventData.templateName = `SlotNotReturned${language}`;
  // }
  return dynamicData;
};

const processMessage = async ({
  reqPaylod,
  sessionId,
  language,
  receiver,
  status,
  type,
  convlog,
  data,
}) => {
  const { Body: userInput, To: sender } = reqPaylod;
  const params = {
    statusname: status,
    language,
    option: parseInt(userInput, 10),
  };
  if (_.isNaN(params.option)) params.option = null;
  const eventData = await ruleEngineUtils.getnotificationTemplate(params, type);
  const {
    templateName, statusUpdate, newStatus, language: updatedLanguage,
  } = eventData;
  const templateData = await templateModel.findOne({ name: !_.isEmpty(eventData) ? templateName : `errorTemplate${language}` });
  let dynamicData = {};
  if (!_.isEmpty(templateData.customdata)) {
    dynamicData = populateRequiredDynamicData(templateData.customdata, eventData, language);
  }
  const content = await templateData.render(dynamicData || {});
  let changedParams = {};
  if (updatedLanguage || statusUpdate) {
    changedParams = {
      language: updatedLanguage || language,
      status: statusUpdate ? newStatus : status,
    };
  }
  await redisUtil.setToCache(receiver, JSON.stringify({
    sessionId,
    type,
    language,
    status,
    ...changedParams,
    convlog: [...convlog, { type: 'user', message: userInput }, { type: 'bot', message: content }],
    data,
  }));

  await twilioService.send({ content, receiver, sender });
};

exports.processMessage = processMessage;
