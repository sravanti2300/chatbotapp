const express = require('express');
const { celebrate: validate } = require('celebrate');
const controller = require('../../controllers/v1/template.controller');
const {
  create,
  read,
  update,
  remove,
} = require('../../validations/templates.validation');

const router = express.Router();

router
  .route('/')
  /**
   * @api {post} api/v1/templates Create  Template
   * @apiDescription Create  Template
   * @apiVersion 1.0.0
   * @apiName Create
   * @apiGroup Template
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization  User's access token
   *
   * @apiSuccess {Object} Template
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admin can access the data
   */
  .post(validate(create), controller.create);

router
  .route('/')
  /**
   * @api {get} api/v1/templates List  Template
   * @apiDescription List  Template
   * @apiVersion 1.0.0
   * @apiName List
   * @apiGroup Template
   * @apiPermission client
   *
   * @apiHeader {String} Authorization  User's access token
   *
   * @apiSuccess {Array} Templates
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only client can access the data
   */
  .get(controller.list);

router
  .route('/:id')
  /**
   * @api {get} api/v1/templates/:id Read  Template
   * @apiDescription Read  Template
   * @apiVersion 1.0.0
   * @apiName Read
   * @apiGroup Template
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization  User's access token
   *
   * @apiSuccess {Object} Template
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admin can access the data
   */
  .get(validate(read), controller.read);

router
  .route('/:id')
  /**
   * @api {put} api/v1/templates/:id Update  Template
   * @apiDescription Update  Template
   * @apiVersion 1.0.0
   * @apiName Update
   * @apiGroup Template
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization  User's access token
   *
   * @apiSuccess {Object} Template
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admin can access the data
   */
  .put(validate(update), controller.update);

router
  .route('/:id')
  /**
   * @api {delete} api/v1/templates/:id Delete  Template
   * @apiDescription Delete  Template
   * @apiVersion 1.0.0
   * @apiName Delete
   * @apiGroup Template
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization  User's access token
   *
   * @apiSuccess {Object} sucess/failure
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admin can access the data
   */
  .delete(validate(remove), controller.delete);

module.exports = router;
