const errorHandler = (err, req, res, next) => {
  console.error('[Stream Exception]', err);

  if (err.name === 'ValidationError') {
    const details = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({
      success: false,
      error: 'ValidationError',
      details
    });
  }

  res.status(err.status || 500).json({
    success: false,
    error: err.name || 'StreamProcessingError',
    message: err.message || 'An unexpected stream processing exception occurred.'
  });
};

module.exports = errorHandler;
