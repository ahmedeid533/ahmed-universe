import MilestoneForm from '@/components/admin/MilestoneForm';
import styles from '@/app/dashboard/dashboard.module.css';

export default function NewMilestone() {
  return (
    <div>
      <div className={styles.sectionHeader}>
        <h3 className={styles.sectionTitle}>Add New Milestone</h3>
      </div>
      <MilestoneForm />
    </div>
  );
}
