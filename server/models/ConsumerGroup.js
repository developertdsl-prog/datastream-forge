const mongoose = require('mongoose');

const ConsumerGroupSchema = new mongoose.Schema({
  groupId: {
    type: String,
    required: true,
    index: true
  },
  topicName: {
    type: String,
    required: true,
    index: true
  },
  memberCount: {
    type: Number,
    default: 1
  },
  partitionOffsets: {
    type: Map,
    of: Number,
    default: {}
  },
  rebalanceStatus: {
    type: String,
    enum: ['STABLE', 'REBALANCING'],
    default: 'STABLE'
  }
}, { timestamps: true });

ConsumerGroupSchema.index({ groupId: 1, topicName: 1 }, { unique: true });

module.exports = mongoose.model('ConsumerGroup', ConsumerGroupSchema);
