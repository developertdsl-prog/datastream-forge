const PartitionLog = require('../models/PartitionLog');
const ConsumerGroup = require('../models/ConsumerGroup');

const calculateConsumerLag = async (groupId, topicName) => {
  const group = await ConsumerGroup.findOne({ groupId, topicName });
  const committedMap = group && group.partitionOffsets ? group.partitionOffsets : new Map();

  const partitionWatermarks = await PartitionLog.aggregate([
    { $match: { topicName } },
    { $group: { _id: '$partitionId', highWatermark: { $max: '$offset' } } }
  ]);

  let totalLag = 0;
  const partitionLagDetails = partitionWatermarks.map(p => {
    const pId = p._id;
    const high = p.highWatermark + 1; // High watermark offset
    const current = (committedMap instanceof Map ? committedMap.get(String(pId)) : committedMap[String(pId)]) || 0;
    const lag = Math.max(0, high - current);
    totalLag += lag;
    return { partitionId: pId, highWatermark: high, currentOffset: current, lag };
  });

  return {
    groupId,
    topicName,
    totalLag,
    partitions: partitionLagDetails
  };
};

module.exports = { calculateConsumerLag };
