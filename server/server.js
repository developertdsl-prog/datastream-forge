const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

const topicRoutes = require('./routes/topicRoutes');
const producerRoutes = require('./routes/producerRoutes');
const consumerRoutes = require('./routes/consumerRoutes');
const schemaRoutes = require('./routes/schemaRoutes');
const dlqRoutes = require('./routes/dlqRoutes');

const app = express();

app.use(helmet());
app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '2mb' }));

app.get('/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    system: 'DataStream-Forge Partitioned Event Engine',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/topics', topicRoutes);
app.use('/api/producer', producerRoutes);
app.use('/api/consumer', consumerRoutes);
app.use('/api/schemas', schemaRoutes);
app.use('/api/dlq', dlqRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'test') {
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`[DataStream-Forge] Event Broker ready on port ${PORT}`);
    });
  });
}

module.exports = app;
