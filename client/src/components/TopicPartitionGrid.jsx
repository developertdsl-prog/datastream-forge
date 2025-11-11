import React from 'react';

export default function TopicPartitionGrid({ topics }) {
  return (
    <div style={{ marginBottom: '24px' }}>
      <h3 style={{ fontSize: '15px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '14px', letterSpacing: '0.5px' }}>
        Active Stream Topics & Partitions
      </h3>
      <div className="topics-grid">
        {topics.map((t) => (
          <div key={t.topicName} className="topic-item-card">
            <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '4px' }}>{t.topicName}</div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '12px' }}>
              {t.partitionCount} Partitions &bull; RF: 1
            </div>

            <div style={{ display: 'flex', gap: '4px', height: '14px', marginBottom: '8px' }}>
              {Array.from({ length: t.partitionCount }).map((_, i) => (
                <div key={i} style={{ flex: 1, background: 'rgba(56, 189, 248, 0.4)', borderRadius: '2px' }} title={`Partition ${i}`} />
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-muted)' }}>
              <span>Total Offset:</span>
              <span className="mono" style={{ color: '#fff', fontWeight: 600 }}>{t.totalProducedEvents}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
