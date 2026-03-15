import React, { useEffect, useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ── Mini SVG map thumbnails (one per project) ──────────────────────────────

const ThumbFieldMaps = () => (
  <svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <linearGradient id="fm-bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1c2b1c"/><stop offset="100%" stopColor="#243324"/>
      </linearGradient>
    </defs>
    <rect width="200" height="130" fill="url(#fm-bg)" rx="6"/>
    {[0,1,2,3].map(c => [0,1,2].map(r => (
      <rect key={`${c}${r}`} x={8+c*46} y={8+r*36} width="44" height="34"
        fill={c%2===r%2?"#2a3d2a":"#1e2e1e"} rx="2"/>
    )))}
    <rect x="0" y="44" width="200" height="3" fill="#3d5a3d" opacity="0.9"/>
    <rect x="0" y="80" width="200" height="3" fill="#3d5a3d" opacity="0.9"/>
    <rect x="56" y="0" width="3" height="130" fill="#3d5a3d" opacity="0.9"/>
    <rect x="102" y="0" width="3" height="130" fill="#3d5a3d" opacity="0.9"/>
    <rect x="148" y="0" width="3" height="130" fill="#3d5a3d" opacity="0.9"/>
    <path d="M 10 110 Q 50 95 90 80 Q 130 62 170 72" fill="none" stroke="#ff6b35" strokeWidth="1.8" strokeDasharray="5,3" opacity="0.9"/>
    {[[30,90],[80,90],[130,90],[170,90]].map(([x,y],i) => (
      <g key={i}><circle cx={x} cy={y} r="5" fill="#26a69a"/><text x={x} y={y+3} textAnchor="middle" fontSize="5" fill="white" fontWeight="bold">B</text></g>
    ))}
    {[[25,25],[72,20],[118,28],[165,22]].map(([x,y],i) => (
      <g key={i}><circle cx={x} cy={y} r="6" fill="#1b5e20" opacity="0.8"/><circle cx={x} cy={y} r="3.5" fill="#43a047"/></g>
    ))}
    <path d="M 0 80 L 200 80" stroke="#4fc3f7" strokeWidth="1" strokeDasharray="8,4" opacity="0.6"/>
    <rect x="4" y="112" width="85" height="14" rx="3" fill="rgba(0,0,0,0.55)"/>
    <text x="9" y="122" fontSize="7.5" fill="#b2dfdb" fontFamily="monospace">17 Ave SW · Calgary</text>
  </svg>
);

const ThumbATS = () => (
  <svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <linearGradient id="ats-bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fdf8f0"/><stop offset="100%" stopColor="#f5ede0"/>
      </linearGradient>
      <pattern id="ats-g" x="0" y="0" width="32" height="26" patternUnits="userSpaceOnUse">
        <path d="M 32 0 L 0 0 0 26" fill="none" stroke="#c4a882" strokeWidth="0.5"/>
      </pattern>
    </defs>
    <rect width="200" height="130" fill="url(#ats-bg)" rx="6"/>
    <rect width="200" height="130" fill="url(#ats-g)" opacity="0.6"/>
    {[0,1,2,3,4,5].map(c => [0,1,2,3].map(r => (
      <rect key={`${c}${r}`} x={6+c*31} y={6+r*26} width="30" height="24" fill="none" stroke="#8d6e63" strokeWidth="1.2" strokeDasharray="3,2"/>
    )))}
    {[36,35,34,33,32,31,25,26,27,28,29,30].map((n,i) => (
      <text key={n} x={21+(i%6)*31} y={21+Math.floor(i/6)*26} textAnchor="middle" fontSize="8" fill="#5d4037" fontWeight="500" fontFamily="monospace">{n}</text>
    ))}
    <path d="M 36 6 Q 42 20 38 40 Q 34 60 36 78 Q 38 96 32 120" fill="none" stroke="#5c9bd1" strokeWidth="3.5" opacity="0.65"/>
    <line x1="6" y1="32" x2="194" y2="32" stroke="#795548" strokeWidth="1.5"/>
    <line x1="6" y1="84" x2="194" y2="84" stroke="#795548" strokeWidth="1.5"/>
    <line x1="68" y1="6" x2="68" y2="124" stroke="#795548" strokeWidth="1.5"/>
    <rect x="6" y="6" width="60" height="50" fill="none" stroke="#e53935" strokeWidth="1.5" strokeDasharray="5,3" opacity="0.8"/>
    <polygon points="21,14 23,19 28,19 24,22 26,27 21,24 16,27 18,22 14,19 19,19" fill="#e53935" opacity="0.9"/>
    <rect x="4" y="113" width="102" height="13" rx="3" fill="rgba(255,248,230,0.9)" stroke="#8d6e63" strokeWidth="0.5"/>
    <text x="9" y="122" fontSize="7.5" fill="#4e342e" fontFamily="monospace">Twp 21 · Rge 25 · W4M</text>
  </svg>
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
  <svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <linearGradient id="lc-bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f1f8e9"/><stop offset="100%" stopColor="#e8f5e9"/>
      </linearGradient>
    </defs>
    <rect width="200" height="130" fill="url(#lc-bg)" rx="6"/>
    <polygon points="8,8 90,10 86,55 70,75 50,80 20,70 8,50" fill="#a5d6a7" stroke="#66bb6a" strokeWidth="0.8"/>
    <polygon points="95,10 175,8 185,40 180,75 155,80 120,75 105,55 108,28" fill="#c8e6c9" stroke="#81c784" strokeWidth="0.8"/>
    <polygon points="8,55 45,80 55,110 35,125 8,124" fill="#dcedc8" stroke="#aed581" strokeWidth="0.8"/>
    <polygon points="50,80 90,74 100,95 90,125 55,126 42,112" fill="#b9f6ca" stroke="#69f0ae" strokeWidth="0.6"/>
    <polygon points="105,75 160,85 175,110 155,125 115,128 100,110" fill="#a5d6a7" stroke="#66bb6a" strokeWidth="0.8"/>
    <polygon points="14,60 32,68 28,95 10,88" fill="#2e7d32" stroke="#1b5e20" strokeWidth="0.8" opacity="0.75"/>
    <polygon points="72,36 94,34 100,52 80,56 66,46" fill="#388e3c" stroke="#2e7d32" strokeWidth="0.8" opacity="0.75"/>
    <polygon points="42,22 66,18 70,42 50,46 36,36" fill="#cfd8dc" stroke="#b0bec5" strokeWidth="0.8" opacity="0.8"/>
    <polygon points="118,24 148,22 152,46 126,50 112,38" fill="#b0bec5" stroke="#90a4ae" strokeWidth="0.8" opacity="0.8"/>
    <path d="M 8 40 Q 50 44 90 38 Q 130 32 170 40" fill="none" stroke="#42a5f5" strokeWidth="2" opacity="0.7"/>
    {[[48,32],[95,82],[138,32]].map(([x,y],i) => (
      <g key={i}>
        <rect x={x-9} y={y-7} width="18" height="14" rx="2" fill="#e53935" opacity="0.85" stroke="#b71c1c" strokeWidth="0.8"/>
        <text x={x} y={y+3} textAnchor="middle" fontSize="7" fill="white" fontWeight="bold">D</text>
      </g>
    ))}
    <rect x="0" y="116" width="200" height="14" fill="rgba(249,251,231,0.95)"/>
    {[["#a5d6a7","Agri"],["#2e7d32","Natural"],["#cfd8dc","Dev"],["#e53935","Proposed"]].map(([c,l],i)=>(
      <g key={l}>
        <rect x={6+i*48} y={119} width="10" height="8" rx="1.5" fill={c}/>
        <text x={19+i*48} y={126} fontSize="6.5" fill="#455a64" fontFamily="sans-serif">{l}</text>
      </g>
    ))}
  </svg>
);

const PROJECTS = [
  { number: '01', title: 'Field Data Collection & Asset Mapping', category: 'Mobile GIS', desc: 'Calgary · ArcGIS Field Maps · 23+ features captured', color: '#26a69a', Thumb: ThumbFieldMaps },
  { number: '02', title: 'ATS & NTS Spatial Referencing',        category: 'Spatial Reference', desc: 'Carseland, AB · Township 21 · 36 sections mapped', color: '#8d6e63', Thumb: ThumbATS },
  { number: '03', title: 'GIS Workflow Automation',               category: 'Automation',       desc: '12-step pipeline · 1-click execution · ArcGIS Pro', color: '#5c6bc0', Thumb: ThumbModelBuilder },
  { number: '04', title: 'Land Cover Interpretation & EIA',       category: 'Remote Sensing',   desc: 'Grande Prairie, AB · 3 cover classes · 0.5ha MMU', color: '#388e3c', Thumb: ThumbLandCover },
];

// ── Animated border keyframes via CSS injection ──
const borderCSS = `
@keyframes border-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;

function ProjectCard({ p, index, onNavigate, cardRef }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const isEven = index % 2 === 0;

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left); mouseY.set(clientY - top);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onClick={() => onNavigate?.('projects')}
      whileHover={{ y: -6, scale: 1.005 }}
      whileTap={{ scale: 0.985 }}
      className="group relative rounded-[28px] w-full"
      style={{ cursor: 'pointer', padding: '2px' }}
    >
      {/* ── Rotating conic-gradient border (metallic glow) ── */}
      <div className="absolute inset-0 rounded-[28px] overflow-hidden z-0">
        <div
          className="absolute opacity-30 group-hover:opacity-100"
          style={{
            inset: '-60%',
            width: '220%',
            height: '220%',
            background: `conic-gradient(from 0deg, transparent 0%, transparent 50%, ${p.color}cc 65%, #fff 72%, ${p.color}cc 79%, transparent 90%, transparent 100%)`,
            animation: 'border-spin 6s linear infinite',
            transition: 'opacity 0.5s ease',
          }}
        />
      </div>

      {/* ── Inner card surface ── */}
      <div
        className="relative z-10 w-full rounded-[26px] overflow-hidden flex flex-col md:flex-row"
        style={{
          background: 'rgba(255,255,255,0.20)',
          WebkitBackdropFilter: 'blur(40px) saturate(220%) brightness(108%)',
          backdropFilter: 'blur(40px) saturate(220%) brightness(108%)',
          boxShadow: `inset 0 1px 0 rgba(255,255,255,0.50), 0 4px 24px ${p.color}08`,
          border: '1px solid rgba(255,255,255,0.40)',
        }}
      >
        {/* Hover spotlight */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: useMotionTemplate`radial-gradient(500px circle at ${mouseX}px ${mouseY}px, ${p.color}12, transparent 70%)` }}
        />

        {/* ── Content side ── */}
        <div className={`relative z-10 flex-1 p-5 sm:p-6 md:p-7 flex flex-col justify-center ${isEven ? 'md:order-1' : 'md:order-2'}`}>
          <div>
            <div className="flex items-center justify-between mb-4 sm:mb-5">
              <span
                className="text-[9px] sm:text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase px-2.5 sm:px-3 py-1 rounded-full"
                style={{ color: p.color, background: `${p.color}14`, fontFamily: 'monospace' }}
              >
                {p.category}
              </span>
              <span className="text-xs sm:text-sm font-medium tracking-widest opacity-35" style={{ fontFamily: 'monospace' }}>
                {p.number}
              </span>
            </div>

            <h3
              className="text-lg sm:text-xl md:text-2xl font-semibold leading-tight mb-2"
              style={{ color: 'var(--text)', fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}
            >
              {p.title}
            </h3>

            <p className="text-xs sm:text-sm md:text-base leading-relaxed opacity-75 max-w-md" style={{ color: 'var(--text-2)' }}>
              {p.desc}
            </p>
          </div>

          <div className="mt-6 sm:mt-8 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold" style={{ color: p.color }}>
              <span className="relative overflow-hidden">
                Explore Case Study
                <div
                  className="absolute bottom-0 left-0 w-full h-[1.5px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                  style={{ backgroundColor: p.color }}
                />
              </span>
            </div>
            <motion.div
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border border-white/60 group-hover:bg-white transition-colors"
              style={{ color: p.color, background: 'rgba(255,255,255,0.5)' }}
            >
              <motion.span
                animate={{ x: [0, 3, 0], y: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              >
                <ArrowUpRight size={16} />
              </motion.span>
            </motion.div>
          </div>
        </div>

        {/* ── Thumbnail side ── */}
        <div
          className={`relative shrink-0 w-full md:w-[42%] lg:w-[44%] overflow-hidden ${isEven ? 'md:order-2' : 'md:order-1'}`}
          style={{
            minHeight: '180px',
            background: `linear-gradient(135deg, ${p.color}08, ${p.color}04)`,
            borderLeft: isEven ? `1px solid ${p.color}12` : 'none',
            borderRight: !isEven ? `1px solid ${p.color}12` : 'none',
          }}
        >
          <motion.div className="w-full h-full transition-transform duration-700 group-hover:scale-105 origin-center p-4 sm:p-5 md:p-6 flex items-center justify-center">
            <div
              className="w-full h-full rounded-xl overflow-hidden"
              style={{ boxShadow: `0 12px 32px ${p.color}20, 0 4px 12px rgba(0,0,0,0.06)` }}
            >
              <p.Thumb />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects({ onNavigate }) {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    // Inject border animation CSS
    if (!document.getElementById('border-spin-css')) {
      const style = document.createElement('style');
      style.id = 'border-spin-css';
      style.textContent = borderCSS;
      document.head.appendChild(style);
    }

    const ctx = gsap.context(() => {
      cardRefs.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(el,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%' } }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="section" style={{ paddingBottom: '72px' }}>
      <div className="container-tight" style={{ maxWidth: '1000px' }}>
        <div className="text-center mb-12 md:mb-20 px-2">
          <span className="eyebrow">Portfolio</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-4 mb-3 leading-tight" style={{ fontStyle: 'italic' }}>
            Featured Work
          </h2>
          <p className="mt-3 text-sm sm:text-base md:text-lg max-w-xl mx-auto" style={{ color: 'var(--text-3)' }}>
            Dive into full case studies — maps, methodology, automation, and cartographic analysis.
          </p>
        </div>

        <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 mb-10 md:mb-14">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.number} p={p} index={i} onNavigate={onNavigate} cardRef={el => (cardRefs.current[i] = el)} />
          ))}
        </div>

        <div className="text-center">
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
