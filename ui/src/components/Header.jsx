import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.logo}>⚡</span>
          <span className={styles.title}>Sales Predictor</span>
        </div>
        <nav className={styles.nav}>
          <a href="#predict">Predict</a>
          <a href="#history">History</a>
        </nav>
      </div>
    </header>
  );
}
