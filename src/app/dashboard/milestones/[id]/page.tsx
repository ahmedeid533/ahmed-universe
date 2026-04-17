import MilestoneForm from '@/components/admin/MilestoneForm';
import { getMilestoneById } from '@/app/actions/milestones';
import styles from '@/app/dashboard/dashboard.module.css';
import { notFound } from 'next/navigation';

export default async function EditMilestone({ params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const milestone = await getMilestoneById(resolvedParams.id);
    if (!milestone) return notFound();

    return (
      <div>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>Edit Milestone</h3>
        </div>
        <MilestoneForm initialData={milestone} />
      </div>
    );
  } catch (error) {
    return notFound();
  }
}
