const path = require('path');
const appPackage = require('../../package.json');

// const path = require('path');
require('dotenv-safe').config({
  path: path.join(__dirname, '../../.env'),
  sample: path.join(__dirname, '../../.env.example'),
});

module.exports = {
  appName: appPackage.name,
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  mongo: {
    uri: process.env.MONGO_URI,
  },
  redisDetails: {
    endpoint: process.env.REDIS_URI,
    port: process.env.REDIS_PORT,
    sessionExpiry: 3600,
  },
  twilioAuth: {
    key: process.env.TWILIO_KEY,
    password: process.env.TWILIO_AUTH,
  },
};
