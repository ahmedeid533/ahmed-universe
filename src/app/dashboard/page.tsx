import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import styles from './dashboard.module.css';

export default async function DashboardHomePage() {
  const supabase = await createClient();

  // Fetch quick stats
  const [milestonesRes, messagesRes] = await Promise.all([
    supabase.from('milestones').select('id', { count: 'exact', head: true }),
    supabase.from('messages').select('id', { count: 'exact', head: true }).eq('status', 'unread'),
  ]);

  const milestoneCount = milestonesRes.count || 0;
  const unreadMessages = messagesRes.count || 0;

  return (
    <div className={styles.homeContainer}>
      <div className={styles.welcomeSection}>
        <h1 className={styles.greeting}>Welcome back, Commander 👋</h1>
        <p className={styles.greetingSub}>Here is what's happening in your universe today.</p>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>🏆</div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Total Milestones</span>
            <span className={styles.statValue}>{milestoneCount}</span>
          </div>
          <Link href="/dashboard/milestones" className={styles.statLink}>
            Manage →
          </Link>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>✉️</div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Unread Messages</span>
            <span className={styles.statValue}>{unreadMessages}</span>
          </div>
          <Link href="/dashboard/messages" className={styles.statLink}>
            View Inbox →
          </Link>
        </div>
      </div>

      <div className={styles.quickActions}>
        <h3 className={styles.sectionTitle}>Quick Links</h3>
        <div className={styles.actionsGrid}>
          <Link href="/dashboard/milestones/new" className={`${styles.actionCard} btn-level`}>
            ➕ Add Milestone
          </Link>
          <Link href="/" target="_blank" className={`${styles.actionCard} btn-level`} style={{ background: 'transparent', border: '1px solid var(--level-primary)' }}>
            🌍 Preview Site
          </Link>
        </div>
      </div>
    </div>
  );
}
