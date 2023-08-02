const Agenda = require('agenda');
const configVars = require('./config/vars');
const mongoose = require('./config/mongoose');
const DailyConversationUpdateCron = require('./api/scheduledJobs/conversationUpdate.cron');
const { logger } = require('./config/logger');
const AxiosConfig = require('./config/axios');

AxiosConfig.addRequestLogInterceptor();
AxiosConfig.addResponseLogInterceptor();

// open mongoose connection
mongoose.connect();

const agenda = new Agenda({
  db: {
    address: configVars.mongo.uri,
  },
});

const scheduledJobs = [
  DailyConversationUpdateCron,
];

scheduledJobs.forEach((job) => {
  agenda.define(job.name, job.fn);
});

const initiateAgenda = async () => {
  await agenda.start();

  scheduledJobs.forEach(async (job) => {
    await agenda.every(job.frequency, job.name);
  });
};

const shutdownAgenda = async () => {
  await agenda.stop();
  process.exit(0);
};

process.on('SIGTERM', shutdownAgenda);
process.on('SIGINT', shutdownAgenda);

logger.info('Starting up Agenda workers...');
initiateAgenda();
logger.info('Agenda started.');
