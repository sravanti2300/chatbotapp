const _ = require('lodash');
const axios = require('axios');
const { logger } = require('./logger');

// Add a request interceptor
function addRequestLogInterceptor() {
  axios.interceptors.request.use((config) => {
    logger.info('Sending axios request', _.pick(config, ['url', 'method', 'data', 'params']));
    return config;
  }, (error) => {
    logger.error('Axios request failed', error);
    return Promise.reject(error);
  });
}

// Add a response interceptor
function addResponseLogInterceptor() {
  axios.interceptors.response.use((response) => {
    logger.info('Received axios response', _.pick(response, ['status', 'statusText', 'data']));
    return response;
  }, (error) => {
    if (!error.request && !error.response) {
      logger.error('Unexpected error when making HTTP request!', error);
    } else {
      logger.error('Error when making HTTP request!', {
        request: {
          method: error.request.method,
          path: error.request.path,
          data: error.request.data,
          params: error.request.params,
        },
        response: {
          status: _.get(error, 'response.status'),
          data: _.get(error, 'response.data'),
        },
      });
    }
    return Promise.reject(error);
  });
}

module.exports = { addRequestLogInterceptor, addResponseLogInterceptor };
