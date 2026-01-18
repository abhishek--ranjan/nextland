"use client";
import styles from "./setup.module.css";

export default function SetupScreen() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Left Panel - Informational */}
        <div className={styles.leftPanel}>
          <div className={styles.brand}>
            <h1 className={styles.logo}>Nextland</h1>
            <p className={styles.brandTagline}>Society Platform</p>
          </div>
          
          <div className={styles.info}>
            <h2 className={styles.headline}>Welcome to Nextland Society Platform</h2>
            <p className={styles.description}>
              A digital platform to manage society content, governance, facilities, and community engagement.
            </p>
            
            <div className={styles.highlights}>
              <div className={styles.highlight}>
                <span className={styles.icon}>📋</span>
                <span>Governance &amp; Notices</span>
              </div>
              <div className={styles.highlight}>
                <span className={styles.icon}>🏢</span>
                <span>Facilities &amp; Vendors</span>
              </div>
              <div className={styles.highlight}>
                <span className={styles.icon}>🎉</span>
                <span>Events &amp; Community</span>
              </div>
              <div className={styles.highlight}>
                <span className={styles.icon}>🔒</span>
                <span>Secure Content Management</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Action Card */}
        <div className={styles.rightPanel}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Get Started</h3>
            <p className={styles.cardDescription}>
              No society has been configured yet.<br />
              You can explore a sample experience or create a new society setup.
            </p>
            
            <div className={styles.actions}>
              <a href="/setup-society" className={styles.buttonPrimary}>
                Setup New Society
              </a>
              <a href="/home" className={styles.buttonSecondary}>
                Explore Demo
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>&copy; 2026 Nextland Society. All rights reserved.</p>
      </footer>
    </div>
  );
}
