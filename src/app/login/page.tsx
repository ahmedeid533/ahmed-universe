'use client';

import { useState, useTransition } from 'react';
import { motion } from 'framer-motion';
import { login } from '@/app/actions/auth';
import styles from './login.module.css';
import Link from 'next/link';

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    
    startTransition(async () => {
      const result = await login(formData);
      if (result?.error) {
        setError(result.error);
      }
    });
  };

  return (
    <div className={styles.container}>
      {/* Background elements */}
      <div className={styles.bgGlow} />
      
      <Link href="/" className={styles.backButton}>
        ← Back to Universe
      </Link>

      <motion.div
        className={styles.loginCard}
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <div className={styles.header}>
          <span className={styles.icon}>🌌</span>
          <h1 className={styles.title}>Admin Access</h1>
          <p className={styles.subtitle}>Enter credentials to access the Dashboard</p>
        </div>

        {error && (
          <motion.div
            className={styles.errorAlert}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
          >
            ❌ {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>Admin Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="admin@ahmed.com"
              className={`input-field ${styles.input}`}
              disabled={isPending}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>Access Code (Password)</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="••••••••"
              className={`input-field ${styles.input}`}
              disabled={isPending}
            />
          </div>

          <button
            type="submit"
            className={`btn btn-level ${styles.submitBtn}`}
            disabled={isPending}
          >
            {isPending ? 'Authenticating...' : '🚀 Initialize Uplink'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
