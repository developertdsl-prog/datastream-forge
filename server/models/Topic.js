const mongoose = require('mongoose');

const TopicSchema = new mongoose.Schema({
  topicName: {
    type: String,
    required: true,
    unique: true,
    index: true,
    trim: true
  },
  partitionCount: {
    type: Number,
    required: true,
    default: 4,
    min: 1
  },
  replicationFactor: {
    type: Number,
    default: 1
  },
  retentionHours: {
    type: Number,
    default: 168
  },
  schemaId: {
    type: String
  },
  totalProducedEvents: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['ACTIVE', 'PAUSED'],
    default: 'ACTIVE'
  }
}, { timestamps: true });

module.exports = mongoose.model('Topic', TopicSchema);
