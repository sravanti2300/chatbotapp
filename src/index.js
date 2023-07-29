const { logger } = require('./config/logger');

Promise = require('bluebird'); // eslint-disable-line no-global-assign

const { port, env } = require('./config/vars');
const mongoose = require('./config/mongoose');
const app = require('./config/express');

// open mongoose connection
mongoose.connect();

// listen to requests
app.listen(port, () => logger.info(`Server started on port ${port} (${env})`));

module.exports = app;
