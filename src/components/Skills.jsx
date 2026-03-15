import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const tools = [
  { name: 'ArcGIS Pro', pct: 92, cat: 'GIS Software' },
  { name: 'QGIS', pct: 88, cat: 'GIS Software' },
  { name: 'ArcGIS Online', pct: 85, cat: 'Web GIS' },
  { name: 'ModelBuilder', pct: 90, cat: 'Automation' },
  { name: 'Survey123 / Field Maps', pct: 88, cat: 'Field GIS' },
  { name: 'Remote Sensing (RS)', pct: 78, cat: 'Remote Sensing' },
  { name: 'ArcGIS Experience Builder', pct: 78, cat: 'Web GIS' },
  { name: 'GNSS / GPS', pct: 80, cat: 'Field GIS' },
  { name: 'GIS Programming', pct: 70, cat: 'Programming' },
  { name: 'Cartography', pct: 88, cat: 'Cartography' },
  { name: 'Data Capture & QA/QC', pct: 90, cat: 'Data Mgmt' },
  { name: 'Enterprise & Web GIS', pct: 78, cat: 'Web GIS' },
];

export default function Skills() {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const barRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(leftRef.current, { x: -56, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: leftRef.current, start: 'top 82%' } });

      gsap.fromTo(rightRef.current, { x: 56, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: rightRef.current, start: 'top 82%' } });

      barRefs.current.forEach((bar, i) => {
        if (!bar) return;
        gsap.fromTo(bar,
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 0.9, ease: 'power3.out', delay: i * 0.05,
            scrollTrigger: { trigger: bar, start: 'top 90%' } });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const half = Math.ceil(tools.length / 2);

  function BarItem({ tool, idx }) {
    const catColors = {
      'GIS Software': 'var(--accent)', 'Web GIS': 'var(--accent)',
      'Remote Sensing': '#7c3aed', 'Automation': '#7c3aed',
      'Programming': 'var(--accent-2)', 'Data Mgmt': 'var(--accent-2)',
      'CAD': '#64748b', 'Cartography': '#64748b',
      'Field GIS': 'var(--accent)',
    };
    const fillColor = catColors[tool.cat] || 'var(--accent)';

    return (
      <div className="space-y-1.5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0.5 sm:gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs sm:text-sm font-medium" style={{ color: 'var(--text)' }}>{tool.name}</span>
            <span className="text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded-full font-medium"
              style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>{tool.cat}</span>
          </div>
          <span className="text-[10px] sm:text-xs tabular-nums font-semibold" style={{ color: 'var(--text-3)' }}>{tool.pct}%</span>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(0,0,0,0.08)' }}>
          <div
            ref={el => (barRefs.current[idx] = el)}
            className="h-full rounded-full"
            style={{ width: `${tool.pct}%`, background: `linear-gradient(90deg, ${fillColor}, ${fillColor}99)` }}
          />
        </div>
      </div>
    );
  }

  return (
    <section id="skills" ref={sectionRef} className="section">
      <div className="container-tight">
        <div className="text-center mb-10 md:mb-12 px-2">
          <span className="eyebrow">Toolkit</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl mt-3" style={{ fontStyle: 'italic' }}>GIS Tools & Skills</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <motion.div ref={leftRef} whileHover={{}} className="card p-5 sm:p-7 space-y-4 sm:space-y-5">
            {tools.slice(0, half).map((t, i) => <BarItem key={t.name} tool={t} idx={i} />)}
          </motion.div>
          <motion.div ref={rightRef} whileHover={{}} className="card p-5 sm:p-7 space-y-4 sm:space-y-5">
            {tools.slice(half).map((t, i) => <BarItem key={t.name} tool={t} idx={i + half} />)}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
