import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import StreamThroughputOverview from './components/StreamThroughputOverview';
import TopicPartitionGrid from './components/TopicPartitionGrid';
import ConsumerGroupTable from './components/ConsumerGroupTable';
import ProduceEventModal from './components/ProduceEventModal';
import SchemaRegistryViewer from './components/SchemaRegistryViewer';
import DeadLetterQueueConsole from './components/DeadLetterQueueConsole';
import LiveEventStreamView from './components/LiveEventStreamView';
import { api } from './services/api';
import './styles/main.css';
import './styles/responsive.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [metrics, setMetrics] = useState(null);
  const [topics, setTopics] = useState([]);
  const [consumers, setConsumers] = useState([]);
  const [schemas, setSchemas] = useState([]);
  const [dlq, setDlq] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [mRes, tRes, cRes, sRes, dRes] = await Promise.all([
      api.getMetrics(),
      api.getTopics(),
      api.getConsumers(),
      api.getSchemas(),
      api.getDlq()
    ]);

    if (mRes.success) setMetrics(mRes.data);
    if (tRes.success) setTopics(tRes.data);
    if (cRes.success) setConsumers(cRes.data);
    if (sRes.success) setSchemas(sRes.data);
    if (dRes.success) setDlq(dRes.data);
  };

  const handleProduce = async (eventData) => {
    const res = await api.publish(eventData);
    if (res.success) loadData();
  };

  const handleReplayDlq = async (id) => {
    const res = await api.replayDlq(id);
    if (res.success) loadData();
  };

  return (
    <div className="stream-container">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === 'overview' && (
        <>
          <StreamThroughputOverview metrics={metrics} />
          <LiveEventStreamView />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Cluster Overview</h3>
            <button className="btn-stream" onClick={() => setIsModalOpen(true)}>
              + Emit Event
            </button>
          </div>
          <TopicPartitionGrid topics={topics} />
          <ConsumerGroupTable consumers={consumers} />
        </>
      )}

      {activeTab === 'topics' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Streaming Topics</h3>
            <button className="btn-stream" onClick={() => setIsModalOpen(true)}>
              + Emit Event
            </button>
          </div>
          <TopicPartitionGrid topics={topics} />
        </div>
      )}

      {activeTab === 'consumers' && (
        <ConsumerGroupTable consumers={consumers} />
      )}

      {activeTab === 'schemas' && (
        <SchemaRegistryViewer schemas={schemas} />
      )}

      {activeTab === 'dlq' && (
        <DeadLetterQueueConsole dlq={dlq} onReplay={handleReplayDlq} />
      )}

      <ProduceEventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onProduce={handleProduce}
        topics={topics}
      />
    </div>
  );
}
