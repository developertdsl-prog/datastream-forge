import React from 'react';

export default function DeadLetterQueueConsole({ dlq, onReplay }) {
  return (
    <div className="stream-card" style={{ padding: '0px' }}>
      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-line)' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 700 }}>Dead Letter Queue (DLQ) Quarantine</h3>
      </div>
      <div className="table-wrapper">
        <table className="stream-table">
          <thead>
            <tr>
              <th>DLQ ID</th>
              <th>Topic</th>
              <th>Rejection Reason</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dlq.map((item) => (
              <tr key={item.dlqId}>
                <td className="mono" style={{ color: 'var(--neon-rose)' }}>{item.dlqId}</td>
                <td className="mono">{item.topicName}</td>
                <td style={{ fontSize: '12px', color: '#f43f5e' }}>{item.failureReason}</td>
                <td>
                  <button className="btn-stream btn-stream-sm" onClick={() => onReplay(item.dlqId)}>
                    Replay Message
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
