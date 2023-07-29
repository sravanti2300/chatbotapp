const httpStatus = require('http-status');
const moment = require('moment');
const Template = require('../../models/templates.model');

/**
 * Create Template
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const template = await Template.create(req.body);
    return res.status(httpStatus.CREATED).json({ code: httpStatus.CREATED, message: ' Template created successfully', template });
  } catch (error) {
    return next(error);
  }
};

/**
 * Read Template
 * @public
 */
exports.read = async (req, res, next) => {
  try {
    const template = await Template.findOne({
      _id: req.params.id,
      archived: false,
    });

    if (template) {
      return res.status(httpStatus.OK).json({ code: httpStatus.OK, message: ' Template fetched successfully', template });
    }
    return res.status(httpStatus.NOT_FOUND).json({ code: httpStatus.NOT_FOUND, message: 'Resource not found' });
  } catch (error) {
    return next(error);
  }
};

/**
 * List Template
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const templates = await Template.find({ archived: false });

    return res.status(httpStatus.OK).json({ code: httpStatus.OK, message: ' Template(s) fetched successfully', templates });
  } catch (error) {
    return next(error);
  }
};

/**
 * Update Template
 * @public
 */
exports.update = async (req, res, next) => {
  try {
    const template = await Template.findOneAndUpdate({
      _id: req.params.id,
      archived: false,
    }, req.body, {
      new: true,
    });

    if (template) {
      return res.status(httpStatus.OK).json({ code: httpStatus.OK, message: ' Template updated successfully', template });
    }
    return res.status(httpStatus.NOT_FOUND).json({ code: httpStatus.NOT_FOUND, message: 'Resource not found' });
  } catch (error) {
    return next(error);
  }
};

/**
 * Delete Template
 * @public
 */
exports.delete = async (req, res, next) => {
  try {
    const template = await Template.findOneAndUpdate({
      _id: req.params.id,
      archived: false,
    }, {
      archived: true,
      archivedAt: moment().toISOString(),
    });

    if (template) {
      return res.status(httpStatus.NO_CONTENT);
    }
    return res.status(httpStatus.NOT_FOUND).json({ code: httpStatus.NOT_FOUND, message: 'Resource not found' });
  } catch (error) {
    return next(error);
  }
};
