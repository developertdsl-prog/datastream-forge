const mongoose = require('mongoose');

const WindowAggregationSchema = new mongoose.Schema({
  topicName: {
    type: String,
    required: true,
    index: true
  },
  windowStart: {
    type: Date,
    required: true,
    index: true
  },
  windowEnd: {
    type: Date,
    required: true
  },
  windowType: {
    type: String,
    enum: ['TUMBLING_1M', 'TUMBLING_5M', 'SLIDING_1M'],
    default: 'TUMBLING_1M'
  },
  eventCount: {
    type: Number,
    default: 0
  },
  sumMetric: {
    type: Number,
    default: 0
  },
  avgMetric: {
    type: Number,
    default: 0
  }
}, { timestamps: false });

module.exports = mongoose.model('WindowAggregation', WindowAggregationSchema);
