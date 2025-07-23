const Topic = require('../models/Topic');
const PartitionLog = require('../models/PartitionLog');

const listTopics = async (req, res, next) => {
  try {
    const topics = await Topic.find().sort({ topicName: 1 });
    res.json({ success: true, count: topics.length, data: topics });
  } catch (error) {
    next(error);
  }
};

const createTopic = async (req, res, next) => {
  try {
    const { topicName, partitionCount = 4, retentionHours = 168 } = req.body;
    if (!topicName) {
      return res.status(400).json({ success: false, error: 'ValidationError', message: 'topicName required.' });
    }

    const topic = await Topic.create({
      topicName,
      partitionCount,
      retentionHours
    });

    res.status(201).json({ success: true, data: topic });
  } catch (error) {
    next(error);
  }
};

const getTopicPartitions = async (req, res, next) => {
  try {
    const { id } = req.params;
    const topic = await Topic.findOne({ topicName: id });
    if (!topic) return res.status(404).json({ success: false, error: 'NotFound' });

    const stats = await PartitionLog.aggregate([
      { $match: { topicName: id } },
      { $group: { _id: '$partitionId', eventCount: { $sum: 1 }, maxOffset: { $max: '$offset' } } }
    ]);

    res.json({ success: true, topic, partitions: stats });
  } catch (error) {
    next(error);
  }
};

module.exports = { listTopics, createTopic, getTopicPartitions };
