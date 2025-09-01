const validateAgainstSchema = (payload, schemaJson) => {
  if (!schemaJson || !schemaJson.properties) return { valid: true };

  const errors = [];
  const required = schemaJson.required || [];

  for (const field of required) {
    if (payload[field] === undefined || payload[field] === null) {
      errors.push(`Missing required field: '${field}'`);
    }
  }

  for (const [prop, spec] of Object.entries(schemaJson.properties)) {
    if (payload[prop] !== undefined) {
      const actualType = typeof payload[prop];
      if (spec.type === 'number' && actualType !== 'number') {
        errors.push(`Field '${prop}' expected number, got ${actualType}`);
      } else if (spec.type === 'string' && actualType !== 'string') {
        errors.push(`Field '${prop}' expected string, got ${actualType}`);
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
};

module.exports = { validateAgainstSchema };
