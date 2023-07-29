const httpStatus = require('http-status');
const webhookUtil = require('../../utils/webhook.util');
const { logger } = require('../../../config/logger');

/**
   * consumes the queries recevied from users via twilio
   * @param req
   * @param res
   * @param next
   * @returns {Promise<*|Promise<any>>}
   */
exports.webhook = async (req, res, next) => {
  try {
    // should be pushed to queue for avoid losing the messages/ for scalablity
    webhookUtil.processMessage(req.body, req.file);
    return res.status(httpStatus.OK).json({
      code: httpStatus.OK,
      message: 'received response',
    });
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};
