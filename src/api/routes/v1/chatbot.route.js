const express = require('express');
const controller = require('../../controllers/v1/chatbot.controller');

const router = express.Router();

router
  .route('/twiliowebhook')
/**
     * @api {post} api/v1/chatbot/twiliowebhook Get
     * @apiDescription process the query received by user
     * @apiVersion 1.0.0
     * @apiName auth generate
     * @apiGroup auth
     */
  .post(controller.webhook);

module.exports = router;
