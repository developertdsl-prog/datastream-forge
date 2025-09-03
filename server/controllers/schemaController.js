const StreamSchema = require('../models/StreamSchema');
const Topic = require('../models/Topic');

const listSchemas = async (req, res, next) => {
  try {
    const schemas = await StreamSchema.find().sort({ subject: 1, version: -1 });
    res.json({ success: true, count: schemas.length, data: schemas });
  } catch (error) {
    next(error);
  }
};

const registerSchema = async (req, res, next) => {
  try {
    const { schemaId, subject, schemaJson, topicToBind } = req.body;
    const count = await StreamSchema.countDocuments({ subject });

    const newSchema = await StreamSchema.create({
      schemaId: schemaId || `SCH-${subject.toUpperCase()}-v${count + 1}`,
      subject,
      version: count + 1,
      schemaJson: schemaJson || {}
    });

    if (topicToBind) {
      await Topic.findOneAndUpdate({ topicName: topicToBind }, { schemaId: newSchema.schemaId });
    }

    res.status(201).json({ success: true, data: newSchema });
  } catch (error) {
    next(error);
  }
};

module.exports = { listSchemas, registerSchema };
