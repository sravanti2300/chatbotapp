const { pick, isEmpty, isNumber } = require('lodash');
const whatsappNotificationEngine = require('../ruleEngine/whastappNotificationDecision');

const config = require('../models/config.model');
const { logger } = require('../../config/logger');

exports.getnotificationTemplate = async (params, type) => {
  const { notificationConst, triggerRuleEngine } = await config.constants();
  if (triggerRuleEngine) {
    await whatsappNotificationEngine.initializeEngine();
    await config.findOneAndUpdate({ key: 'triggerRuleEngine' }, { value: false });
  }
  // validate params to rule engine
  logger.info('Calling notification template engine with params', params);
  const ruleEngineInput = pick(params, ['statusname', 'language', 'option']);

  let queryDecision = {};
  if (isEmpty(ruleEngineInput.language)) {
    ruleEngineInput.language = null;
  }
  if (!isNumber(ruleEngineInput.option)
   || (!isNumber(ruleEngineInput.option) && isEmpty(ruleEngineInput.option))) {
    ruleEngineInput.option = null;
  }
  if (isEmpty(ruleEngineInput.statusname)) {
    throw new Error('Invalid params: stage cannot be empty');
  }
  switch (type) {
    case notificationConst.ruleType.whatsapp:
      queryDecision = await whatsappNotificationEngine.runEngine(ruleEngineInput);
      break;
    default:
      logger.info(`no queryEngine found for this issue/subIssue Data::${type}`);
      break;
  }
  logger.info('Received response from Notification Template engine', queryDecision);
  return queryDecision;
};
