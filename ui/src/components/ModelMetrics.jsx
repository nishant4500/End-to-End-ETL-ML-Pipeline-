import styles from './ModelMetrics.module.css';

const METRICS = [
  { label: 'Algorithm', value: 'Random Forest Regressor', icon: '🌲' },
  { label: 'R² Score', value: '—', icon: '📊' },
  { label: 'MAE', value: '—', icon: '📉' },
  { label: 'RMSE', value: '—', icon: '📈' },
];

export default function ModelMetrics() {
  return (
    <section id="metrics" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.title}>Model Metrics</h2>
        <p className={styles.note}>
          Key performance indicators — wire up your backend to display live
          scores.
        </p>
        <div className={styles.grid}>
          {METRICS.map((m) => (
            <div key={m.label} className={styles.card}>
              <span className={styles.icon}>{m.icon}</span>
              <div>
                <p className={styles.metricLabel}>{m.label}</p>
                <p className={styles.metricValue}>{m.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
