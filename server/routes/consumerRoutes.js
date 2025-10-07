const express = require('express');
const router = express.Router();
const authApiKey = require('../middleware/authApiKey');
const { pollMessages, commitOffset, getLag } = require('../controllers/consumerController');

router.use(authApiKey);
router.post('/poll', pollMessages);
router.post('/commit', commitOffset);
router.get('/lag/:groupId', getLag);

module.exports = router;
