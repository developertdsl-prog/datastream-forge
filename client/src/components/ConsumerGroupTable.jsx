import React from 'react';

export default function ConsumerGroupTable({ consumers }) {
  return (
    <div className="stream-card" style={{ padding: '0px', marginBottom: '24px' }}>
      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-line)' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 700 }}>Consumer Group Lag & Offset Watermarks</h3>
      </div>
      <div className="table-wrapper">
        <table className="stream-table">
          <thead>
            <tr>
              <th>Group ID</th>
              <th>Target Topic</th>
              <th>Active Members</th>
              <th>Total Lag</th>
              <th>Rebalance State</th>
            </tr>
          </thead>
          <tbody>
            {consumers.map((c) => (
              <tr key={c.groupId}>
                <td className="mono" style={{ color: 'var(--neon-cyan)' }}>{c.groupId}</td>
                <td className="mono">{c.topicName}</td>
                <td>{c.members} Workers</td>
                <td className="mono" style={{ color: c.totalLag > 10 ? '#f43f5e' : '#34d399', fontWeight: 700 }}>
                  {c.totalLag} messages
                </td>
                <td>
                  <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '4px', background: 'rgba(52, 211, 153, 0.15)', color: '#34d399', border: '1px solid rgba(52, 211, 153, 0.3)', fontFamily: 'var(--font-mono)' }}>
                    {c.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
