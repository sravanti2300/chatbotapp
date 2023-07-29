const httpStatus = require('http-status');

const { pick, isEmpty } = require('lodash');
const ruleEngineUtils = require('../../utils/ruleEngine.util');
const whatsappNotificationEngine = require('../../ruleEngine/whastappNotificationDecision');
const rules = require('../../models/rules.model');

/**
 * adding new rule in JSON rule engine
 * @public
 */
exports.addNewRule = async (req, res, next) => {
  try {
    const params = pick(req.body, ['ruletype', 'name', 'enabled']);
    const isNamePresent = await rules.findOne({ name: params.name });
    if (isNamePresent) {
      return res.status(httpStatus.BAD_REQUEST).json({ code: httpStatus.BAD_REQUEST, message: `rule ${params.name} already present` });
    }
    params.definition = JSON.stringify(req.body.definition);
    await rules.create(params);
    await whatsappNotificationEngine.initializeEngine();
    return res.status(httpStatus.OK).json({ code: httpStatus.OK, message: 'Rule Added successfully' });
  } catch (err) {
    return next(err);
  }
};

/**
 * executing notification template rule
 * @public
 */
exports.executeNotificationTemplateRule = async (req, res, next) => {
  try {
    const params = req.body;
    await whatsappNotificationEngine.initializeEngine();
    const result = await ruleEngineUtils.getnotificationTemplate(params, req.body.type);
    return res.status(httpStatus.OK).json(
      {
        code: httpStatus.OK,
        message: 'Fact was executed successfully',
        data: result,
      },
    );
  } catch (err) {
    return next(err);
  }
};

/**
 * updating notification template rule
 * @public
 */
exports.update = async (req, res, next) => {
  try {
    const key = pick(req.params, ['id']);
    const params = pick(req.body, ['name', 'enabled', 'definition']);
    if (isEmpty(params)) {
      return res.status(httpStatus.OK).json({
        status: httpStatus.BAD_REQUEST,
        message: 'Either of fields: name, enabled, definition must be present',
        errors: 'Invalid update params',
      });
    }
    if (!isEmpty(params.definition)) {
      params.definition = JSON.stringify(params.definition);
    }
    const response = await rules.findOneAndUpdate(
      {
        _id: key.id,
      },
      params,
      {
        new: true,
      },
    );
    await whatsappNotificationEngine.initializeEngine();
    return res.status(httpStatus.OK).json({ code: httpStatus.OK, message: 'Rule updated successfully', data: response });
  } catch (err) {
    return next(err);
  }
};

/**
 * enabling notification template rule
 * @public
 */
exports.enable = async (req, res, next) => {
  try {
    const key = pick(req.params, ['id']);
    const updatedRule = await rules
      .findOneAndUpdate({ _id: key.id }, { enabled: true }, { upsert: true, new: true });
    await whatsappNotificationEngine.initializeEngine();
    return res.status(httpStatus.OK).json({ code: httpStatus.OK, message: 'Rule enabled successfully', updatedRule });
  } catch (err) {
    return next(err);
  }
};

/**
 * disabling notification template rule
 * @public
 */
exports.disable = async (req, res, next) => {
  try {
    const key = pick(req.params, ['id']);
    const updatedRule = await rules
      .findOneAndUpdate({ _id: key.id }, { enabled: false }, { upsert: true, new: true });
    await whatsappNotificationEngine.initializeEngine();
    return res.status(httpStatus.OK).json({ code: httpStatus.OK, message: 'Rule disabled successfully', updatedRule });
  } catch (err) {
    return next(err);
  }
};

/**
 * list notification template rules
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const rulesList = !isEmpty(req.query) ? await rules.find(req.query) : await rules.find();
    return res.status(httpStatus.OK).json({ code: httpStatus.OK, message: 'rules List fetched successfully', rulesList });
  } catch (err) {
    return next(err);
  }
};
