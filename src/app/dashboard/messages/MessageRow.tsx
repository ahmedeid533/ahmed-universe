'use client';

import { useTransition } from 'react';
import { updateMessageStatus, deleteMessage } from '@/app/actions/messages';

export default function MessageRow({ message }: { message: any }) {
  const [isPending, startTransition] = useTransition();

  const handleStatus = (status: 'unread' | 'read' | 'archived' | 'starred') => {
    startTransition(async () => {
      await updateMessageStatus(message.id, status);
    });
  };

  const handleDelete = () => {
    if (confirm('Delete this message permanently?')) {
      startTransition(async () => {
        await deleteMessage(message.id);
      });
    }
  };

  const date = new Date(message.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const isUnread = message.status === 'unread';

  return (
    <tr style={{ 
      opacity: isPending ? 0.5 : 1, 
      background: isUnread ? 'rgba(255,255,255,0.05)' : 'transparent',
      fontWeight: isUnread ? 700 : 400
    }}>
      <td>
        {message.status === 'unread' && <span style={{ color: '#a78bfa' }}>🔵 New</span>}
        {message.status === 'read' && <span style={{ color: 'var(--text-muted)' }}>⚪ Read</span>}
        {message.status === 'starred' && <span style={{ color: '#fbbf24' }}>⭐ Starred</span>}
        {message.status === 'archived' && <span style={{ color: 'var(--text-muted)' }}>🗄️ Archived</span>}
      </td>
      <td style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{date}</td>
      <td>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span>{message.sender_name}</span>
          <a href={`mailto:${message.email}`} style={{ fontSize: '12px', color: 'var(--level-primary)', textDecoration: 'none' }}>
            {message.email}
          </a>
        </div>
      </td>
      <td style={{ maxWidth: '300px' }}>
        <p style={{ 
          margin: 0, 
          fontSize: '13px', 
          lineHeight: 1.5,
          color: isUnread ? 'var(--text-primary)' : 'var(--text-secondary)' 
        }}>
          {message.message}
        </p>
      </td>
      <td>
        <div style={{ display: 'flex', gap: '8px' }}>
          {isUnread && (
            <button onClick={() => handleStatus('read')} disabled={isPending} style={btnStyle('rgba(255,255,255,0.1)', 'white')}>
              Mark Read
            </button>
          )}
          <button onClick={handleDelete} disabled={isPending} style={btnStyle('rgba(239,68,68,0.2)', '#fca5a5')}>
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}

function btnStyle(bg: string, color: string) {
  return {
    padding: '4px 8px',
    background: bg,
    color,
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px'
  };
}
