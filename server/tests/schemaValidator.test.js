const test = require('node:test');
const assert = require('node:assert');
const { validateAgainstSchema } = require('../services/schemaValidator');

test('Schema Validator: permits valid conforming payload', () => {
  const schema = {
    type: 'object',
    required: ['id', 'price'],
    properties: { id: { type: 'string' }, price: { type: 'number' } }
  };

  const result = validateAgainstSchema({ id: 'item_1', price: 99.5 }, schema);
  assert.strictEqual(result.valid, true);
  assert.strictEqual(result.errors.length, 0);
});

test('Schema Validator: catches missing required fields and type mismatches', () => {
  const schema = {
    type: 'object',
    required: ['id', 'price'],
    properties: { id: { type: 'string' }, price: { type: 'number' } }
  };

  const result = validateAgainstSchema({ id: 'item_1', price: 'invalid_string' }, schema);
  assert.strictEqual(result.valid, false);
  assert.ok(result.errors.length > 0);
});
