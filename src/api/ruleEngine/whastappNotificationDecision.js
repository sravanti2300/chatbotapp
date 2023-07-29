const {
  forEach, map, isEmpty,
} = require('lodash');
const { Engine, Rule } = require('json-rules-engine');
const { logger } = require('../../config/logger');
const mongoose = require('../../config/mongoose');

mongoose.connect();

const rules = require('../models/rules.model');
const config = require('../models/config.model');

let engine = new Engine();

exports.findWhatsappNotificationRules = async () => {
  const { notificationConst } = await config.constants();
  if (isEmpty(notificationConst)) {
    return [];
  }
  const ruleList = await rules.find({
    ruletype: notificationConst.ruleType.whatsapp,
    enabled: true,
  });
  let response = {};
  if (ruleList.length > 0) {
    response = map(ruleList, (rule) => rule.definition);
  }
  return response;
};

const addRulesToEngine = async () => {
  try {
    const ruleList = await this.findWhatsappNotificationRules();
    logger.info('loading whatsapp template rule', { noOfRules: ruleList.length });
    forEach(ruleList, (rule) => {
      engine.addRule(new Rule(rule));
    });
    logger.info('whatsapp notification Engine added successfully');
  } catch (err) {
    logger.error('Error in loading call whatsapp notification rule', err);
    throw err;
  }
};

exports.initializeEngine = async () => {
  engine = new Engine();
  await addRulesToEngine();
};

this.initializeEngine();

exports.runEngine = async (fact) => {
  try {
    const response = await engine.run(fact);
    if (response.events.length === 0) {
      logger.info('No rules matched for the given input to whatsapp notification Template Engine');
      return {
      };
    }
    return response.events[0].params;
  } catch (err) {
    logger.error('Some error occurred in evaluating rules', err);
    return {
    };
  }
};
