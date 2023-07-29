const httpStatus = require('http-status');
const { pick } = require('lodash');
const config = require('../../models/config.model');

/**
 * create config
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const params = pick(req.body, ['key', 'value', 'description']);

    const isKeyPresent = await config.findOne({ key: params.key });
    if (isKeyPresent) {
      return res.status(httpStatus.BAD_REQUEST).json({ code: httpStatus.BAD_REQUEST, message: `Key ${params.key} already present` });
    }
    await config.create(params);

    return res.status(httpStatus.OK).json({ code: httpStatus.OK, message: 'Config added successfully' });
  } catch (err) {
    return next(err);
  }
};

/**
 * read config
 * @public
 */
exports.read = async (req, res, next) => {
  try {
    const key = pick(req.query, ['id']);
    const response = await config.findOne({ _id: key.id });
    return res.status(httpStatus.OK).json({ code: httpStatus.OK, message: 'Config read successfully', data: response });
  } catch (err) {
    return next(err);
  }
};

/**
 * update config
 * @public
 */
exports.update = async (req, res, next) => {
  try {
    const key = pick(req.params, ['id']);
    const params = pick(req.body, ['key', 'value', 'description']);
    const response = await config
      .findOneAndUpdate({ _id: key.id }, params, { new: true });
    if (response) {
      return res.status(httpStatus.OK).json({ code: httpStatus.OK, message: 'Config updated successfully', data: response });
    }
    return res.status(httpStatus.NOT_FOUND).json({ code: httpStatus.NOT_FOUND, message: 'Resource not found' });
  } catch (err) {
    return next(err);
  }
};

/**
 * delete config
 * @public
 */
exports.delete = async (req, res, next) => {
  try {
    const key = pick(req.params, ['id']);
    await config.deleteMany({ _id: key.id });
    return res.status(httpStatus.OK).json({ code: httpStatus.OK, message: 'Config deleted successfully' });
  } catch (err) {
    return next(err);
  }
};
