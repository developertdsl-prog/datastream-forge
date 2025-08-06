const PartitionLog = require('../models/PartitionLog');
const Topic = require('../models/Topic');

const offsetGenerators = new Map();

const getNextOffset = async (topicName, partitionId) => {
  const key = `${topicName}:${partitionId}`;
  if (!offsetGenerators.has(key)) {
    const latest = await PartitionLog.findOne({ topicName, partitionId }).sort({ offset: -1 });
    const currentMax = latest ? latest.offset : -1;
    offsetGenerators.set(key, currentMax + 1);
  }

  const nextOffset = offsetGenerators.get(key);
  offsetGenerators.set(key, nextOffset + 1);
  return nextOffset;
};

const appendToLog = async (topicName, partitionId, key, payload, headers = {}) => {
  const offset = await getNextOffset(topicName, partitionId);
  const logEntry = await PartitionLog.create({
    topicName,
    partitionId,
    offset,
    key,
    payload,
    headers,
    timestamp: new Date()
  });

  await Topic.findOneAndUpdate({ topicName }, { $inc: { totalProducedEvents: 1 } });

  return logEntry;
};

module.exports = { computePartition: require('./partitionRouter').computePartition, getNextOffset, appendToLog };
