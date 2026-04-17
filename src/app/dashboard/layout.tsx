import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { logout } from '@/app/actions/auth';
import styles from './dashboard.module.css';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className={styles.dashboardContainer} data-level="corporate">
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <span className={styles.logoIcon}>🎮</span>
          <div className={styles.logoText}>
            <span className={styles.title}>Ahmed's</span>
            <span className={styles.subtitle}>Universe CMS</span>
          </div>
        </div>

        <nav className={styles.navLinks}>
          <Link href="/dashboard" className={styles.navLink}>
            📊 Overview
          </Link>
          <Link href="/dashboard/milestones" className={styles.navLink}>
            🏆 Milestones
          </Link>
          <Link href="/dashboard/messages" className={styles.navLink}>
            ✉️ Inbox
          </Link>
          <Link href="/" target="_blank" className={styles.navLink}>
            🌍 View Site
          </Link>
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.userInfo}>
            <span className={styles.avatar}>A</span>
            <span className={styles.email}>{user.email}</span>
          </div>
          <form action={logout}>
            <button type="submit" className={styles.logoutBtn}>
              🚪 Logout
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <header className={styles.topbar}>
          <h2 className={styles.pageTitle}>Dashboard</h2>
        </header>

        <div className={styles.contentWrapper}>
          {children}
        </div>
      </main>
    </div>
  );
}
