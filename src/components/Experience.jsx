import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    role: 'Trainee Officer (Environmental)',
    org: 'Lupin Ltd.',
    period: 'Nov 2024 – Aug 2025',
    location: 'India',
    points: [
      'Maintained and organized structured environmental inspection datasets and documentation for audits and compliance reporting.',
      'Led digitization initiatives improving data tracking and documentation efficiency by 20%.',
      'Supported analysis of environmental monitoring records to ensure reporting accuracy.',
    ],
  },
  {
    role: 'Chemist / Supervisor',
    org: 'Farmson Pharmaceuticals',
    period: 'Jul 2023 – Oct 2024',
    location: 'India',
    points: [
      'Collected, recorded, and validated environmental monitoring data (air, water, treatment systems) ensuring data accuracy.',
      'Managed organized datasets supporting environmental compliance under strict timelines.',
      'Maintained detailed documentation used for audits and operational reporting.',
    ],
  },
  {
    role: 'Project Assistant',
    org: 'IHSS',
    period: 'Jan 2023 – Apr 2023',
    location: 'India',
    points: [
      'Collected field environmental data and performed spatial validation using ArcGIS, improving dataset accuracy by 20%.',
      'Organized environmental inspection evidence files and structured documentation for assessments.',
    ],
  },
  {
    role: 'Vice-President (Co-Curricular)',
    org: 'BGIS Club, SAIT',
    period: 'Sep 2025 – Present',
    location: 'Calgary, Alberta',
    points: [
      'Collaborated with a team of 5 executives to secure financing and lead the club.',
      'Organized Geospatial Industry Night with sponsors including Esri Canada, AltaLIS, and Stantec.',
      'Designed promotional materials, coordinated logistics, and engaged with industry professionals.',
    ],
  },
];

export default function Experience() {
  const sectionRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(el,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 83%' } }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="section">
      <div className="container-tight">
        <div className="text-center mb-10 md:mb-12 px-2">
          <span className="eyebrow">Work History</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl mt-3" style={{ fontStyle: 'italic' }}>Experience</h2>
        </div>

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="hidden md:block absolute left-1/2 -translate-x-px top-0 bottom-0 w-px"
            style={{ background: 'linear-gradient(to bottom, transparent, rgba(13,122,111,0.3) 20%, rgba(13,122,111,0.3) 80%, transparent)' }} />

          <div className="space-y-6 md:space-y-8">
            {experiences.map((exp, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={exp.role}
                  ref={el => (itemRefs.current[i] = el)}
                  className={`relative flex flex-col md:flex-row ${isLeft ? '' : 'md:flex-row-reverse'} gap-0`}
                >
                  {/* Card */}
                  <div className={`md:w-[calc(50%-28px)] ${isLeft ? 'md:pr-10' : 'md:pl-10'}`}>
                    <motion.div
                      whileHover={{ y: -4, boxShadow: 'var(--glass-shadow-hover)' }}
                      className="card p-5 sm:p-6"
                      style={{ transition: 'none' }}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                        <div className="min-w-0">
                          <h3 className="font-semibold text-sm sm:text-base" style={{ color: 'var(--text)' }}>{exp.role}</h3>
                          <p className="text-xs sm:text-sm font-medium" style={{ color: 'var(--accent)' }}>{exp.org}</p>
                        </div>
                        <span className="text-[10px] sm:text-xs px-2.5 py-1 rounded-full glass font-medium shrink-0" style={{ color: 'var(--text-3)' }}>
                          {exp.period}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 mb-3">
                        <MapPin size={11} style={{ color: 'var(--text-4)' }} />
                        <span className="text-[10px] sm:text-xs" style={{ color: 'var(--text-4)' }}>{exp.location}</span>
                      </div>
                      <ul className="space-y-2">
                        {exp.points.map((pt, pi) => (
                          <li key={pi} className="flex gap-2 text-xs sm:text-sm leading-6" style={{ color: 'var(--text-2)' }}>
                            <span className="flex-shrink-0 w-1 h-1 mt-2.5 rounded-full" style={{ background: 'var(--accent)' }} />
                            {pt}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>

                  {/* Dot on line */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-6 w-3.5 h-3.5 rounded-full border-2 border-white z-10"
                    style={{ background: 'var(--accent)', boxShadow: '0 0 0 4px rgba(13,122,111,0.15)' }} />

                  {/* Spacer */}
                  <div className="hidden md:block md:w-[calc(50%-28px)]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
