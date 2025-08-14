const test = require('node:test');
const assert = require('node:assert');
const { STREAMING_CONSTANTS } = require('../config/streamingConstants');

test('Streaming Constants: checks compatibility modes', () => {
  assert.ok(STREAMING_CONSTANTS.COMPATIBILITY_MODES.includes('BACKWARD'));
  assert.ok(STREAMING_CONSTANTS.COMPATIBILITY_MODES.includes('FORWARD'));
});
