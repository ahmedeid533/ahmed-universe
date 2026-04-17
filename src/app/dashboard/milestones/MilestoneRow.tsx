'use client';

import { useTransition } from 'react';
import type { Milestone } from '@/types';
import { toggleMilestoneVisibility, deleteMilestone } from '@/app/actions/milestones';
import Link from 'next/link';

export default function MilestoneRow({ milestone }: { milestone: Milestone }) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      await toggleMilestoneVisibility(milestone.id, !milestone.is_visible);
    });
  };

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete "${milestone.title}"?`)) {
      startTransition(async () => {
        await deleteMilestone(milestone.id);
      });
    }
  };

  return (
    <tr style={{ opacity: isPending ? 0.5 : 1 }}>
      <td>{milestone.sort_order}</td>
      <td style={{ fontFamily: 'var(--font-game)' }}>{milestone.year}</td>
      <td>
        <strong>{milestone.title}</strong>
        <br />
        <small style={{ color: 'var(--text-muted)' }}>{milestone.theme}</small>
      </td>
      <td>
        <span className="badge" style={{ border: `1px solid ${milestone.theme_color}`, color: milestone.theme_color, padding: '2px 8px', borderRadius: '12px', fontSize: '12px' }}>
          {milestone.category}
        </span>
      </td>
      <td>
        <button 
          onClick={handleToggle}
          disabled={isPending}
          style={{
            background: milestone.is_visible ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
            color: milestone.is_visible ? '#4ade80' : '#fca5a5',
            border: 'none',
            padding: '4px 8px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '12px'
          }}
        >
          {milestone.is_visible ? 'Live 👁️' : 'Hidden 🚫'}
        </button>
      </td>
      <td>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Link 
            href={`/dashboard/milestones/${milestone.id}`}
            style={{ padding: '4px 8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', textDecoration: 'none', color: 'white', fontSize: '12px' }}
          >
            Edit
          </Link>
          <button 
            onClick={handleDelete}
            disabled={isPending}
            style={{ padding: '4px 8px', background: 'rgba(239, 68, 68, 0.2)', color: '#fca5a5', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}
