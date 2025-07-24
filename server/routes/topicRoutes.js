const express = require('express');
const router = express.Router();
const authApiKey = require('../middleware/authApiKey');
const { listTopics, createTopic, getTopicPartitions } = require('../controllers/topicController');

router.use(authApiKey);
router.get('/', listTopics);
router.post('/', createTopic);
router.get('/:id/partitions', getTopicPartitions);

module.exports = router;
