const express = require('express');

const routesV1 = require('./v1');

const router = express.Router();

/**
 * GET /status
 */
router.get('/api/health', (req, res) => res.send({ status: 'OK' }));
/**
 * API Routes
 */
router.use(routesV1);

module.exports = router;
