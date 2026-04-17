import { getMilestones } from '@/app/actions/milestones';
import MilestoneRow from './MilestoneRow';
import Link from 'next/link';
import styles from '../dashboard.module.css';

export default async function MilestonesDashboard() {
  const milestones = await getMilestones();

  return (
    <div>
      <div className={styles.sectionHeader}>
        <h3 className={styles.sectionTitle}>Manage Milestones</h3>
        <Link href="/dashboard/milestones/new" className="btn btn-level" style={{ padding: '8px 16px', fontSize: '14px' }}>
          ➕ Create New
        </Link>
      </div>

      <div className={styles.cardContainer}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Order</th>
                <th>Year</th>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {milestones.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                    No milestones found. Click "Create New" to start your journey.
                  </td>
                </tr>
              ) : (
                milestones.map((milestone) => (
                  <MilestoneRow key={milestone.id} milestone={milestone} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
