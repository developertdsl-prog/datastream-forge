const express = require('express');
const router = express.Router();
const authApiKey = require('../middleware/authApiKey');
const { listDlq, replayDlq } = require('../controllers/dlqController');

router.use(authApiKey);
router.get('/', listDlq);
router.post('/replay/:id', replayDlq);

module.exports = router;
