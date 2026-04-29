import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        ETL / ML Pipeline Dashboard — FastAPI backend on{' '}
        <code>http://localhost:8000</code>
      </p>
    </footer>
  );
}
