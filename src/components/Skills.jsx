import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skillGroups = [
  {
    id: 'production',
    category: 'Production & Imagery',
    color: 'var(--accent)',
    bg: 'var(--accent-light)',
    dot: '#0079C1',
    skills: [
      'HxMap', 'ArcGIS Pro', 'ArcMap',
      'Orthomosaic QA/QC', 'Seamline Editing',
      'Raw Data Review', 'Aerotriangulation Support',
    ],
  },
  {
    id: 'analysis',
    category: 'Analysis & Automation',
    color: '#7c3aed',
    bg: 'rgba(124,58,237,0.12)',
    dot: '#7c3aed',
    skills: [
      'Remote Sensing & Imagery', 'ModelBuilder',
      'Python (ArcPy)', 'FME (Safe Software)',
      'Spatial Statistics', 'NDVI & Raster Analysis',
    ],
  },
  {
    id: 'webfield',
    category: 'Web & Field GIS',
    color: '#00A9E0',
    bg: 'var(--accent-2-light)',
    dot: '#00A9E0',
    skills: [
      'ArcGIS Online', 'Experience Builder',
      'Survey123 / Field Maps', 'GNSS / GPS',
      'Enterprise GIS',
    ],
  },
  {
    id: 'data',
    category: 'Data & Cartography',
    color: '#0d7a6f',
    bg: 'rgba(13,122,111,0.12)',
    dot: '#0d7a6f',
    skills: [
      'QGIS', 'Spatial Data QA/QC',
      'Cartography & Layout', 'Geodatabases',
      'Metadata Management', 'Geospatial Documentation',
    ],
  },
];

export default function Skills() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(el,
          { y: 36, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.75, ease: 'power3.out', delay: i * 0.08,
            scrollTrigger: { trigger: el, start: 'top 85%' } }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        .skill-chip { transition: transform 0.15s ease, box-shadow 0.15s ease; cursor: default; }
        .skill-chip:hover { transform: translateY(-2px) scale(1.07); }
        .skill-chip-production:hover { box-shadow: 0 0 8px rgba(0,121,193,0.65), 0 0 18px rgba(0,121,193,0.25); }
        .skill-chip-analysis:hover   { box-shadow: 0 0 8px rgba(124,58,237,0.65), 0 0 18px rgba(124,58,237,0.25); }
        .skill-chip-webfield:hover   { box-shadow: 0 0 8px rgba(0,169,224,0.65), 0 0 18px rgba(0,169,224,0.25); }
        .skill-chip-data:hover       { box-shadow: 0 0 8px rgba(13,122,111,0.65), 0 0 18px rgba(13,122,111,0.25); }
      `}</style>
      <section id="skills" ref={sectionRef} className="section">
      <div className="container-tight">
        <div className="text-center mb-10 md:mb-12 px-2">
          <span className="eyebrow">Toolkit</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl mt-3" style={{ fontStyle: 'italic' }}>GIS Tools &amp; Skills</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.id}
              ref={el => (cardRefs.current[i] = el)}
              whileHover={{ y: -4, boxShadow: 'var(--glass-shadow-hover)' }}
              className="card p-5 sm:p-6"
              style={{ transition: 'none' }}
            >
              {/* Category header */}
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ background: group.dot }}
                />
                <span
                  className="text-xs sm:text-sm font-semibold tracking-wide uppercase"
                  style={{ color: group.color, letterSpacing: '0.06em' }}
                >
                  {group.category}
                </span>
              </div>

              {/* Skill chips */}
              <div className="flex flex-wrap gap-2">
                {group.skills.map(skill => (
                  <span
                    key={skill}
                    className={`skill-chip skill-chip-${group.id} text-[11px] sm:text-xs px-2.5 py-1 rounded-full font-medium`}
                    style={{
                      background: group.bg,
                      color: group.color,
                      border: `1px solid ${group.dot}22`,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
}
