import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ onNavigate }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      {/* Pill nav */}
      <div className="container-tight pt-4">
        <div
          style={{
            borderRadius: '18px',
            background: scrolled ? 'rgba(255,255,255,0.30)' : 'rgba(255,255,255,0.12)',
            backdropFilter: 'blur(48px) saturate(220%) brightness(108%)',
            WebkitBackdropFilter: 'blur(48px) saturate(220%) brightness(108%)',
            border: scrolled ? '1px solid rgba(255,255,255,0.50)' : '1px solid rgba(255,255,255,0.30)',
            boxShadow: scrolled
              ? '0 4px 28px rgba(13,122,111,0.08), 0 1px 3px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.55)'
              : '0 2px 12px rgba(13,122,111,0.04), inset 0 1px 0 rgba(255,255,255,0.35)',
            transition: 'all 0.45s cubic-bezier(0.16,1,0.3,1)',
          }}
          className="relative flex items-center justify-between px-5 py-3"
        >
          {/* Specular highlight line */}
          <div className="absolute inset-x-0 top-0 h-px rounded-t-2xl" style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)'
          }} />

          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 z-10">
            <div className="relative w-8 h-8 rounded-xl flex items-center justify-center overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #0D7A6F, #1a9e90)' }}>
              <span className="font-bold text-white text-sm">A</span>
              <div className="absolute inset-0 flex items-start justify-center">
                <div className="w-full h-1/2 rounded-t-xl" style={{ background: 'rgba(255,255,255,0.15)' }} />
              </div>
            </div>
            <span className="font-semibold text-sm" style={{ color: 'var(--text)' }}>Arpit Patel</span>
          </a>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              l.label === 'Projects'
                ? (
                  <motion.button
                    key={l.label}
                    onClick={() => { onNavigate?.('projects'); setActive(l.href); }}
                    whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                    className="relative px-4 py-1.5 text-sm font-medium rounded-xl transition-colors"
                    style={{ color: active === l.href ? 'var(--accent)' : 'var(--text-3)', background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    {active === l.href && (
                      <motion.div layoutId="nav-pill" className="absolute inset-0 rounded-xl"
                        style={{ background: 'var(--accent-light)' }} />
                    )}
                    <span className="relative">{l.label}</span>
                  </motion.button>
                )
                : (
                  <motion.a
                    key={l.label} href={l.href}
                    whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                    onClick={() => setActive(l.href)}
                    className="relative px-4 py-1.5 text-sm font-medium rounded-xl transition-colors"
                    style={{ color: active === l.href ? 'var(--accent)' : 'var(--text-3)' }}
                  >
                    {active === l.href && (
                      <motion.div layoutId="nav-pill" className="absolute inset-0 rounded-xl"
                        style={{ background: 'var(--accent-light)' }} />
                    )}
                    <span className="relative">{l.label}</span>
                  </motion.a>
                )
            ))}
          </nav>

          {/* CTA */}
          <a href="#contact" className="hidden md:flex btn-primary text-xs px-5 py-2.5">
            Hire Me
          </a>

          {/* Mobile menu btn */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setOpen(!open)}
            className="md:hidden w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.05)', color: 'var(--text)' }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {open
                ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X size={18} /></motion.span>
                : <motion.span key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><Menu size={18} /></motion.span>
              }
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="md:hidden mx-4 mt-2 glass-strong rounded-2xl p-4 overflow-hidden"
          >
            {links.map((l, i) => (
              <motion.a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center justify-between px-3 py-3 rounded-xl text-sm font-medium transition-colors hover:bg-black/5"
                style={{ color: 'var(--text-2)' }}
              >
                {l.label}
                <span style={{ color: 'var(--text-4)' }}>→</span>
              </motion.a>
            ))}
            <div className="mt-3 pt-3" style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}>
              <a href="#contact" className="btn-primary w-full justify-center text-sm">Hire Me</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
