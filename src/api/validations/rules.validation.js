const { Joi, Segments } = require('celebrate');

module.exports = {
  addNewRule: {
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      ruletype: Joi.string().required(),
      enabled: Joi.boolean().valid(true, false).required(),
      priority: Joi.number(),
      definition: Joi.object().keys({
        conditions: Joi.object().keys({
          all: Joi.array().items(Joi.object({
            fact: Joi.string().required(),
            operator: Joi.string().required(),
            value: Joi.required().allow(''),
          }).unknown(false)),
        }).unknown(true),
        event: Joi.object().keys({
          type: Joi.string().required(),
          params: Joi.object(),
        }).unknown(false),
      }).unknown(false),
    }).unknown(false),
  },
  update: {
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }).unknown(false),
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string(),
      ruletype: Joi.string(),
      definition: Joi.object().keys({
        conditions: Joi.object().keys({
          all: Joi.array().items(Joi.object({
            fact: Joi.string().required(),
            operator: Joi.string().required(),
            value: Joi.required().allow(''),
          }).unknown(false)),
        }).unknown(true),
        event: Joi.object().keys({
          type: Joi.string().required(),
          params: Joi.object(),
        }).unknown(false),
      }).unknown(false),
      enabled: Joi.boolean().valid(true, false),
      priority: Joi.number(),
    }).unknown(false),
  },
  notificationTemplateRule: {
    [Segments.BODY]: Joi.object().keys({
      category4: Joi.string().required(),
      issue: Joi.string().required(),
      subIssue: Joi.string().required(),
      language: Joi.string().required(),
      type: Joi.string().required(),
    }).unknown(true),
  },
  enable: {
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }).unknown(false),
  },
  disable: {
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }).unknown(false),
  },
};
