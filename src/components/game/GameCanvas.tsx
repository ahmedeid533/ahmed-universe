'use client';

import { useScrollProgress } from '@/hooks/useScrollProgress';
import { useAvatar } from '@/hooks/useAvatar';
import { useMilestones } from '@/hooks/useMilestones';
import Avatar from './Avatar';
import MilestoneCard from './MilestoneCard';
import MiniMap from './MiniMap';
import ScrollProgress from './ScrollProgress';
import HeroSection from './HeroSection';
import ContactSection from './ContactSection';
import AudioSystem from './AudioSystem';
import AchievementPopup from './AchievementPopup';
import styles from './GameCanvas.module.css';

const TOTAL_LEVELS = 6;

export default function GameCanvas() {
  const { percentage, currentLevelIndex, isScrolling, direction } = useScrollProgress();
  const { currentSkin, currentSkinName } = useAvatar(currentLevelIndex);
  const { milestones } = useMilestones();

  const currentMilestoneTitle = currentLevelIndex >= 0 ? milestones[currentLevelIndex]?.title : 'The Beginning';

  return (
    <div className={styles.gameCanvas}>
      {/* HUD & Effects */}
      <AchievementPopup levelIndex={currentLevelIndex} levelTitle={currentMilestoneTitle} />
      <ScrollProgress percentage={percentage} />

      {/* Audio SFX */}
      <AudioSystem currentLevel={currentLevelIndex} />

      {/* Mini Map */}
      <MiniMap currentLevel={currentLevelIndex} milestones={milestones} isScrolling={isScrolling} />

      {/* Fixed Avatar */}
      <Avatar
        skinUrl={currentSkin}
        skinName={currentSkinName}
        isScrolling={isScrolling}
        direction={direction}
        levelIndex={currentLevelIndex}
      />

      {/* Hero Section */}
      <HeroSection />

      {/* Level Sections */}
      {milestones.map((milestone, index) => (
        <section
          key={milestone.id}
          className={styles.levelSection}
          data-level={milestone.theme}
          id={`level-${index}`}
        >
          {/* Background gradient for each level */}
          <div
            className={styles.levelBg}
            style={{
              background: `radial-gradient(ellipse at 30% 50%, ${milestone.theme_color}10 0%, transparent 60%),
                           radial-gradient(ellipse at 70% 80%, ${milestone.theme_color}08 0%, transparent 50%)`,
            }}
          />

          {/* Floating decorative elements */}
          <div className={styles.floatingElements}>
            {[
              { l: 25, t: 15, s: 5, d: 3.5 },
              { l: 55, t: 35, s: 7, d: 4.2 },
              { l: 40, t: 65, s: 4, d: 5.0 },
              { l: 70, t: 20, s: 8, d: 3.8 },
              { l: 35, t: 80, s: 6, d: 4.5 },
            ].map((orb, i) => (
              <div
                key={i}
                className={styles.floatingOrb}
                style={{
                  left: `${orb.l}%`,
                  top: `${orb.t}%`,
                  width: `${orb.s}px`,
                  height: `${orb.s}px`,
                  background: milestone.theme_color,
                  animationDelay: `${i * 0.8}s`,
                  animationDuration: `${orb.d}s`,
                }}
              />
            ))}
          </div>

          {/* Milestone Card — positioned right side */}
          <div className={styles.cardContainer}>
            <MilestoneCard
              title={milestone.title}
              titleAr={milestone.title_ar}
              description={milestone.description}
              descriptionAr={milestone.description_ar}
              year={milestone.year}
              icon={milestone.icon}
              category={milestone.category}
              themeColor={milestone.theme_color}
              metadata={milestone.metadata}
              isVisible={true}
              index={index}
            />
          </div>

          {/* Year marker */}
          <div className={styles.yearMarker} style={{ color: milestone.theme_color }}>
            {milestone.year}
          </div>
        </section>
      ))}

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <footer className={styles.footer}>
        <p className={styles.footerText}>
          Built with 💜 by <strong>Ahmed Eid Gomaa</strong>
        </p>
        <p className={styles.footerSub}>
          Next.js • GSAP • Framer Motion • Supabase
        </p>
      </footer>
    </div>
  );
}
