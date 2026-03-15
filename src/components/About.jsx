import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Globe, Briefcase, BookOpen, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { label: 'Years in GIS', value: '5+' },
  { label: 'Projects Done', value: '30+' },
  { label: 'Certifications', value: '4' },
  { label: 'Countries Mapped', value: '12' },
];

const cards = [
  { icon: Globe, color: '#0D7A6F', bg: 'var(--accent-light)', title: 'GIS Expertise', body: '5+ years with ArcGIS, QGIS, and spatial databases across environmental and urban planning projects.' },
  { icon: Briefcase, color: '#0D7A6F', bg: 'var(--accent-light)', title: 'Work Experience', body: '3+ years in professional GIS roles — government, NGOs, and private sector at regional and national scale.' },
  { icon: BookOpen, color: '#B45309', bg: 'var(--accent-2-light)', title: 'Education', body: 'M.Sc. GIS · B.Sc. Environmental Science — trained in both technical spatial analysis and field research.' },
  { icon: Award, color: '#B45309', bg: 'var(--accent-2-light)', title: 'Certifications', body: 'Esri ArcGIS Desktop Associate · Google Earth Engine · Remote Sensing Professional · QGIS Advanced' },
];

export default function About() {
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(leftRef.current, { x: -56, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: leftRef.current, start: 'top 80%' } });

      gsap.fromTo(rightRef.current, { x: 56, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: rightRef.current, start: 'top 80%' } });

      gsap.fromTo(statsRef.current?.children ?? [],
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.55, ease: 'power2.out',
          scrollTrigger: { trigger: statsRef.current, start: 'top 84%' } });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="section">
      <div className="container-tight">
        <div className="text-center mb-12">
          <span className="eyebrow">About Me</span>
          <h2 className="font-serif text-4xl md:text-5xl mt-3" style={{ fontStyle: 'italic' }}>The Story So Far</h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left — cards: equal height grid */}
          <div
            ref={leftRef}
            style={{
              flex: 1,
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gridAutoRows: '1fr',   /* ← this makes all rows equal height */
              gap: '16px',
            }}
          >
            {cards.map(({ icon: Icon, color, bg, title, body }) => (
              <motion.div
                key={title}
                whileHover={{ y: -5, boxShadow: 'var(--glass-shadow-hover)' }}
                className="card p-5 flex flex-col gap-3"
                style={{ height: '100%', transition: 'none' }}
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: bg }}>
                  <Icon size={18} style={{ color }} />
                </div>
                <div className="flex flex-col flex-1">
                  <h3 className="font-semibold text-sm mb-1.5" style={{ color: 'var(--text)' }}>{title}</h3>
                  <p className="text-sm leading-6" style={{ color: 'var(--text-2)' }}>{body}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right — bio + stats */}
          <div ref={rightRef} className="flex-1 space-y-6">
            <div className="space-y-4">
              <p className="text-base leading-7" style={{ color: 'var(--text-2)' }}>
                I'm Arpit — a GIS Analyst who believes maps are more than data, they're stories. My work spans environmental monitoring, urban infrastructure, land-use planning, and disaster response across multiple countries.
              </p>
              <p className="text-base leading-7" style={{ color: 'var(--text-2)' }}>
                I care deeply about the real-world impact of spatial analysis — from helping communities prepare for floods to informing conservation decisions. Precision and purpose guide everything I build.
              </p>
            </div>

            {/* Stats — equal height enforced by minHeight */}
            <div ref={statsRef} className="grid grid-cols-2 gap-4" style={{ gridAutoRows: '1fr' }}>
              {stats.map((s) => (
                <motion.div
                  key={s.label}
                  whileHover={{ y: -4, boxShadow: 'var(--glass-shadow-hover)' }}
                  className="card flex flex-col items-center justify-center text-center"
                  style={{ transition: 'none', minHeight: '100px', padding: '20px 16px' }}
                >
                  <p className="font-serif text-[2.1rem] leading-none text-grad mb-1" style={{ fontStyle: 'italic' }}>{s.value}</p>
                  <p className="text-xs" style={{ color: 'var(--text-3)' }}>{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
