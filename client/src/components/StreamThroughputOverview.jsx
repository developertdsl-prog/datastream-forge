import React from 'react';

export default function StreamThroughputOverview({ metrics }) {
  return (
    <div className="stream-metrics-grid">
      <div className="stream-card">
        <div className="metric-title">Total Ingested Events</div>
        <div className="metric-number" style={{ color: 'var(--neon-cyan)' }}>{metrics?.totalIngestedEvents || '3,725'}</div>
      </div>
      <div className="stream-card">
        <div className="metric-title">Peak Ingestion Rate</div>
        <div className="metric-number" style={{ color: 'var(--neon-green)' }}>{metrics?.eventsPerSecond || '480 EPS'}</div>
      </div>
      <div className="stream-card">
        <div className="metric-title">Consumer Lag (Aggregated)</div>
        <div className="metric-number" style={{ color: 'var(--neon-amber)' }}>{metrics?.consumerLagTotal || '4 Messages'}</div>
      </div>
      <div className="stream-card">
        <div className="metric-title">Active Streaming Topics</div>
        <div className="metric-number" style={{ color: 'var(--neon-purple)' }}>{metrics?.activeTopics || 4}</div>
      </div>
    </div>
  );
}
