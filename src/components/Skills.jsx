import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const tools = [
  { name: 'ArcGIS Pro', pct: 92, cat: 'GIS Software' },
  { name: 'QGIS', pct: 90, cat: 'GIS Software' },
  { name: 'ArcGIS Online / Web', pct: 85, cat: 'Web GIS' },
  { name: 'Google Earth Engine', pct: 80, cat: 'Remote Sensing' },
  { name: 'ENVI / ERDAS Imagine', pct: 74, cat: 'Image Analysis' },
  { name: 'Python — arcpy / geopandas', pct: 78, cat: 'Programming' },
  { name: 'R — sf / tmap / ggplot2', pct: 70, cat: 'Programming' },
  { name: 'PostGIS / PostgreSQL', pct: 72, cat: 'Database' },
  { name: 'AutoCAD / Civil 3D', pct: 65, cat: 'CAD' },
  { name: 'Mapbox / Leaflet.js', pct: 68, cat: 'Web Mapping' },
  { name: 'Survey123 / Collector', pct: 88, cat: 'Field GIS' },
  { name: 'Pix4D / DJI Terra', pct: 74, cat: 'UAV / Drone' },
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
      'Remote Sensing': '#7c3aed', 'Image Analysis': '#7c3aed',
      'Programming': 'var(--accent-2)', 'Database': 'var(--accent-2)',
      'CAD': '#64748b', 'Web Mapping': '#64748b',
      'Field GIS': 'var(--accent)', 'UAV / Drone': '#7c3aed',
    };
    const fillColor = catColors[tool.cat] || 'var(--accent)';

    return (
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>{tool.name}</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full font-medium"
              style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>{tool.cat}</span>
          </div>
          <span className="text-xs tabular-nums font-semibold" style={{ color: 'var(--text-3)' }}>{tool.pct}%</span>
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
        <div className="text-center mb-12">
          <span className="eyebrow">Toolkit</span>
          <h2 className="font-serif text-4xl md:text-5xl mt-3" style={{ fontStyle: 'italic' }}>GIS Tools & Skills</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div ref={leftRef} whileHover={{}} className="card p-7 space-y-5">
            {tools.slice(0, half).map((t, i) => <BarItem key={t.name} tool={t} idx={i} />)}
          </motion.div>
          <motion.div ref={rightRef} whileHover={{}} className="card p-7 space-y-5">
            {tools.slice(half).map((t, i) => <BarItem key={t.name} tool={t} idx={i + half} />)}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
