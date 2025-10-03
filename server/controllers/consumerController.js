const PartitionLog = require('../models/PartitionLog');
const ConsumerGroup = require('../models/ConsumerGroup');
const { calculateConsumerLag } = require('../services/consumerCoordinator');

const pollMessages = async (req, res, next) => {
  try {
    const { topicName, partitionId = 0, fromOffset = 0, limit = 50 } = req.body;
    const messages = await PartitionLog.find({
      topicName,
      partitionId: parseInt(partitionId, 10),
      offset: { $gte: parseInt(fromOffset, 10) }
    })
      .sort({ offset: 1 })
      .limit(parseInt(limit, 10));

    res.json({
      success: true,
      count: messages.length,
      data: messages
    });
  } catch (error) {
    next(error);
  }
};

const commitOffset = async (req, res, next) => {
  try {
    const { groupId, topicName, partitionId, offset } = req.body;
    if (!groupId || !topicName || partitionId === undefined || offset === undefined) {
      return res.status(400).json({ success: false, message: 'Missing commit parameters' });
    }

    const group = await ConsumerGroup.findOneAndUpdate(
      { groupId, topicName },
      { $set: { [`partitionOffsets.${partitionId}`]: parseInt(offset, 10) } },
      { upsert: true, new: true }
    );

    res.json({ success: true, data: group });
  } catch (error) {
    next(error);
  }
};

const getLag = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const { topic } = req.query;
    const lagReport = await calculateConsumerLag(groupId, topic || 'orders.raw');
    res.json({ success: true, data: lagReport });
  } catch (error) {
    next(error);
  }
};

module.exports = { pollMessages, commitOffset, getLag };
