const mongoose = require('mongoose');

const PartitionLogSchema = new mongoose.Schema({
  topicName: {
    type: String,
    required: true,
    index: true
  },
  partitionId: {
    type: Number,
    required: true,
    index: true
  },
  offset: {
    type: Number,
    required: true,
    index: true
  },
  key: {
    type: String,
    default: ''
  },
  payload: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  headers: {
    type: Map,
    of: String
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  }
}, { timestamps: false });

PartitionLogSchema.index({ topicName: 1, partitionId: 1, offset: 1 }, { unique: true });

module.exports = mongoose.model('PartitionLog', PartitionLogSchema);
