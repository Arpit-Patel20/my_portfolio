import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { Github, Linkedin, Download, Mail, MapPin, ArrowDown } from 'lucide-react';

const socials = [
  { href: 'https://linkedin.com', icon: <Linkedin size={15} />, label: 'LinkedIn' },
  { href: 'https://github.com', icon: <Github size={15} />, label: 'GitHub' },
];

const NAME_WORDS = ['Arpit', 'Patel'];

const wordVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay: 0.4 + i * 0.18, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Hero({ onNavigate }) {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 100]);
  const heroOpacity = useTransform(scrollY, [0, 350], [1, 0]);
  const lineRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(lineRef.current,
      { scaleX: 0, transformOrigin: 'left center' },
      { scaleX: 1, duration: 0.9, delay: 1.1, ease: 'power3.out' }
    );
  }, []);

  return (
    <section id="profile" className="relative min-h-screen flex items-center overflow-hidden">
      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="container-tight pt-28 pb-16 flex flex-col md:flex-row items-center gap-10 md:gap-14"
      >
        {/* ── Text left ── */}
        <div className="flex-1 order-2 md:order-1 space-y-5">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}>
            <span className="eyebrow">GIS Analyst · Spatial Data Specialist</span>
          </motion.div>

          {/* Name */}
          <div>
            <h1 className="font-serif leading-[1.04]"
              style={{ fontStyle: 'italic', fontSize: 'clamp(3.2rem, 8vw, 5.5rem)', color: '#1A1714' }}>
              {NAME_WORDS.map((word, i) => (
                <motion.span key={word} custom={i} initial="hidden" animate="visible" variants={wordVariants}
                  style={{ display: 'inline-block', marginRight: i < NAME_WORDS.length - 1 ? '0.28em' : 0 }}>
                  {word}
                </motion.span>
              ))}
            </h1>
            <div ref={lineRef} className="h-0.5 mt-2 rounded-full w-2/3"
              style={{ background: 'linear-gradient(90deg, var(--accent), transparent)' }} />
          </div>

          {/* Subtitle */}
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1.0 }}
            className="text-base md:text-lg leading-7 max-w-md" style={{ color: 'var(--text-2)' }}>
            Passionate about maps, data, and the stories they tell. Turning geographic complexity into clear, beautiful spatial insights.
          </motion.p>

          {/* Location */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1.2 }}
            className="flex items-center gap-1.5 text-sm" style={{ color: 'var(--text-3)' }}>
            <MapPin size={13} />
            <span>Open to Relocate · Remote Friendly</span>
          </motion.div>

          {/* Actions */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.35 }}
            className="flex flex-wrap gap-3">
            <motion.a href="/assets/arpit-cv.pdf" download whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }} className="btn-primary">
              <Download size={14} /> Download CV
            </motion.a>
            <motion.a href="#contact" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }} className="btn-ghost">
              <Mail size={14} /> Get in Touch
            </motion.a>
          </motion.div>

          {/* Socials */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1.5 }}
            className="flex gap-2">
            {socials.map(({ href, icon, label }) => (
              <motion.a key={label} href={href} target="_blank" rel="noreferrer"
                whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.93 }}
                className="btn-ghost text-xs px-4 py-2 gap-2">
                {icon} {label}
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* ── Photo right ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.25, type: 'spring', stiffness: 70, damping: 16 }}
          className="order-1 md:order-2 shrink-0 relative"
        >
          {/* Rings */}
          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 22, ease: 'linear' }}
            className="absolute inset-[-18px] rounded-[2.8rem] border border-dashed"
            style={{ borderColor: 'rgba(13,122,111,0.22)' }} />
          <motion.div animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 35, ease: 'linear' }}
            className="absolute inset-[-32px] rounded-[3.2rem] border"
            style={{ borderColor: 'rgba(180,83,9,0.10)', borderStyle: 'dotted' }} />
          {/* Glow */}
          <div className="absolute inset-0 rounded-[2.4rem] blur-2xl opacity-60"
            style={{ background: 'radial-gradient(circle at 50% 30%, rgba(13,122,111,0.18), rgba(180,83,9,0.08) 60%, transparent 80%)' }} />
          {/* Photo */}
          <div className="relative overflow-hidden" style={{
            width: 'clamp(190px, 26vw, 260px)', height: 'clamp(240px, 34vw, 340px)',
            borderRadius: '2.25rem',
            boxShadow: '0 20px 64px rgba(13,122,111,0.16), 0 4px 20px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.9)',
            background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.88)', padding: '6px',
          }}>
            <img src="/assets/arpit.jpg" alt="Arpit Patel" style={{
              width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top',
              borderRadius: '1.9rem', display: 'block',
            }} />
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%',
              borderRadius: '0 0 1.9rem 1.9rem',
              background: 'linear-gradient(to top, rgba(209,250,229,0.45) 0%, transparent 100%)',
              pointerEvents: 'none',
            }} />
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}>
          <ArrowDown size={18} style={{ color: 'var(--text-4)' }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
