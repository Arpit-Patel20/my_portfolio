import React, { useEffect, useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useAnimationFrame } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ── Mini SVG map thumbnails (one per project) ──────────────────────────────

const ThumbFieldMaps = () => (
  <img
    src={`${import.meta.env.BASE_URL}assets/image.png`}
    alt="GIS Field Survey"
    className="w-full h-full object-cover"
    style={{ aspectRatio: '200/130' }}
  />
);

const ThumbATS = () => (
  <img
    src={`${import.meta.env.BASE_URL}assets/image copy.png`}
    alt="ATS NTS Spatial Referencing"
    className="w-full h-full object-cover"
    style={{ aspectRatio: '200/130' }}
  />
);

const ThumbModelBuilder = () => (
  <svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <linearGradient id="mb-bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fafbff"/><stop offset="100%" stopColor="#eef2ff"/>
      </linearGradient>
      <marker id="mb-arrow" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
        <path d="M 0 0 L 5 2.5 L 0 5 Z" fill="#90a4ae"/>
      </marker>
    </defs>
    <rect width="200" height="130" fill="url(#mb-bg)" rx="6"/>
    {[0,30,60,90,120].map(y=><line key={y} x1="0" y1={y} x2="200" y2={y} stroke="#e8eaf6" strokeWidth="0.5"/>)}
    <text x="6" y="12" fontSize="6" fill="#3949ab" fontWeight="bold" fontFamily="monospace">ModelBuilder Pipeline</text>
    {[[8,28],[8,52],[8,76]].map(([x,y],i)=>(
      <g key={i}><rect x={x} y={y} width="38" height="16" rx="2" fill="#e3f2fd" stroke="#42a5f5" strokeWidth="1"/>
      <text x={x+19} y={y+10} textAnchor="middle" fontSize="5.5" fill="#37474f" fontFamily="sans-serif">Input {i+1}</text></g>
    ))}
    <rect x="60" y="44" width="38" height="16" rx="2" fill="#fff3e0" stroke="#ffa726" strokeWidth="1"/>
    <text x="79" y="54" textAnchor="middle" fontSize="5.5" fill="#37474f" fontFamily="sans-serif">XY → Point</text>
    {[[112,24],[112,44],[112,64],[112,84]].map(([x,y],i)=>(
      <g key={i}><rect x={x} y={y} width="38" height="14" rx="2" fill="#e8f5e9" stroke="#66bb6a" strokeWidth="1"/>
      <text x={x+19} y={y+9} textAnchor="middle" fontSize="5" fill="#37474f" fontFamily="sans-serif">Define Proj</text></g>
    ))}
    {[[160,24],[160,44],[160,64],[160,84]].map(([x,y],i)=>(
      <g key={i}><rect x={x} y={y} width="32" height="14" rx="2" fill="#e0f7fa" stroke="#26c6da" strokeWidth="1"/>
      <text x={x+16} y={y+9} textAnchor="middle" fontSize="5" fill="#37474f" fontFamily="sans-serif">Output</text></g>
    ))}
    {[[46,36,60,52],[46,60,60,52],[46,84,60,52],[98,52,112,31],[98,52,112,51],[98,52,112,71],[98,52,112,91]].map(([x1,y1,x2,y2],i)=>(
      <path key={i} d={`M ${x1} ${y1} C ${(x1+x2)/2} ${y1} ${(x1+x2)/2} ${y2} ${x2} ${y2}`}
        fill="none" stroke="#90a4ae" strokeWidth="0.8" markerEnd="url(#mb-arrow)" opacity="0.7"/>
    ))}
    {[[150,31,160,31],[150,51,160,51],[150,71,160,71],[150,91,160,91]].map(([x1,y1,x2,y2],i)=>(
      <line key={`o${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#90a4ae" strokeWidth="0.8" markerEnd="url(#mb-arrow)" opacity="0.7"/>
    ))}
    <rect x="4" y="113" width="90" height="13" rx="3" fill="rgba(233,236,255,0.9)" stroke="#5c6bc0" strokeWidth="0.5"/>
    <text x="9" y="122" fontSize="7.5" fill="#3949ab" fontFamily="monospace">1-click · 12 tool chain</text>
  </svg>
);

const ThumbLandCover = () => (
  <img
    src={`${import.meta.env.BASE_URL}assets/image copy 3.png`}
    alt="Land Cover Map"
    className="w-full h-full object-cover"
    style={{ aspectRatio: '200/130' }}
  />
);

const ThumbCalifornia = () => (
  <img
    src={`${import.meta.env.BASE_URL}assets/california_hunting_map.png`}
    alt="Rifle Hunting Participation in California"
    className="w-full h-full object-contain"
    style={{ aspectRatio: '200/130' }}
  />
);

const PROJECTS = [
  { number: '01', title: 'Field Data Collection & Asset Mapping', category: 'Mobile GIS', desc: 'Calgary · ArcGIS Field Maps · 23+ features captured', color: '#26a69a', Thumb: ThumbFieldMaps },
  { number: '02', title: 'ATS & NTS Spatial Referencing',        category: 'Spatial Reference', desc: 'Carseland, AB · Township 21 · 36 sections mapped', color: '#8d6e63', Thumb: ThumbATS },
  { number: '03', title: 'GIS Workflow Automation',               category: 'Automation',       desc: '12-step pipeline · 1-click execution · ArcGIS Pro', color: '#5c6bc0', Thumb: ThumbModelBuilder },
  { number: '04', title: 'Land Cover Interpretation & EIA',       category: 'Remote Sensing',   desc: 'Grande Prairie, AB · 3 cover classes · 0.5ha MMU', color: '#388e3c', Thumb: ThumbLandCover },
  { number: '05', title: 'Rifle Hunting Participation in California', category: 'Choropleth Mapping', desc: 'California Counties · % of Population · Natural Breaks (Jenks) · ArcGIS Pro · 2025', color: '#b5451b', Thumb: ThumbCalifornia },
];

// ── Animated border keyframes and carousel responsive CSS via injection ──
const borderCSS = `
@keyframes border-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.carousel-container {
  --tz: 250px;
  --card-w: 260px;
  --card-ml: -130px;
  --card-h: 380px;
}
@media (min-width: 640px) {
  .carousel-container {
    --tz: 320px;
    --card-w: 300px;
    --card-ml: -150px;
    --card-h: 400px;
  }
}
@media (min-width: 1024px) {
  .carousel-container {
    --tz: 400px;
    --card-w: 340px;
    --card-ml: -170px;
    --card-h: 420px;
  }
}
`;

import { useTransform } from 'framer-motion';

function ProjectCarouselCard({ p, index, onNavigate, hoverRef, rotationY }) {
  const angle = index * 72;
  const counterRotation = useTransform(rotationY, (r) => -(r + angle));

  return (
    <div
      className="absolute top-0 left-1/2"
      style={{
        transform: `rotateY(${angle}deg) translateZ(var(--tz))`,
        transformStyle: 'preserve-3d',
      }}
    >
      <motion.div
        onMouseEnter={() => (hoverRef.current = true)}
        onMouseLeave={() => (hoverRef.current = false)}
        onClick={() => onNavigate?.('projects')}
        whileHover={{ y: -10, scale: 1.04 }}
        className="group relative cursor-pointer"
        style={{
          width: 'var(--card-w)',
          marginLeft: 'var(--card-ml)',
          height: 'var(--card-h)',
          rotateY: counterRotation,
          transformStyle: 'preserve-3d',
          padding: '2px',
        }}
      >
        {/* ── Rotating metallic glow border ── */}
      <div className="absolute inset-0 rounded-[28px] overflow-hidden z-0">
        <div
          className="absolute opacity-30 group-hover:opacity-100"
          style={{
            inset: '-60%', width: '220%', height: '220%',
            background: `conic-gradient(from 0deg, transparent 0%, transparent 50%, ${p.color}cc 65%, #fff 72%, ${p.color}cc 79%, transparent 90%, transparent 100%)`,
            animation: 'border-spin 6s linear infinite', transition: 'opacity 0.5s ease',
          }}
        />
      </div>

      {/* ── Inner card surface ── */}
      <div className="relative z-10 w-full h-full rounded-[26px] overflow-hidden flex flex-col"
        style={{
          background: 'rgba(255,255,255,0.04)',
          WebkitBackdropFilter: 'blur(24px) saturate(160%)',
          backdropFilter: 'blur(24px) saturate(160%)',
          boxShadow: `inset 0 1px 0 rgba(255,255,255,0.06), 0 4px 24px rgba(0,0,0,0.30)`,
          border: '1px solid rgba(0,121,193,0.18)',
        }}
      >
        {/* Thumbnail side (Top) */}
        <div className="relative shrink-0 w-full h-[45%] overflow-hidden p-3 sm:p-4" style={{ background: `linear-gradient(135deg, ${p.color}08, ${p.color}04)` }}>
          <div className="w-full h-full rounded-xl overflow-hidden shadow-lg transition-transform duration-700 group-hover:scale-105">
             <p.Thumb />
          </div>
        </div>

        {/* Content side (Bottom) */}
        <div className="p-4 sm:p-5 flex flex-col flex-1">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
             <span className="text-[9px] sm:text-[10px] font-semibold tracking-[0.2em] uppercase px-2 py-1 rounded-full whitespace-nowrap" style={{ color: p.color, background: `${p.color}14`, fontFamily: 'monospace' }}>
               {p.category}
             </span>
             <span className="text-xs font-medium tracking-widest opacity-35" style={{ fontFamily: 'monospace' }}>
               {p.number}
             </span>
          </div>
          <h3 className="text-base sm:text-lg lg:text-xl font-semibold leading-tight mb-2 line-clamp-2" style={{ color: 'var(--text)', fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>
            {p.title}
          </h3>
          <p className="text-xs sm:text-sm leading-relaxed opacity-75 line-clamp-3" style={{ color: 'var(--text-2)' }}>
            {p.desc}
          </p>
          
          <div className="mt-auto flex items-center gap-2 pt-3 opacity-80 group-hover:opacity-100 transition-opacity">
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: p.color }}>Explore</span>
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border border-white/60 group-hover:bg-white transition-colors" style={{ color: p.color, background: 'rgba(255,255,255,0.5)' }}>
               <ArrowUpRight size={14} />
            </div>
          </div>
        </div>
      </div>
      </motion.div>
    </div>
  );
}

export default function Projects({ onNavigate }) {
  const sectionRef = useRef(null);
  const hoverRef = useRef(false);
  const rotationY = useMotionValue(0);

  useEffect(() => {
    // Inject custom CSS
    if (!document.getElementById('border-spin-css')) {
      const style = document.createElement('style');
      style.id = 'border-spin-css';
      style.textContent = borderCSS;
      document.head.appendChild(style);
    }
    
    // Animate overall section fading in
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useAnimationFrame((t, delta) => {
    if (!hoverRef.current) {
      // Rotate ~15 degrees per second (0.015 * delta)
      rotationY.set(rotationY.get() - (delta * 0.012));
    }
  });

  return (
    <section id="projects" ref={sectionRef} className="section carousel-container" style={{ paddingBottom: '96px', overflow: 'hidden' }}>
      <div className="container-tight" style={{ maxWidth: '1200px' }}>
        <div className="text-center mb-16 md:mb-24 px-2 relative z-10">
          <span className="eyebrow">Portfolio</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-4 mb-3 leading-tight" style={{ fontStyle: 'italic' }}>
            Featured Work
          </h2>
          <p className="mt-3 text-sm sm:text-base md:text-lg max-w-xl mx-auto" style={{ color: 'var(--text-3)' }}>
            Dive into full case studies — maps, methodology, automation, and cartographic analysis.
          </p>
        </div>

        {/* ── 3D Carousel Stage ── */}
        <div className="relative w-full mx-auto" style={{ perspective: '1200px', height: 'var(--card-h)', marginBottom: '80px' }}>
          <motion.div
            className="w-full h-full relative"
            style={{ rotateY: rotationY, transformStyle: 'preserve-3d' }}
          >
            {PROJECTS.map((p, i) => (
              <ProjectCarouselCard key={p.number} p={p} index={i} onNavigate={onNavigate} hoverRef={hoverRef} rotationY={rotationY} />
            ))}
          </motion.div>
        </div>

        <div className="text-center relative z-10">
          <motion.button onClick={() => onNavigate?.('projects')}
            whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
            className="btn-primary gap-2 mx-auto">
            View Full Project Gallery <ArrowUpRight size={15} />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
