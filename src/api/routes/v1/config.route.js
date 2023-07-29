const express = require('express');
const { celebrate: validate } = require('celebrate');
const controller = require('../../controllers/v1/config.controller');

const router = express.Router();
const {
  create,
  remove,
  read,
  update,
} = require('../../validations/config.validation');

router
  .route('/enable')
  /**
   * @api {post} api/v1/config/enable add feature for create collection
   * @apiDescription Add feature for create collection
   * @apiVersion 1.0.0
   * @apiName create
   * @apiGroup Config
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization  User's access token
   *
   * @apiSuccess {Object} Users
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admin can access the data
   */
  .post(validate(create), controller.create);

router
  .route('/')
  /**
   * @api {post} api/v1/config/enable add feature for create collection
   * @apiDescription Add feature for create collection
   * @apiVersion 1.0.0
   * @apiName create
   * @apiGroup Config
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization  User's access token
   *
   * @apiSuccess {Object} Users
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admin can access the data
   */
  .get(validate(read), controller.read);

router
  .route('/update/:id')
  /**
   * @api {post} api/v1/config/update add feature for config collection
   * @apiDescription update feature for config collection
   * @apiVersion 1.0.0
   * @apiName update
   * @apiGroup Config
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization  User's access token
   *
   * @apiSuccess {Object} Users
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admin can access the data
   */
  .put(validate(update), controller.update);

router
  .route('/disable/:id')
  /**
   * @api {post} api/v1/config/disable add feature for config collection
   * @apiDescription delete feature for config collection
   * @apiVersion 1.0.0
   * @apiName delete
   * @apiGroup Config
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization  User's access token
   *
   * @apiSuccess {Object} Users
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admin can access the data
   */
  .delete(validate(remove), controller.delete);

module.exports = router;
