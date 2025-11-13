import React, { useState } from 'react';

export default function ProduceEventModal({ isOpen, onClose, onProduce, topics }) {
  const [topic, setTopic] = useState('orders.raw');
  const [key, setKey] = useState('cust_101');
  const [payloadText, setPayloadText] = useState('{\n  "orderId": "ord_5521",\n  "amount": 189.50,\n  "customerId": "cust_101"\n}');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const parsed = JSON.parse(payloadText);
      onProduce({ topic, key, payload: parsed });
      onClose();
    } catch {
      alert('Invalid JSON in payload');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-dialog">
        <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '14px' }}>Publish Event to Stream</h3>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '12px' }}>
            <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Target Topic</label>
            <select
              style={{ width: '100%', padding: '8px', background: '#07090e', border: '1px solid var(--border-line)', color: '#fff', borderRadius: '6px' }}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            >
              {topics.map(t => (
                <option key={t.topicName} value={t.topicName}>{t.topicName}</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: '12px' }}>
            <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Partition Routing Key</label>
            <input
              type="text"
              style={{ width: '100%', padding: '8px', background: '#07090e', border: '1px solid var(--border-line)', color: '#fff', borderRadius: '6px', fontFamily: 'var(--font-mono)' }}
              value={key}
              onChange={(e) => setKey(e.target.value)}
            />
          </div>

          <div style={{ marginBottom: '12px' }}>
            <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Event Payload (JSON)</label>
            <textarea
              rows={4}
              style={{ width: '100%', padding: '8px', background: '#07090e', border: '1px solid var(--border-line)', color: '#fff', borderRadius: '6px', fontFamily: 'var(--font-mono)', fontSize: '12px' }}
              value={payloadText}
              onChange={(e) => setPayloadText(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
            <button type="button" className="stream-tab-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-stream">Emit Event</button>
          </div>
        </form>
      </div>
    </div>
  );
}
