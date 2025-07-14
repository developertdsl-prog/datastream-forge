const mongoose = require('mongoose');

const StreamSchemaDefinition = new mongoose.Schema({
  schemaId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  subject: {
    type: String,
    required: true,
    index: true
  },
  version: {
    type: Number,
    required: true
  },
  schemaJson: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  compatibilityMode: {
    type: String,
    enum: ['BACKWARD', 'FORWARD', 'FULL', 'NONE'],
    default: 'BACKWARD'
  },
  active: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

StreamSchemaDefinition.index({ subject: 1, version: -1 });

module.exports = mongoose.model('StreamSchema', StreamSchemaDefinition);
