import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.logo}>⚡</span>
          <span className={styles.title}>ETL / ML Pipeline</span>
        </div>
        <nav className={styles.nav}>
          <a href="#overview">Overview</a>
          <a href="#status">Status</a>
          <a href="#history">History</a>
          <a href="#metrics">Metrics</a>
          <a href="#predict">Predict</a>
        </nav>
      </div>
    </header>
  );
}
