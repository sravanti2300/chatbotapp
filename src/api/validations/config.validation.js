const { Joi, Segments } = require('celebrate');

module.exports = {
  // POST /api/v1/config/
  create: {
    [Segments.BODY]: {
      key: Joi.string().required(),
      value: Joi.required(),
      description: Joi.string().allow(''),
    },
  },

  // GET /api/v1/config/
  read: {
    [Segments.QUERY]: {
      id: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
    },
  },

  // PUT /api/v1/config/
  update: {
    [Segments.PARAMS]: {
      id: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
    },
    [Segments.BODY]: {
      key: Joi.string().required(),
      value: Joi.required(),
      description: Joi.string().allow(''),
    },
  },

  // DELETE /api/v1/config/
  remove: {
    [Segments.PARAMS]: {
      id: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
    },
  },
};
