import styles from './PipelineStatus.module.css';

const STAGES = [
  { name: 'Data Extraction', status: 'pending' },
  { name: 'Data Transformation', status: 'pending' },
  { name: 'Model Training', status: 'pending' },
  { name: 'API Deployment', status: 'pending' },
];

const STATUS_LABELS = {
  running: { label: 'Running', color: '#2563eb' },
  success: { label: 'Success', color: '#16a34a' },
  failed: { label: 'Failed', color: '#dc2626' },
  pending: { label: 'Pending', color: '#94a3b8' },
};

export default function PipelineStatus() {
  return (
    <section id="status" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.title}>Pipeline Status</h2>
        <p className={styles.note}>
          Live stage tracking — connect to your backend to populate this panel.
        </p>
        <div className={styles.stages}>
          {STAGES.map((stage) => {
            const s = STATUS_LABELS[stage.status];
            return (
              <div key={stage.name} className={styles.stage}>
                <span
                  className={styles.dot}
                  style={{ background: s.color }}
                />
                <span className={styles.name}>{stage.name}</span>
                <span className={styles.badge} style={{ color: s.color }}>
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
