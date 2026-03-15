import React from 'react';
import { motion } from 'framer-motion';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  return (
    <footer className="py-8" style={{ borderTop: '1px solid rgba(0,0,0,0.07)' }}>
      <div className="container-tight flex flex-col sm:flex-row items-center justify-between gap-4">
        <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2">
          {links.map(l => (
            <motion.a
              key={l.label}
              href={l.href}
              whileHover={{ color: 'var(--accent)' }}
              className="text-sm transition-colors"
              style={{ color: 'var(--text-4)' }}
            >
              {l.label}
            </motion.a>
          ))}
        </nav>
        <motion.button
          whileHover={{ y: -2, color: 'var(--accent)' }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-xs font-medium transition-colors"
          style={{ color: 'var(--text-4)' }}
        >
          ↑ Top
        </motion.button>
      </div>
    </footer>
  );
}
