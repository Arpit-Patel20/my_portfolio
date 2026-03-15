import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    role: 'Senior GIS Analyst',
    org: 'National Geospatial Agency',
    period: '2022 – Present',
    location: 'New York, USA',
    points: [
      'Led large-scale spatial analysis for smart city planning using ArcGIS Pro and Python automation.',
      'Built geoprocessing pipelines that cut manual effort by 60% across the department.',
      'Produced authoritative cartographic outputs used in federal policy briefs.',
    ],
  },
  {
    role: 'GIS Specialist',
    org: 'EcoMap Conservation',
    period: '2020 – 2022',
    location: 'Remote / Field (6 regions)',
    points: [
      'Conducted GPS field surveys across 6 biodiversity hotspots and built spatial databases.',
      'Deployed public-facing interactive web maps using Leaflet.js and Mapbox.',
      'Managed the organisation\'s full spatial data infrastructure and metadata standards.',
    ],
  },
  {
    role: 'GIS Analyst — Intern',
    org: 'Regional Urban Planning Authority',
    period: '2019 – 2020',
    location: 'Boston, USA',
    points: [
      'Assisted in reclassifying 3,000+ parcels for a major land-use update project.',
      'Produced thematic maps for official city planning documents and public presentations.',
      'Applied supervised classification on Landsat imagery using ENVI for land-cover mapping.',
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
          { x: i % 2 === 0 ? -56 : 56, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 83%' } }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="section">
      <div className="container-tight">
        <div className="text-center mb-12">
          <span className="eyebrow">Work History</span>
          <h2 className="font-serif text-4xl md:text-5xl mt-3" style={{ fontStyle: 'italic' }}>Experience</h2>
        </div>

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="hidden md:block absolute left-1/2 -translate-x-px top-0 bottom-0 w-px"
            style={{ background: 'linear-gradient(to bottom, transparent, rgba(13,122,111,0.3) 20%, rgba(13,122,111,0.3) 80%, transparent)' }} />

          <div className="space-y-8">
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
                      className="card p-6"
                      style={{ transition: 'none' }}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                        <div>
                          <h3 className="font-semibold text-base" style={{ color: 'var(--text)' }}>{exp.role}</h3>
                          <p className="text-sm font-medium" style={{ color: 'var(--accent)' }}>{exp.org}</p>
                        </div>
                        <span className="text-xs px-2.5 py-1 rounded-full glass font-medium" style={{ color: 'var(--text-3)' }}>
                          {exp.period}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 mb-3">
                        <MapPin size={11} style={{ color: 'var(--text-4)' }} />
                        <span className="text-xs" style={{ color: 'var(--text-4)' }}>{exp.location}</span>
                      </div>
                      <ul className="space-y-2">
                        {exp.points.map((pt, pi) => (
                          <li key={pi} className="flex gap-2 text-sm leading-6" style={{ color: 'var(--text-2)' }}>
                            <span className="flex-shrink-0 w-1 h-1 mt-2 rounded-full" style={{ background: 'var(--accent)' }} />
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
