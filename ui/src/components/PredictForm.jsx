import { useState } from 'react';
import styles from './PredictForm.module.css';

const DEFAULT_VALUES = {
  Dept: 1,
  IsHoliday: 0,
  Temperature: 65.0,
  Fuel_Price: 3.5,
  CPI: 210.0,
  Unemployment: 7.0,
  Size: 150000,
  Year: 2024,
  Month: 1,
  Week: 1,
};

const FIELDS = [
  { key: 'Dept', label: 'Department', type: 'number', min: 1, step: 1 },
  { key: 'IsHoliday', label: 'Is Holiday (0/1)', type: 'number', min: 0, max: 1, step: 1 },
  { key: 'Temperature', label: 'Temperature (°F)', type: 'number', step: 0.1 },
  { key: 'Fuel_Price', label: 'Fuel Price ($)', type: 'number', step: 0.01 },
  { key: 'CPI', label: 'CPI', type: 'number', step: 0.01 },
  { key: 'Unemployment', label: 'Unemployment (%)', type: 'number', step: 0.01 },
  { key: 'Size', label: 'Store Size (sq ft)', type: 'number', step: 1000 },
  { key: 'Year', label: 'Year', type: 'number', min: 2000, step: 1 },
  { key: 'Month', label: 'Month (1–12)', type: 'number', min: 1, max: 12, step: 1 },
  { key: 'Week', label: 'Week (1–52)', type: 'number', min: 1, max: 52, step: 1 },
];

export default function PredictForm() {
  const [form, setForm] = useState(DEFAULT_VALUES);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: Number(value) }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }
      const data = await res.json();
      setResult(data.prediction);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="predict" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.title}>Sales Prediction</h2>
        <p className={styles.note}>
          Enter store and date features below to get a predicted weekly sales
          figure from the ML model.
        </p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.grid}>
            {FIELDS.map(({ key, label, type, min, max, step }) => (
              <div key={key} className={styles.field}>
                <label className={styles.label} htmlFor={key}>
                  {label}
                </label>
                <input
                  id={key}
                  name={key}
                  type={type}
                  min={min}
                  max={max}
                  step={step}
                  value={form[key]}
                  onChange={handleChange}
                  className={styles.input}
                  required
                />
              </div>
            ))}
          </div>
          <button type="submit" className={styles.btn} disabled={loading}>
            {loading ? 'Predicting…' : 'Get Prediction'}
          </button>
        </form>

        {result !== null && (
          <div className={styles.result}>
            <span className={styles.resultIcon}>🎯</span>
            <div>
              <p className={styles.resultLabel}>Predicted Weekly Sales</p>
              <p className={styles.resultValue}>
                ${result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        )}

        {error && (
          <div className={styles.error}>
            ⚠️ {error}. Make sure the FastAPI server is running on{' '}
            <code>http://localhost:8000</code>.
          </div>
        )}
      </div>
    </section>
  );
}
