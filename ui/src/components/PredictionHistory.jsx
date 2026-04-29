import { useState, useEffect, useCallback } from 'react';
import styles from './PredictionHistory.module.css';

const FIELD_LABELS = {
  Dept: 'Dept',
  IsHoliday: 'Holiday',
  Temperature: 'Temp (°F)',
  Fuel_Price: 'Fuel ($)',
  CPI: 'CPI',
  Unemployment: 'Unemp (%)',
  Size: 'Size (sq ft)',
  Year: 'Year',
  Month: 'Month',
  Week: 'Week',
};

export default function PredictionHistory({ refreshTrigger }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchHistory = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/history');
      if (!res.ok) throw new Error(`Server responded with ${res.status}`);
      const data = await res.json();
      setHistory(data.history || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory, refreshTrigger]);

  return (
    <section id="history" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 className={styles.title}>Prediction History</h2>
          <button className={styles.refreshBtn} onClick={fetchHistory} disabled={loading}>
            {loading ? 'Loading…' : '↻ Refresh'}
          </button>
        </div>
        <p className={styles.note}>
          Previous predictions made during this session, including input data
          points and the predicted weekly sales value.
        </p>

        {error && (
          <div className={styles.error}>
            ⚠️ {error}. Make sure the FastAPI server is running on{' '}
            <code>http://localhost:8000</code>.
          </div>
        )}

        {!error && history.length === 0 && !loading && (
          <div className={styles.empty}>
            No predictions yet. Use the form above to start a prediction.
          </div>
        )}

        {history.length > 0 && (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Timestamp</th>
                  {Object.keys(FIELD_LABELS).map((key) => (
                    <th key={key}>{FIELD_LABELS[key]}</th>
                  ))}
                  <th>Predicted Sales ($)</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item, idx) => (
                  <tr key={item.timestamp || idx}>
                    <td>{idx + 1}</td>
                    <td className={styles.timestamp}>
                      {item.timestamp
                        ? new Date(item.timestamp).toLocaleString()
                        : '—'}
                    </td>
                    {Object.keys(FIELD_LABELS).map((key) => (
                      <td key={key}>
                        {item.input?.[key] !== undefined
                          ? item.input[key]
                          : '—'}
                      </td>
                    ))}
                    <td className={styles.predValue}>
                      {item.prediction !== undefined
                        ? `$${item.prediction.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}`
                        : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
