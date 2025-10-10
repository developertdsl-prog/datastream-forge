const test = require('node:test');
const assert = require('node:assert');
const { computeWindowMetrics } = require('../services/windowAggregator');

test('Window Aggregator: calculates accurate statistical metrics over stream events', () => {
  const events = [
    { payload: { amount: 10 } },
    { payload: { amount: 20 } },
    { payload: { amount: 30 } }
  ];

  const metrics = computeWindowMetrics(events, 'amount');
  assert.strictEqual(metrics.count, 3);
  assert.strictEqual(metrics.sum, 60);
  assert.strictEqual(metrics.avg, 20);
  assert.strictEqual(metrics.min, 10);
  assert.strictEqual(metrics.max, 30);
});
