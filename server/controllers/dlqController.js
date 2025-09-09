const DeadLetterEvent = require('../models/DeadLetterEvent');
const { appendToLog, computePartition } = require('../services/commitLogEngine');
const Topic = require('../models/Topic');

const listDlq = async (req, res, next) => {
  try {
    const dlq = await DeadLetterEvent.find({ status: 'PENDING' }).sort({ createdAt: -1 });
    res.json({ success: true, count: dlq.length, data: dlq });
  } catch (error) {
    next(error);
  }
};

const replayDlq = async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await DeadLetterEvent.findOne({ dlqId: id });
    if (!item) return res.status(404).json({ success: false, error: 'NotFound' });

    const topic = await Topic.findOne({ topicName: item.topicName });
    const pCount = topic ? topic.partitionCount : 4;
    const pId = computePartition('dlq_replay', pCount);

    await appendToLog(item.topicName, pId, 'dlq_replay', item.originalPayload, { replayedFrom: id });

    item.status = 'REPROCESSED';
    item.retryCount += 1;
    await item.save();

    res.json({ success: true, message: `Event ${id} re-injected into partition ${pId}.` });
  } catch (error) {
    next(error);
  }
};

module.exports = { listDlq, replayDlq };
