'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { scrollToLevel } from '@/hooks/useScrollProgress';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { label: 'Home', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
  { label: 'Journey', action: () => scrollToLevel(1) },
  { label: 'Projects', action: () => scrollToLevel(2) },
  { label: 'Contact', action: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContent}>
        <button
          className={styles.logo}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <span className={styles.logoIcon}>🎮</span>
          <span className={styles.logoText}>Ahmed&apos;s Universe</span>
        </button>

        {/* Desktop links */}
        <div className={styles.desktopLinks}>
          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              className={styles.navLink}
              onClick={link.action}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Hamburger */}
        <button
          className={`${styles.hamburger} ${isOpen ? styles.open : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                className={styles.mobileLink}
                onClick={() => {
                  link.action();
                  setIsOpen(false);
                }}
              >
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
