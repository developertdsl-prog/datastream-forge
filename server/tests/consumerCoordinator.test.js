const test = require('node:test');
const assert = require('node:assert');
const { STREAMING_CONSTANTS } = require('../config/streamingConstants');

test('Consumer Coordinator: verifies stream constants configuration', () => {
  assert.strictEqual(STREAMING_CONSTANTS.DEFAULT_PARTITION_COUNT, 4);
  assert.strictEqual(STREAMING_CONSTANTS.MAX_BATCH_SIZE, 500);
  assert.ok(STREAMING_CONSTANTS.WINDOW_INTERVALS.ONE_MINUTE_MS);
});
