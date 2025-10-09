const computeWindowMetrics = (events, metricField = 'amount') => {
  if (!events || events.length === 0) {
    return { count: 0, sum: 0, avg: 0, min: 0, max: 0 };
  }

  let sum = 0;
  let min = Infinity;
  let max = -Infinity;

  events.forEach(e => {
    const val = typeof e.payload === 'object' && e.payload[metricField] !== undefined
      ? Number(e.payload[metricField])
      : 1;
    sum += val;
    if (val < min) min = val;
    if (val > max) max = val;
  });

  return {
    count: events.length,
    sum: parseFloat(sum.toFixed(2)),
    avg: parseFloat((sum / events.length).toFixed(2)),
    min: min === Infinity ? 0 : min,
    max: max === -Infinity ? 0 : max
  };
};

module.exports = { computeWindowMetrics };
