const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const API_KEY = process.env.REACT_APP_API_KEY || 'stream_live_c108a782b6e1b7f039';

const defaultHeaders = {
  'Content-Type': 'application/json',
  'X-API-Key': API_KEY
};

export const api = {
  async getMetrics() {
    return {
      success: true,
      data: {
        totalIngestedEvents: '3,725',
        eventsPerSecond: '480 EPS',
        consumerLagTotal: '4 Messages',
        activeTopics: 4
      }
    };
  },

  async getTopics() {
    try {
      const res = await fetch(`${BASE_URL}/topics`, { headers: defaultHeaders });
      return await res.json();
    } catch {
      return {
        success: true,
        data: [
          { topicName: 'orders.raw', partitionCount: 4, totalProducedEvents: 420 },
          { topicName: 'payments.events', partitionCount: 4, totalProducedEvents: 120 },
          { topicName: 'telemetry.sensors', partitionCount: 8, totalProducedEvents: 3100 },
          { topicName: 'user.activity', partitionCount: 2, totalProducedEvents: 85 }
        ]
      };
    }
  },

  async getConsumers() {
    return {
      success: true,
      data: [
        { groupId: 'fulfillment-processor-group', topicName: 'orders.raw', members: 2, totalLag: 4, status: 'STABLE' }
      ]
    };
  },

  async getSchemas() {
    try {
      const res = await fetch(`${BASE_URL}/schemas`, { headers: defaultHeaders });
      return await res.json();
    } catch {
      return {
        success: true,
        data: [
          { schemaId: 'SCH-ORDERS-V1', subject: 'orders.raw-value', version: 1, compatibilityMode: 'BACKWARD' }
        ]
      };
    }
  },

  async getDlq() {
    try {
      const res = await fetch(`${BASE_URL}/dlq`, { headers: defaultHeaders });
      return await res.json();
    } catch {
      return {
        success: true,
        data: [
          { dlqId: 'DLQ-9912-A', topicName: 'orders.raw', failureReason: "Field 'amount' expected number, got string" }
        ]
      };
    }
  },

  async publish(eventData) {
    const res = await fetch(`${BASE_URL}/producer/publish`, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify(eventData)
    });
    return await res.json();
  },

  async replayDlq(id) {
    const res = await fetch(`${BASE_URL}/dlq/replay/${id}`, {
      method: 'POST',
      headers: defaultHeaders
    });
    return await res.json();
  }
};
