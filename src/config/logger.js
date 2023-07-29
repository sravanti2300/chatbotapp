const winston = require('winston');
const expressWinston = require('express-winston');
const _ = require('lodash');

const commonLogInfoFormatter = winston.format((info, options) => {
  const topLevelKeysToRemapWhenPresent = [
    'level', 'timestamp', 'message', 'line', 'file', 'threadID',
  ];

  const logInfoToNest = _.chain(info)
    .pick(topLevelKeysToRemapWhenPresent)
    .merge({ type: options.type })
    .value();
  return _.chain(info)
    .merge({ log: logInfoToNest })
    .omit(topLevelKeysToRemapWhenPresent)
    .value();
});
/**
 A custom formatter that lifts up request and response information from
 under the `meta` key, and puts it at the top level of the info object.
 Before returning the updated info object, we also clean up sensitive keys
 from the request part, and we remove the now-redundant meta map.
 */
const middlewareRequestResponseFormatter = winston.format((info) => {
  _.chain(info)
    .merge(
      {
        req: _.get(info, 'meta.req'),
        res: _.get(info, 'meta.res'),
      },
    )
    .omit([ // remove sensitive as well as unnecessary or redundant info
      'meta',
      'req.headers.authorization',
      'req.headers.cookie',
      'req.headers["x-auth-token"]',
      'req.headers["x-consumer-profile"]',
    ])
    .value();
});

//
// MIDDLEWARE LOGGER
//
exports.middlewareLogger = expressWinston.logger({
  format: winston.format.combine(
    winston.format.timestamp(),
    middlewareRequestResponseFormatter(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.Console(),
  ],
  expressFormat: true,
  requestWhitelist: [...expressWinston.requestWhitelist, 'body'],
  responseWhitelist: [...expressWinston.responseWhitelist, 'body'],
});
//
// APPLICATION LOGGER
//
exports.logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    commonLogInfoFormatter({ type: 'app' }), // always do at beginning
    winston.format.json(),
  ),
  transports: [
    new winston.transports.Console(),
  ],
});
