import styles from './Hero.module.css';

const STEPS = [
  {
    icon: '📥',
    label: 'Extract',
    desc: 'Pull raw sales & store data from CSV / database sources.',
  },
  {
    icon: '🔄',
    label: 'Transform',
    desc: 'Clean, encode, and engineer features (holiday flags, date parts, CPI…).',
  },
  {
    icon: '📤',
    label: 'Load',
    desc: 'Persist transformed datasets ready for model training.',
  },
  {
    icon: '🤖',
    label: 'Train & Serve',
    desc: 'Train a scikit-learn model and expose predictions via FastAPI.',
  },
];

export default function Hero() {
  return (
    <section id="overview" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.hero}>
          <h1 className={styles.heading}>
            End-to-End ETL &amp; ML Pipeline
          </h1>
          <p className={styles.sub}>
            A production-ready pipeline that extracts raw retail data,
            transforms it into ML-ready features, trains a regression model,
            and serves real-time sales predictions through a FastAPI backend.
          </p>
          <a className={styles.cta} href="#predict">
            Try a Prediction →
          </a>
        </div>

        <div className={styles.steps}>
          {STEPS.map((s) => (
            <div key={s.label} className={styles.step}>
              <span className={styles.stepIcon}>{s.icon}</span>
              <h3 className={styles.stepLabel}>{s.label}</h3>
              <p className={styles.stepDesc}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
