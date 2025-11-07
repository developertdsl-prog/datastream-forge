import React from 'react';

export default function Navbar({ activeTab, setActiveTab }) {
  return (
    <nav className="stream-navbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span className="stream-brand">DATASTREAM-FORGE</span>
        <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', padding: '3px 8px', borderRadius: '6px', background: 'rgba(56, 189, 248, 0.15)', color: 'var(--neon-cyan)', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
          BROKER ONLINE
        </span>
      </div>

      <div style={{ display: 'flex', gap: '6px' }}>
        <button className={`stream-tab-btn ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
          Overview
        </button>
        <button className={`stream-tab-btn ${activeTab === 'topics' ? 'active' : ''}`} onClick={() => setActiveTab('topics')}>
          Topics & Partitions
        </button>
        <button className={`stream-tab-btn ${activeTab === 'consumers' ? 'active' : ''}`} onClick={() => setActiveTab('consumers')}>
          Consumer Groups
        </button>
        <button className={`stream-tab-btn ${activeTab === 'schemas' ? 'active' : ''}`} onClick={() => setActiveTab('schemas')}>
          Schema Registry
        </button>
        <button className={`stream-tab-btn ${activeTab === 'dlq' ? 'active' : ''}`} onClick={() => setActiveTab('dlq')}>
          Dead Letter Queue (DLQ)
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#34d399', display: 'inline-block' }}></span>
        <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
          KAFKA COMPATIBLE
        </span>
      </div>
    </nav>
  );
}
