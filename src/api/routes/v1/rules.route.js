const express = require('express');
const { celebrate: validate } = require('celebrate');
const controller = require('../../controllers/v1/rules.controller');
const {
  addNewRule,
  notificationTemplateRule,
  update,
  enable,
  disable,
} = require('../../validations/rules.validation');

const router = express.Router();

router
  .route('/addRule')
  /**
   * @api {post} api/v1/rules/addRule
   * @apiDescription Adding Rules to JSON rules engine
   * @apiVersion 1.0.0
   * @apiName Rule Engine API
   * @apiGroup Agent
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization  User's access token
   *
   * @apiSuccess {Array} agents List of agents.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only opsadmins or citymanagers can access the data
   */
  .post(validate(addNewRule), controller.addNewRule);

router
  .route('/executeNotificationTemplateRule')
  /**
   * @api {post} api/v1/rules/executeNotificationTemplateRule
   * @apiDescription execute NotificationTemplate Rule
   * @apiVersion 1.0.0
   * @apiName Comaplaint Management Notification Template rule engine execution
   * @apiGroup Agent
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization  User's access token
   *
   * @apiSuccess {Array} agents List of agents.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only opsadmins or citymanagers can access the data
   */
  .post(validate(notificationTemplateRule), controller.executeNotificationTemplateRule);

router
  .route('/enable/:id')
  /**
   * @api {put} api/v1/rules/enable
   * @apiDescription Enable a particular rule in rule collection
   * @apiVersion 1.0.0
   * @apiName rule enable
   * @apiGroup Agent
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization  User's access token
   *
   * @apiSuccess {Array} agents List of agents.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only opsadmins can access the data
   */
  .put(validate(enable), controller.enable);

router
  .route('/disable/:id')
  /**
   * @api {put} api/v1/rules/disable
   * @apiDescription Disable a particular rule in rule collection
   * @apiVersion 1.0.0
   * @apiName rule disable
   * @apiGroup Agent
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization  User's access token
   *
   * @apiSuccess {Array} agents List of agents.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only opsadmins can access the data
   */
  .put(validate(disable), controller.disable);

router
  .route('/update/:id')
  /**
   * @api {put} api/v1/rules/update
   * @apiDescription Update a particular rule in rule collection
   * @apiVersion 1.0.0
   * @apiName rule Updation
   * @apiGroup Agent
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization  User's access token
   *
   * @apiSuccess {Array} agents List of agents.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only opsadmins or citymanagers can access the data
   */
  .put(validate(update), controller.update);

router
  .route('/')
  /**
   * @api {put} api/v1/rules/list
   * @apiDescription List a particular rule in rule collection
   * @apiVersion 1.0.0
   * @apiName rule List
   * @apiGroup Agent
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization  User's access token
   *
   * @apiSuccess {Array} agents List of agents.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only opsadmins or citymanagers can access the data
   */
  .get(controller.list);

module.exports = router;
