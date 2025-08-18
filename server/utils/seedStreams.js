const mongoose = require('mongoose');
const Topic = require('../models/Topic');
const PartitionLog = require('../models/PartitionLog');
const ConsumerGroup = require('../models/ConsumerGroup');
const StreamSchema = require('../models/StreamSchema');
const DeadLetterEvent = require('../models/DeadLetterEvent');

const seedStreams = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/datastream_db';
  await mongoose.connect(uri);
  console.log('[Seed] Connected to Stream DB...');

  await Promise.all([
    Topic.deleteMany({}),
    PartitionLog.deleteMany({}),
    ConsumerGroup.deleteMany({}),
    StreamSchema.deleteMany({}),
    DeadLetterEvent.deleteMany({})
  ]);

  // Seed Schema
  const schema = await StreamSchema.create({
    schemaId: 'SCH-ORDERS-V1',
    subject: 'orders.raw-value',
    version: 1,
    schemaJson: {
      type: 'object',
      required: ['orderId', 'amount', 'customerId'],
      properties: {
        orderId: { type: 'string' },
        amount: { type: 'number' },
        customerId: { type: 'string' }
      }
    }
  });

  // Seed Topics
  await Topic.create([
    { topicName: 'orders.raw', partitionCount: 4, schemaId: schema.schemaId, totalProducedEvents: 420 },
    { topicName: 'payments.events', partitionCount: 4, totalProducedEvents: 120 },
    { topicName: 'telemetry.sensors', partitionCount: 8, totalProducedEvents: 3100 },
    { topicName: 'user.activity', partitionCount: 2, totalProducedEvents: 85 }
  ]);

  // Seed sample partition events
  const logs = [];
  for (let p = 0; p < 4; p++) {
    for (let off = 0; off < 10; off++) {
      logs.push({
        topicName: 'orders.raw',
        partitionId: p,
        offset: off,
        key: `cust_${100 + off}`,
        payload: { orderId: `ord_99${p}${off}`, amount: 45.5 * (off + 1), customerId: `cust_${100 + off}` },
        timestamp: new Date(Date.now() - (10 - off) * 60000)
      });
    }
  }
  await PartitionLog.insertMany(logs);

  // Seed Consumer Group
  await ConsumerGroup.create({
    groupId: 'fulfillment-processor-group',
    topicName: 'orders.raw',
    memberCount: 2,
    partitionOffsets: { '0': 8, '1': 9, '2': 7, '3': 10 }
  });

  // Seed Dead Letter Queue item
  await DeadLetterEvent.create({
    dlqId: 'DLQ-9912-A',
    topicName: 'orders.raw',
    originalPayload: { orderId: 'bad_order', amount: 'not_a_number' },
    failureReason: "Field 'amount' expected number, got string"
  });

  console.log('[Seed Complete] Topics, Schema, Events, Consumer Group, and DLQ seeded.');
  await mongoose.disconnect();
};

if (require.main === module) {
  seedStreams().catch(console.error);
}

module.exports = seedStreams;
