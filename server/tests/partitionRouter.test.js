const test = require('node:test');
const assert = require('node:assert');
const { computePartition } = require('../services/partitionRouter');

test('Partition Router: routes identical keys to the same partition consistently', () => {
  const key = 'user_order_entity_9918';
  const p1 = computePartition(key, 4);
  const p2 = computePartition(key, 4);
  const p3 = computePartition(key, 4);

  assert.strictEqual(p1, p2);
  assert.strictEqual(p2, p3);
  assert.ok(p1 >= 0 && p1 < 4);
});

test('Partition Router: handles single partition topic', () => {
  assert.strictEqual(computePartition('any_key', 1), 0);
});
