const crypto = require('crypto');
const Topic = require('../models/Topic');
const StreamSchema = require('../models/StreamSchema');
const DeadLetterEvent = require('../models/DeadLetterEvent');
const { computePartition } = require('../services/partitionRouter');
const { appendToLog } = require('../services/commitLogEngine');
const { validateAgainstSchema } = require('../services/schemaValidator');

const publishEvent = async (req, res, next) => {
  try {
    const { topic: topicName, key, payload, headers } = req.body;
    if (!topicName || payload === undefined) {
      return res.status(400).json({ success: false, error: 'ValidationError', message: 'topic and payload required.' });
    }

    const topic = await Topic.findOne({ topicName });
    if (!topic) return res.status(404).json({ success: false, error: 'TopicNotFound' });

    // Validate schema if registered
    if (topic.schemaId) {
      const schemaRecord = await StreamSchema.findOne({ schemaId: topic.schemaId });
      if (schemaRecord && schemaRecord.schemaJson) {
        const valResult = validateAgainstSchema(payload, schemaRecord.schemaJson);
        if (!valResult.valid) {
          // Route to DLQ
          await DeadLetterEvent.create({
            dlqId: `DLQ-${Date.now()}-${crypto.randomBytes(2).toString('hex')}`,
            topicName,
            originalPayload: payload,
            failureReason: valResult.errors.join('; ')
          });

          return res.status(422).json({
            success: false,
            error: 'SchemaValidationFailed',
            message: 'Event rejected by schema registry and quarantined in DLQ.',
            details: valResult.errors
          });
        }
      }
    }

    const partitionId = computePartition(key, topic.partitionCount);
    const logRecord = await appendToLog(topicName, partitionId, key || '', payload, headers || {});

    res.status(201).json({
      success: true,
      data: {
        topic: topicName,
        partitionId,
        offset: logRecord.offset,
        timestamp: logRecord.timestamp
      }
    });
  } catch (error) {
    next(error);
  }
};

const batchPublish = async (req, res, next) => {
  try {
    const { topic: topicName, events } = req.body;
    if (!topicName || !Array.isArray(events)) {
      return res.status(400).json({ success: false, message: 'topic and events array required' });
    }

    const topic = await Topic.findOne({ topicName });
    if (!topic) return res.status(404).json({ success: false, error: 'TopicNotFound' });

    const published = [];
    for (const evt of events) {
      const partitionId = computePartition(evt.key, topic.partitionCount);
      const logRecord = await appendToLog(topicName, partitionId, evt.key || '', evt.payload, evt.headers || {});
      published.push({ partitionId, offset: logRecord.offset });
    }

    res.status(201).json({ success: true, count: published.length, data: published });
  } catch (error) {
    next(error);
  }
};

module.exports = { publishEvent, batchPublish };
