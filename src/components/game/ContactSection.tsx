'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SOCIAL_LINKS, TECHNICAL_SKILLS } from '@/lib/data/seed';
import styles from './ContactSection.module.css';

export default function ContactSection() {
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setFormState('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setFormState('idle'), 5000);
      } else {
        setFormState('error');
        setTimeout(() => setFormState('idle'), 3000);
      }
    } catch {
      setFormState('error');
      setTimeout(() => setFormState('idle'), 3000);
    }
  };

  return (
    <section className={styles.contact} id="contact">
      <div className={styles.container}>
        {/* Skills showcase */}
        <motion.div
          className={styles.skillsPanel}
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className={styles.skillsTitle}>Tech Arsenal</h3>
          {Object.entries(TECHNICAL_SKILLS).map(([category, skills]) => (
            <div key={category} className={styles.skillCategory}>
              <h4 className={styles.skillCatName}>{category}</h4>
              <div className={styles.skillList}>
                {skills.map((skill, i) => (
                  <span key={i} className={styles.skillPill}>{skill}</span>
                ))}
              </div>
            </div>
          ))}

          <div className={styles.socialLinks}>
            <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              🔗 LinkedIn
            </a>
            <a href={`https://${SOCIAL_LINKS.github.replace('https://', '')}`} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              💻 GitHub
            </a>
            <a href={`mailto:${SOCIAL_LINKS.email}`} className={styles.socialLink}>
              ✉️ Email
            </a>
            <a href={`tel:${SOCIAL_LINKS.phone}`} className={styles.socialLink}>
              📱 {SOCIAL_LINKS.phone}
            </a>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          className={styles.formPanel}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className={styles.formTitle}>Send a Message</h2>
          <p className={styles.formSubtitle}>
            Interested in working together? Drop me a message and I&apos;ll get back to you ASAP.
          </p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="contact-name" className={styles.label}>Name</label>
              <input
                id="contact-name"
                type="text"
                className="input-field"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="contact-email" className={styles.label}>Email</label>
              <input
                id="contact-email"
                type="email"
                className="input-field"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="contact-message" className={styles.label}>Message</label>
              <textarea
                id="contact-message"
                className={`input-field ${styles.textarea}`}
                placeholder="Tell me about your project..."
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />
            </div>

            <button
              type="submit"
              className={`btn btn-level ${styles.submitBtn}`}
              disabled={formState === 'sending'}
            >
              {formState === 'idle' && '🚀 Send Message'}
              {formState === 'sending' && '⏳ Sending...'}
              {formState === 'success' && '✅ +100 XP — Message Delivered!'}
              {formState === 'error' && '❌ Failed — Try Again'}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
