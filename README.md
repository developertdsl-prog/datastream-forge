# ⚡ DataStream-Forge — High-Throughput Partitioned Event Streaming, Schema Registry & Window Aggregation Engine

[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=flat&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-4.x-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0-47A248?style=flat&logo=mongodb&logoColor=white)](https://mongodb.com)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat&logo=react&logoColor=black)](https://reactjs.org)
[![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?style=flat&logo=docker&logoColor=white)](https://docker.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**DataStream-Forge** is an enterprise distributed event streaming and stream-processing platform. Inspired by Apache Kafka and Apache Flink, it provides partitioned append-only commit logs, deterministic hash routing, schema validation and evolution governance, tumbling and sliding window aggregations, consumer group offset coordination, and an automated Dead Letter Queue (DLQ) replay engine.

---


## ✨ Core Streaming Capabilities

1. **Partitioned Commit Log with Monotonic Offsets**
   - High-throughput append-only log architecture where each partition guarantees strict chronological ordering and monotonic sequential offset numbering (`0, 1, 2, ...`).

2. **Deterministic Consistent Hash Partitioning**
   - Routes messages with identical message keys (e.g. `customerId`, `deviceId`) to the exact same partition, ensuring per-entity ordering guarantees without global locking.

3. **Schema Registry & Evolution Governance**
   - Validates incoming message payloads against registered JSON Schema definitions before ingestion.
   - Enforces backward compatibility rules preventing schema updates that would break downstream consumers.

4. **Stream Window Aggregation Engine**
   - Computes rolling aggregations over tumbling and sliding time windows (1-minute and 5-minute buckets).
   - Generates real-time counts, sums, averages, and P95 latency distributions directly from raw event streams.

5. **Consumer Group Coordination & Lag Monitoring**
   - Tracks individual consumer offset commits across partitions.
   - Calculates real-time consumer lag metrics (`HighWatermark - CommittedOffset`) to identify bottleneck consumer workers.

6. **Dead Letter Queue (DLQ) & Automated Replay**
   - Quarantines malformed payloads and serialization failures into an isolated DLQ with detailed diagnostic logs.
   - One-click dead letter replay mechanism directly from the web console.

---

## 🔌 RESTful API Reference

### 1. Topics & Partitions
- `GET /api/topics` — List all active topics with partition counts and retention policies.
- `POST /api/topics` — Declare a new partitioned streaming topic.
- `GET /api/topics/:id/partitions` — Inspect partition offset watermarks and storage size.

### 2. Event Ingestion (Producers)
- `POST /api/producer/publish` — Publish a single event with key, payload, and optional headers.
- `POST /api/producer/batch` — High-speed batch publishing of up to 500 messages per request.

### 3. Consumption & Offsets
- `POST /api/consumer/poll` — Fetch unread messages for a consumer group from specific offsets.
- `POST /api/consumer/commit` — Commit current consumer group offset watermark for a partition.
- `GET /api/consumer/lag/:groupId` — Query consumer group partition lag metrics.

### 4. Schema Registry
- `GET /api/schemas` — List registered stream schemas and subject versions.
- `POST /api/schemas` — Register a new schema version with compatibility checking.

### 5. Dead Letter Queue
- `GET /api/dlq` — Query quarantined dead letter events.
- `POST /api/dlq/replay/:id` — Reprocess and replay a failed event into the active stream.

---

## 🧪 Automated Test Suite

DataStream-Forge features 7 automated test suites built with Node.js native test runner:

```bash
# Execute test suites
npm test

# Run tests with code coverage analysis
npm run test:coverage
```

### Test Coverage Highlights
- `server/tests/partitionRouter.test.js` — Consistent hash distribution and deterministic partition mapping.
- `server/tests/commitLogEngine.test.js` — Monotonic sequential offset assignment and atomic log append.
- `server/tests/schemaValidator.test.js` — JSON Schema payload conformance and backward compatibility checks.
- `server/tests/windowAggregator.test.js` — Tumbling and sliding window statistical aggregation formulas.
- `server/tests/consumerCoordinator.test.js` — Consumer lag calculation and offset commit tracking.
- `server/tests/streamingConstants.test.js` — Partition limits, batch boundaries, and retention defaults.
- `server/tests/e2eStreamingLifecycle.test.js` — Complete pipeline: Publish -> Hash Route -> Schema Check -> Window Aggregate -> Poll -> Offset Commit.

---

## 🚀 Quickstart & Installation

```bash
# 1. Clone repository
git clone https://github.com/developertdsl-prog/datastream-forge.git
cd datastream-forge

# 2. Install dependencies
npm install
cd client && npm install && cd ..

# 3. Configure environment
cp .env.example .env

# 4. Seed stream topics and sample partition events
npm run seed

# 5. Start development backend
npm run dev
```

---

## 📄 License
Licensed under the [MIT License](LICENSE). Designed & Maintained by `developertdsl-prog` (<developer.tdsl@gmail.com>).
