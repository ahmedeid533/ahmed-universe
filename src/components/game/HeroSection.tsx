'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Star field background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const stars: { x: number; y: number; r: number; speed: number; opacity: number }[] = [];

    // Mouse tracking for parallax
    const mouseConfig = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      mouseConfig.targetX = (e.clientX - window.innerWidth / 2) * 0.1;
      mouseConfig.targetY = (e.clientY - window.innerHeight / 2) * 0.1;
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initStars = () => {
      stars.length = 0;
      for (let i = 0; i < 200; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 2 + 0.5,
          speed: Math.random() * 0.8 + 0.1,
          opacity: Math.random() * 0.8 + 0.2,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth mouse follow
      mouseConfig.x += (mouseConfig.targetX - mouseConfig.x) * 0.05;
      mouseConfig.y += (mouseConfig.targetY - mouseConfig.y) * 0.05;

      stars.forEach((star) => {
        ctx.beginPath();
        // Add mouse offset scaled by star speed (depth sorting basically)
        const renderX = star.x - mouseConfig.x * star.speed * 2;
        const renderY = star.y - mouseConfig.y * star.speed * 2;
        
        ctx.arc(renderX, renderY, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(167, 139, 250, ${star.opacity})`;
        ctx.fill();

        star.y += star.speed;
        star.opacity += Math.sin(Date.now() * 0.001 + star.x) * 0.01;
        star.opacity = Math.max(0.1, Math.min(1, star.opacity));

        // Wrap around logic with mouse offset considered
        if (renderY > canvas.height + 50) {
          star.y = -50 + mouseConfig.y * star.speed * 2;
          star.x = Math.random() * canvas.width;
        } else if (renderY < -50) {
          star.y = canvas.height + 50 + mouseConfig.y * star.speed * 2;
        }

        if (renderX > canvas.width + 50) {
          star.x = -50 + mouseConfig.x * star.speed * 2;
        } else if (renderX < -50) {
          star.x = canvas.width + 50 + mouseConfig.x * star.speed * 2;
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    resize();
    initStars();
    animate();

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className={styles.hero} id="hero">
      <canvas ref={canvasRef} className={styles.starfield} />

      <div className={styles.content}>
        <motion.div
          className={styles.badge}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <span className={styles.badgeDot} />
          Welcome to my universe
        </motion.div>

        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <span className={styles.titleGame}>Ahmed&apos;s</span>
          <br />
          <span className={styles.titleUniverse}>Universe</span>
        </motion.h1>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          Lead Frontend Engineer • Building Digital Experiences
        </motion.p>

        <motion.p
          className={styles.description}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
        >
          Scroll down to explore my journey from a curious engineering student 
          to a Lead Architect building enterprise applications.
        </motion.p>

        <motion.div
          className={styles.heroStats}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <div className={styles.heroStat}>
            <span className={styles.heroStatValue}>3+</span>
            <span className={styles.heroStatLabel}>Years Exp</span>
          </div>
          <div className={styles.heroDivider} />
          <div className={styles.heroStat}>
            <span className={styles.heroStatValue}>10+</span>
            <span className={styles.heroStatLabel}>Projects</span>
          </div>
          <div className={styles.heroDivider} />
          <div className={styles.heroStat}>
            <span className={styles.heroStatValue}>6</span>
            <span className={styles.heroStatLabel}>Levels</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0 }}
      >
        <span className={styles.scrollText}>Scroll to Begin</span>
        <motion.div
          className={styles.scrollArrow}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          ↓
        </motion.div>
      </motion.div>

      {/* Gradient overlay at bottom */}
      <div className={styles.gradientBottom} />
    </section>
  );
}
