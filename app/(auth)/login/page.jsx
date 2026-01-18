"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        // Redirect to admin dashboard
        router.push('/admin');
        router.refresh();
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        {/* Back to Home Link */}
        <div style={{marginBottom: '1rem'}}>
          <a href="/" style={{color: 'var(--blue-600)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '500'}}>
            ← Back to Home
          </a>
        </div>
        
        {/* Header */}
        <div className={styles.loginHeader}>
          <h1 className={styles.loginTitle}>
            Admin Login
          </h1>
          <p className={styles.loginSubtitle}>
            Sign in to manage your society
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className={`${styles.alert} ${styles.alertDanger}`} role="alert">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.formLabel}>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className={styles.formInput}
              placeholder="admin@nextland.org"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.formLabel}>
              Password
            </label>
            <input
              type="password"
              id="password"
              className={styles.formInput}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className={styles.btnPrimary}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className={styles.spinner} role="status" aria-hidden="true"></span>
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Demo Credentials */}
        <div className={`${styles.alert} ${styles.alertInfo}`} role="alert">
          <h6 className={styles.alertHeading}>Demo Credentials</h6>
          <p className={styles.demoCredentials}>
            <strong>Admin:</strong> admin@nextland.org / admin123
          </p>
          <p className={styles.demoCredentials}>
            <strong>Editor:</strong> editor@nextland.org / editor123
          </p>
        </div>
      </div>
    </div>
  );
}
