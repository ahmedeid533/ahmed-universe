'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createMilestone, updateMilestone } from '@/app/actions/milestones';
import type { Milestone } from '@/types';
import styles from '@/app/dashboard/dashboard.module.css';

interface MilestoneFormProps {
  initialData?: Milestone;
}

export default function MilestoneForm({ initialData }: MilestoneFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    title_ar: initialData?.title_ar || '',
    description: initialData?.description || '',
    description_ar: initialData?.description_ar || '',
    year: initialData?.year || new Date().getFullYear(),
    category: initialData?.category || 'work',
    theme: initialData?.theme || 'corporate',
    theme_color: initialData?.theme_color || '#3b82f6',
    icon: initialData?.icon || '💻',
    sort_order: initialData?.sort_order || 0,
    is_visible: initialData?.is_visible ?? true,
    metadataStr: initialData ? JSON.stringify(initialData.metadata, null, 2) : '{}',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked :
               type === 'number' ? Number(value) : value;
    
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      let parsedMetadata = {};
      try {
        parsedMetadata = JSON.parse(formData.metadataStr);
      } catch (err) {
        throw new Error('Invalid JSON in Metadata field');
      }

      const payload = {
        title: formData.title,
        title_ar: formData.title_ar,
        description: formData.description,
        description_ar: formData.description_ar,
        year: formData.year,
        category: formData.category,
        theme: formData.theme,
        theme_color: formData.theme_color,
        icon: formData.icon,
        sort_order: formData.sort_order,
        is_visible: formData.is_visible,
        metadata: parsedMetadata as any,
      };

      if (initialData?.id) {
        await updateMilestone(initialData.id, payload);
      } else {
        await createMilestone(payload);
      }

      router.push('/dashboard/milestones');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '800px', margin: '0 auto', background: 'rgba(255,255,255,0.02)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
      {error && <div style={{ color: '#ef4444', padding: '1rem', background: 'rgba(239,68,68,0.1)', borderRadius: '8px' }}>{error}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label>Title (English)</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required className={styles.inputField} style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.2)', color: 'white' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label>Title (Arabic)</label>
          <input type="text" name="title_ar" value={formData.title_ar} onChange={handleChange} className={styles.inputField} style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.2)', color: 'white' }} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label>Year</label>
          <input type="number" name="year" value={formData.year} onChange={handleChange} required className={styles.inputField} style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.2)', color: 'white' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label>Sort Order</label>
          <input type="number" name="sort_order" value={formData.sort_order} onChange={handleChange} required className={styles.inputField} style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.2)', color: 'white' }} />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label>Description (English)</label>
        <textarea name="description" value={formData.description} onChange={handleChange} required rows={3} style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.2)', color: 'white', resize: 'vertical' }} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label>Description (Arabic)</label>
        <textarea name="description_ar" value={formData.description_ar} onChange={handleChange} rows={3} style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.2)', color: 'white', resize: 'vertical' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label>Category</label>
          <input type="text" name="category" value={formData.category} onChange={handleChange} required style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.2)', color: 'white' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label>Theme Name</label>
          <input type="text" name="theme" value={formData.theme} onChange={handleChange} required style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.2)', color: 'white' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label>Icon / Emoji</label>
          <input type="text" name="icon" value={formData.icon} onChange={handleChange} required style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.2)', color: 'white' }} />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label>Theme Color (Hex)</label>
        <input type="color" name="theme_color" value={formData.theme_color} onChange={handleChange} style={{ height: '40px', width: '100px', cursor: 'pointer', background: 'transparent', border: 'none' }} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label>Metadata (JSON Array - Contains projects, skills, courses, links)</label>
        <textarea name="metadataStr" value={formData.metadataStr} onChange={handleChange} rows={10} style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.8)', color: '#10b981', fontFamily: 'monospace', resize: 'vertical' }} />
        <small style={{ color: 'var(--text-muted)' }}>Format strictly as standard JSON. Use arrays for "skills", "projects", "courses".</small>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <input type="checkbox" name="is_visible" id="is_visible" checked={formData.is_visible} onChange={handleChange} style={{ width: '20px', height: '20px' }} />
        <label htmlFor="is_visible">Is Visible in Portfolio?</label>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <button type="button" onClick={() => router.push('/dashboard/milestones')} className="btn btn-outline" style={{ padding: '12px 24px', flex: 1 }}>Cancel</button>
        <button type="submit" disabled={isSubmitting} className="btn btn-level" style={{ padding: '12px 24px', flex: 2 }}>
          {isSubmitting ? 'Saving...' : initialData ? 'Save Changes' : 'Create Milestone'}
        </button>
      </div>
    </form>
  );
}
