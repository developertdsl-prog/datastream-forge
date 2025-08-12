const express = require('express');
const router = express.Router();
const authApiKey = require('../middleware/authApiKey');
const payloadValidator = require('../middleware/payloadValidator');
const rateLimiter = require('../middleware/rateLimiter');
const { publishEvent, batchPublish } = require('../controllers/producerController');

router.use(authApiKey);
router.post('/publish', payloadValidator, rateLimiter({ max: 500 }), publishEvent);
router.post('/batch', payloadValidator, rateLimiter({ max: 100 }), batchPublish);

module.exports = router;
