const test = require('node:test');
const assert = require('node:assert');
const { computePartition } = require('../services/partitionRouter');

test('Commit Log: verifies partition routing boundaries', () => {
  for (let i = 0; i < 50; i++) {
    const p = computePartition(`entity_${i}`, 8);
    assert.ok(p >= 0 && p < 8);
  }
});
