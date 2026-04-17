'use client';

import { motion } from 'framer-motion';
import type { MilestoneMetadata, ProjectInfo } from '@/types';
import styles from './MilestoneCard.module.css';

interface MilestoneCardProps {
  title: string;
  titleAr?: string;
  description: string;
  descriptionAr?: string;
  year: number;
  icon: string;
  category: string;
  themeColor: string;
  metadata: MilestoneMetadata;
  isVisible: boolean;
  index: number;
}

export default function MilestoneCard({
  title,
  titleAr,
  description,
  descriptionAr,
  year,
  icon,
  category,
  themeColor,
  metadata,
  isVisible,
  index,
}: MilestoneCardProps) {
  if (!isVisible) return null;

  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, x: 80, scale: 0.9 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -80 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 25,
        delay: 0.1,
      }}
    >
      {/* Card Header */}
      <div className={styles.cardHeader}>
        <div className={styles.iconBadge} style={{ background: themeColor }}>
          <span className={styles.iconEmoji}>{icon}</span>
        </div>
        <div className={styles.headerInfo}>
          <span className={styles.year}>{year}</span>
          <span
            className={styles.categoryBadge}
            style={{ borderColor: themeColor, color: themeColor }}
          >
            {category}
          </span>
        </div>
      </div>

      {/* Title */}
      <h3 className={styles.title}>{title}</h3>
      {titleAr && <p className={styles.titleAr}>{titleAr}</p>}

      {/* Description */}
      <p className={styles.description}>{description}</p>

      {/* GPA / Rank */}
      {(metadata.gpa || metadata.rank) && (
        <div className={styles.statsRow}>
          {metadata.gpa && (
            <div className={styles.stat}>
              <span className={styles.statLabel}>GPA</span>
              <span className={styles.statValue} style={{ color: themeColor }}>
                {metadata.gpa}
              </span>
            </div>
          )}
          {metadata.rank && (
            <div className={styles.stat}>
              <span className={styles.statLabel}>Rank</span>
              <span className={styles.statValue} style={{ color: themeColor }}>
                {metadata.rank}
              </span>
            </div>
          )}
          {metadata.institution && (
            <div className={styles.stat}>
              <span className={styles.statLabel}>📍</span>
              <span className={styles.statValue}>{metadata.institution}</span>
            </div>
          )}
        </div>
      )}

      {/* Company Info */}
      {metadata.company && (
        <div className={styles.companyBadge} style={{ borderColor: themeColor }}>
          <span className={styles.companyRole}>{metadata.role}</span>
          <span className={styles.companyName} style={{ color: themeColor }}>
            @ {metadata.company}
          </span>
        </div>
      )}

      {/* Projects */}
      {metadata.projects && metadata.projects.length > 0 && (
        <div className={styles.projectsSection}>
          <h4 className={styles.sectionTitle}>Projects</h4>
          <div className={styles.projectGrid}>
            {metadata.projects.map((project, i) => (
              <ProjectChip key={i} project={project} themeColor={themeColor} />
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {metadata.skills && metadata.skills.length > 0 && (
        <div className={styles.skillsSection}>
          <h4 className={styles.sectionTitle}>Skills Unlocked</h4>
          <div className={styles.skillTags}>
            {metadata.skills.map((skill, i) => (
              <span key={i} className={styles.skillTag} style={{ borderColor: themeColor }}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Courses */}
      {metadata.courses && metadata.courses.length > 0 && (
        <div className={styles.coursesSection}>
          <h4 className={styles.sectionTitle}>📜 Certifications</h4>
          <ul className={styles.courseList}>
            {metadata.courses.map((course, i) => (
              <li key={i} className={styles.courseItem}>
                <span className={styles.courseDot} style={{ background: themeColor }} />
                {course}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* External Links */}
      {metadata.links && metadata.links.length > 0 && (
        <div className={styles.linksSection}>
          <h4 className={styles.sectionTitle}>🔗 Quick Links</h4>
          <div className={styles.linkGrid}>
            {metadata.links.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.externalLink}
                style={{ borderColor: themeColor, color: themeColor }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Level indicator */}
      <div className={styles.levelIndicator} style={{ background: themeColor }}>
        Level {index + 1}
      </div>
    </motion.div>
  );
}

function ProjectChip({ project, themeColor }: { project: ProjectInfo; themeColor: string }) {
  const content = (
    <>
      <div className={styles.projectHeader}>
        <span className={styles.projectIcon}>{project.icon || '📦'}</span>
        <span className={styles.projectName}>{project.name}</span>
        {project.url && <span className={styles.linkIndicator}>↗</span>}
      </div>
      <p className={styles.projectDesc}>{project.description}</p>
      {project.period && (
        <span className={styles.projectPeriod}>{project.period}</span>
      )}
      <div className={styles.projectTech}>
        {project.tech.map((t, i) => (
          <span key={i} className={styles.techBadge} style={{ color: themeColor }}>
            {t}
          </span>
        ))}
      </div>
    </>
  );

  return (
    <motion.div
      className={`${styles.projectChip} ${project.url ? styles.clickable : ''}`}
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ type: 'spring', stiffness: 400 }}
    >
      {project.url ? (
        <a href={project.url} target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
          {content}
        </a>
      ) : content}
    </motion.div>
  );
}
