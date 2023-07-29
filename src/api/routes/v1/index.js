const express = require('express');
const chatbotRoutes = require('./chatbot.route');
const rulesRoutes = require('./rules.route');
const templatesRoutes = require('./template.route');
const configRoutes = require('./config.route');

const router = express.Router();

/**
 * API Routes
 */
router.use('/api/v1/chatbot', chatbotRoutes);
router.use('/api/v1/rules', rulesRoutes);
router.use('/api/v1/templates', templatesRoutes);
router.use('/api/v1/config', configRoutes);

module.exports = router;
