const test = require('node:test');
const assert = require('node:assert');
const { computePartition } = require('../services/partitionRouter');
const { validateAgainstSchema } = require('../services/schemaValidator');
const { computeWindowMetrics } = require('../services/windowAggregator');

test('E2E Stream Lifecycle: Partition Hash, Schema Enforcement, and Aggregation', () => {
  // 1. Consistent hash partition routing
  const p = computePartition('cust_101', 4);
  assert.ok(p >= 0 && p < 4);

  // 2. Validate payload against schema
  const schema = {
    type: 'object',
    required: ['cust', 'amt'],
    properties: { cust: { type: 'string' }, amt: { type: 'number' } }
  };
  const val = validateAgainstSchema({ cust: 'cust_101', amt: 150.0 }, schema);
  assert.strictEqual(val.valid, true);

  // 3. Compute window aggregation
  const events = [{ payload: { amt: 150.0 } }, { payload: { amt: 50.0 } }];
  const agg = computeWindowMetrics(events, 'amt');
  assert.strictEqual(agg.count, 2);
  assert.strictEqual(agg.sum, 200.0);
  assert.strictEqual(agg.avg, 100.0);
});
