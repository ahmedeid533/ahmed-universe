import { getMessages } from '@/app/actions/messages';
import MessageRow from './MessageRow';
import styles from '../dashboard.module.css';

export default async function MessagesDashboard() {
  const messages = await getMessages();

  return (
    <div>
      <div className={styles.sectionHeader}>
        <h3 className={styles.sectionTitle}>Inbox</h3>
      </div>

      <div className={styles.cardContainer}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Status</th>
                <th>Date</th>
                <th>Sender</th>
                <th>Message</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                    Your inbox is empty. No messages yet!
                  </td>
                </tr>
              ) : (
                messages.map((msg: any) => (
                  <MessageRow key={msg.id} message={msg} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
