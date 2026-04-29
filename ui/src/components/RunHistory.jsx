import styles from './RunHistory.module.css';

const PLACEHOLDER_RUNS = [
  { id: '#001', trigger: 'manual', started: '—', duration: '—', status: 'pending' },
  { id: '#002', trigger: 'scheduled', started: '—', duration: '—', status: 'pending' },
  { id: '#003', trigger: 'manual', started: '—', duration: '—', status: 'pending' },
];

const STATUS_COLOR = {
  success: '#16a34a',
  failed: '#dc2626',
  running: '#2563eb',
  pending: '#94a3b8',
};

export default function RunHistory() {
  return (
    <section id="history" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.title}>Run History</h2>
        <p className={styles.note}>
          Past pipeline executions — connect to your backend to populate this
          table.
        </p>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Run ID</th>
                <th>Trigger</th>
                <th>Started</th>
                <th>Duration</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {PLACEHOLDER_RUNS.map((run) => (
                <tr key={run.id}>
                  <td>{run.id}</td>
                  <td>{run.trigger}</td>
                  <td>{run.started}</td>
                  <td>{run.duration}</td>
                  <td>
                    <span
                      className={styles.badge}
                      style={{ color: STATUS_COLOR[run.status] }}
                    >
                      {run.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
