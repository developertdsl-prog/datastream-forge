import React from 'react';

export default function LiveEventStreamView() {
  const events = [
    { offset: 421, topic: 'orders.raw', partition: 2, key: 'cust_104', val: '{"orderId":"ord_9921","amount":189.5}' },
    { offset: 121, topic: 'payments.events', partition: 1, key: 'txn_882', val: '{"txn":"txn_882","status":"SETTLED"}' },
    { offset: 3101, topic: 'telemetry.sensors', partition: 5, key: 'sensor_09', val: '{"temp":42.5,"load":78}' },
    { offset: 422, topic: 'orders.raw', partition: 0, key: 'cust_105', val: '{"orderId":"ord_9922","amount":45.0}' }
  ];

  return (
    <div className="stream-card" style={{ marginBottom: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 700 }}>Live Ingested Event Log Stream</h3>
        <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--neon-cyan)' }}>REAL-TIME FEED</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {events.map((e, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 12px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px', fontSize: '12px', fontFamily: 'var(--font-mono)' }}>
            <span style={{ color: 'var(--neon-cyan)' }}>offset:{e.offset}</span>
            <span style={{ color: 'var(--neon-purple)' }}>[{e.topic}:P{e.partition}]</span>
            <span style={{ color: 'var(--text-muted)' }}>key={e.key}</span>
            <span style={{ color: '#fff', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.val}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
