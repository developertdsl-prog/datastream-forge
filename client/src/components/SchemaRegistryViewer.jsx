import React from 'react';

export default function SchemaRegistryViewer({ schemas }) {
  return (
    <div className="stream-card" style={{ padding: '0px' }}>
      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-line)' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 700 }}>Stream Schema Registry & Compatibility</h3>
      </div>
      <div className="table-wrapper">
        <table className="stream-table">
          <thead>
            <tr>
              <th>Schema ID</th>
              <th>Subject</th>
              <th>Version</th>
              <th>Compatibility</th>
            </tr>
          </thead>
          <tbody>
            {schemas.map((s) => (
              <tr key={s.schemaId}>
                <td className="mono" style={{ color: 'var(--neon-cyan)' }}>{s.schemaId}</td>
                <td className="mono">{s.subject}</td>
                <td className="mono">v{s.version}</td>
                <td>
                  <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '4px', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.3)', fontFamily: 'var(--font-mono)' }}>
                    {s.compatibilityMode}
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
