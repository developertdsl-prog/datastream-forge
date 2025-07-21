const rateStore = new Map();

const rateLimiter = (options = { windowMs: 60000, max: 1000 }) => {
  return (req, res, next) => {
    const identifier = req.header('X-API-Key') || req.ip || '127.0.0.1';
    const now = Date.now();

    const record = rateStore.get(identifier) || { count: 0, resetAt: now + options.windowMs };

    if (now > record.resetAt) {
      record.count = 1;
      record.resetAt = now + options.windowMs;
    } else {
      record.count += 1;
    }

    rateStore.set(identifier, record);

    res.setHeader('X-RateLimit-Limit', options.max);
    res.setHeader('X-RateLimit-Remaining', Math.max(0, options.max - record.count));

    if (record.count > options.max) {
      return res.status(429).json({
        success: false,
        error: 'ThroughputExceeded',
        message: 'Streaming ingestion rate limit exceeded. Back off to avoid dropouts.'
      });
    }

    next();
  };
};

module.exports = rateLimiter;
