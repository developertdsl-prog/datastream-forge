const mongoose = require('mongoose');

const DeadLetterEventSchema = new mongoose.Schema({
  dlqId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  topicName: {
    type: String,
    required: true
  },
  originalPayload: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  failureReason: {
    type: String,
    required: true
  },
  retryCount: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['PENDING', 'REPROCESSED', 'DISCARDED'],
    default: 'PENDING'
  }
}, { timestamps: true });

module.exports = mongoose.model('DeadLetterEvent', DeadLetterEventSchema);
