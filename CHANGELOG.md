# Changelog

All notable changes to **DataStream-Forge Streaming Engine** are documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-12-26
### Added
- Complete React 18 Data Engineering Console with real-time throughput metrics and live event stream.
- Dead Letter Queue (DLQ) replay console with failure reason inspection and retry mechanisms.
- Tumbling and sliding window stream aggregation engine computing counts, sums, and averages.
- Multi-stage Docker containerization and Docker Compose orchestration.
- 7 automated test suites verifying partition routing, commit logs, schema validation, and windowing.

## [0.3.0] - 2025-10-29
### Added
- Schema Registry with JSON Schema payload validation and backward compatibility checking.
- Dead Letter Queue (DLQ) model storing failed message payloads with error diagnostics.
- Consumer group coordinator computing real-time partition lag (HighWatermark vs CurrentOffset).

## [0.2.0] - 2025-08-29
### Added
- Consistent hash partition router mapping event keys to deterministic partition IDs.
- Append-only PartitionLog commit engine with monotonic atomic offset sequences.
- Batch producer endpoint supporting up to 500 records per transaction.

## [0.1.0] - 2025-07-30
### Added
- Core MongoDB schema models: Topic, PartitionLog, ConsumerGroup, StreamSchema.
- RESTful topic creation and partition query endpoints.
- Mongoose connection pooling with replica-set failover configuration.
