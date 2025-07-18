const { STREAMING_CONSTANTS } = require('../config/streamingConstants');

const payloadValidator = (req, res, next) => {
  if (['POST', 'PUT'].includes(req.method)) {
    const contentLength = parseInt(req.header('content-length') || '0', 10);
    if (contentLength > STREAMING_CONSTANTS.MAX_MESSAGE_BYTES) {
      return res.status(413).json({
        success: false,
        error: 'PayloadTooLarge',
        message: `Event payload exceeds maximum permitted size of ${STREAMING_CONSTANTS.MAX_MESSAGE_BYTES} bytes.`
      });
    }
  }
  next();
};

module.exports = payloadValidator;
