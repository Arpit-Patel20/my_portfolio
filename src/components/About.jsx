import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Globe, Briefcase, BookOpen, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { label: 'GPA (SAIT)', value: '3.51' },
  { label: 'Professional Roles', value: '3' },
  { label: 'Degrees Earned', value: '2' },
  { label: 'BGIS Club VP', value: '✓' },
];

const cards = [
  { icon: Globe,    color: '#0079C1', bg: 'var(--accent-light)',   title: 'GIS Expertise',          body: (
    <><span style={{opacity:0.75, fontSize:'0.8rem'}}>Specialized training in Geographic Information Systems with hands-on experience in:</span>
    <ul style={{marginTop:'8px', paddingLeft:'1.1em', lineHeight:'1.9', fontSize:'0.8rem', listStyleType:'disc'}}>
      <li>ArcGIS Pro &amp; ArcGIS Online</li>
      <li>Spatial Analysis &amp; Geodatabases</li>
      <li>Remote Sensing &amp; Satellite Imagery</li>
      <li>GNSS &amp; Field Data Collection</li>
      <li>Web GIS &amp; Interactive Mapping</li>
      <li>Python Automation (ArcPy) &amp; FME</li>
    </ul></>
  )},
  { icon: Briefcase, color: '#0079C1', bg: 'var(--accent-light)', title: 'Professional Experience', body: (
    <div style={{fontSize:'0.8rem', lineHeight:'1.75'}}>
      Environmental and data-focused roles at Lupin Ltd., Farmson Pharmaceuticals, and IHSS — developing analytical skills that directly support geospatial workflows.
    </div>
  )},
  { icon: BookOpen, color: '#00A9E0', bg: 'var(--accent-2-light)', title: 'Education', body: (
    <>
      <div style={{marginBottom:'8px'}}>
        <div style={{fontWeight:600, fontSize:'0.78rem', color:'var(--text)'}}>Bachelor of Applied Technology – GIS</div>
        <div style={{opacity:0.7, fontSize:'0.75rem'}}>Southern Alberta Institute of Technology (SAIT), Calgary</div>
      </div>
      <div style={{marginBottom:'8px'}}>
        <div style={{fontWeight:600, fontSize:'0.78rem', color:'var(--text)'}}>Master of Science – Environmental Science &amp; Technology</div>
        <div style={{opacity:0.7, fontSize:'0.75rem'}}>CVM University, India</div>
      </div>
      <div style={{opacity:0.65, fontSize:'0.75rem', marginTop:'6px'}}>Academic focus: spatial analysis, geodatabases, cartography, remote sensing, and geospatial automation.</div>
    </>
  )},
  { icon: Users,    color: '#00A9E0', bg: 'var(--accent-2-light)', title: 'Leadership',              body: 'Vice-President of BGIS Club at SAIT — organizing Geospatial Industry Nights with Esri Canada, AltaLIS, Stantec, and more.' },
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
        <div className="text-center mb-10 md:mb-12 px-2">
          <span className="eyebrow">About Me</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl mt-3" style={{ fontStyle: 'italic' }}>The Story So Far</h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-stretch">
          {/* Left — cards */}
          <div
            ref={leftRef}
            className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
            style={{ gridAutoRows: '1fr' }}
          >
            {cards.map(({ icon: Icon, color, bg, title, body }) => (
              <motion.div
                key={title}
                whileHover={{ y: -5, boxShadow: 'var(--glass-shadow-hover)' }}
                className="card p-4 sm:p-5 flex flex-col gap-3"
                style={{ height: '100%', transition: 'none' }}
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: bg }}>
                  <Icon size={18} style={{ color }} />
                </div>
                <div className="flex flex-col flex-1">
                  <h3 className="font-semibold text-sm mb-1.5" style={{ color: 'var(--text)' }}>{title}</h3>
                  <div className="text-xs sm:text-sm leading-6" style={{ color: 'var(--text-2)' }}>{body}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right — bio + stats */}
          <div ref={rightRef} className="flex-1 flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <p className="text-sm sm:text-base leading-7" style={{ color: 'var(--text-2)' }}>
                I'm Arpit Patel, a GIS professional with a background in environmental science and a strong interest in spatial analysis and geospatial technologies. I am currently completing my Bachelor of Applied Technology in Geographic Information Systems (BGIS) at the Southern Alberta Institute of Technology (SAIT) in Calgary.
              </p>
              <p className="text-sm sm:text-base leading-7" style={{ color: 'var(--text-2)' }}>
                My work focuses on spatial data analysis, geospatial data management, and GIS application development using tools such as ArcGIS Pro, Python (ArcPy), remote sensing, and web GIS technologies. I enjoy transforming complex geographic data into meaningful insights that support urban planning, environmental management, and emergency response.
              </p>
              <p className="text-sm sm:text-base leading-7" style={{ color: 'var(--text-2)' }}>
                I am particularly interested in Municipal GIS, Environmental GIS, Infrastructure Mapping, and Geospatial Automation. My goal is to apply GIS technology to solve real-world challenges — from wildfire risk assessment and spatial crime analysis to urban infrastructure planning.
              </p>
            </div>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-2 gap-3 sm:gap-4" style={{ gridAutoRows: '1fr' }}>
              {stats.map((s) => (
                <motion.div
                  key={s.label}
                  whileHover={{ y: -4, boxShadow: 'var(--glass-shadow-hover)' }}
                  className="card flex flex-col items-center justify-center text-center"
                  style={{ transition: 'none', minHeight: '90px', padding: '16px 12px' }}
                >
                  <p className="font-serif text-[1.8rem] sm:text-[2.1rem] leading-none text-grad mb-1" style={{ fontStyle: 'italic' }}>{s.value}</p>
                  <p className="text-[10px] sm:text-xs" style={{ color: 'var(--text-3)' }}>{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
