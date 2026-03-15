import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, Maximize2, Minimize2 } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── Esri-inspired design tokens ─────────────────────────────────────────────
const ESRI_BLUE   = '#0079C1';
const ESRI_BLUE2  = '#00A9E0';
const SECTION_BG  = '#07111f';   // near-black navy (matches Esri dark hero)
const CARD_BG     = 'rgba(255,255,255,0.04)';
const CARD_BORDER = 'rgba(0,121,193,0.22)';
const FONT        = "'Avenir Next', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif";

// ── StoryMap data ─────────────────────────────────────────────────────────────
const STORYMAPS = [
  {
    id: '01',
    title: 'Spatial Analysis of Arson Incidents in Chicago (2020)',
    subtitle: 'ArcGIS StoryMaps · Crime Analysis',
    description:
      'A spatial statistical analysis of arson incident patterns across Chicago neighbourhoods in 2020. Using hotspot analysis and crime mapping techniques to identify high-risk spatial clusters and temporal trends.',
    tags: ['Crime Analysis', 'Hotspot Analysis', 'Spatial Statistics', 'Chicago GIS'],
    embedUrl: 'https://arcg.is/1buzDn',
    link: 'https://arcg.is/1buzDn',
  },
];

// ── Embedded StoryMap card ────────────────────────────────────────────────────
function StoryCard({ story, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-xl overflow-hidden"
      style={{
        background: CARD_BG,
        border: `1px solid ${CARD_BORDER}`,
        boxShadow: `0 0 40px rgba(0,121,193,0.08), 0 4px 24px rgba(0,0,0,0.4)`,
      }}
    >
      {/* Top blue accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: `linear-gradient(90deg, transparent, ${ESRI_BLUE}, ${ESRI_BLUE2}, transparent)` }}
      />

      {/* Content + iframe layout */}
      <div className="flex flex-col lg:flex-row">

        {/* ── iframe side ── */}
        <div
          className="relative shrink-0 w-full lg:w-[55%] overflow-hidden"
          style={{
            minHeight: expanded ? '560px' : '320px',
            borderRight: `1px solid ${CARD_BORDER}`,
            transition: 'min-height 0.4s ease',
            background: '#050e1a',
          }}
        >
          {/* expand toggle */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-2.5 py-1.5 rounded text-[10px] font-semibold"
            style={{
              background: 'rgba(0,121,193,0.18)',
              color: ESRI_BLUE2,
              border: `1px solid rgba(0,121,193,0.35)`,
              fontFamily: FONT,
              backdropFilter: 'blur(8px)',
            }}
          >
            {expanded ? <Minimize2 size={10} /> : <Maximize2 size={10} />}
            {expanded ? 'Collapse' : 'Expand'}
          </button>

          <iframe
            src={story.embedUrl}
            title={story.title}
            allowFullScreen
            loading="lazy"
            className="w-full h-full"
            style={{
              border: 'none',
              minHeight: expanded ? '560px' : '320px',
              transition: 'min-height 0.4s ease',
            }}
          />
        </div>

        {/* ── Info side ── */}
        <div className="flex-1 p-7 md:p-10 flex flex-col justify-between" style={{ fontFamily: FONT }}>
          <div>
            {/* Badge */}
            <div className="flex items-center gap-3 mb-5">
              <span
                className="text-[10px] font-semibold tracking-[0.2em] uppercase px-3 py-1 rounded"
                style={{ color: ESRI_BLUE2, background: 'rgba(0,121,193,0.12)', border: `1px solid rgba(0,121,193,0.25)` }}
              >
                ArcGIS StoryMap
              </span>
              <span className="text-xs font-medium tracking-widest" style={{ color: 'rgba(255,255,255,0.25)' }}>
                {story.id}
              </span>
            </div>

            <h3
              className="text-xl md:text-2xl lg:text-3xl font-bold leading-snug mb-3"
              style={{ color: '#ffffff', letterSpacing: '-0.01em' }}
            >
              {story.title}
            </h3>

            <p
              className="text-xs mb-6 font-medium tracking-wide"
              style={{ color: ESRI_BLUE }}
            >
              {story.subtitle}
            </p>

            <div
              className="w-10 h-[2px] mb-6 rounded-full"
              style={{ background: `linear-gradient(90deg, ${ESRI_BLUE}, ${ESRI_BLUE2})` }}
            />

            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.60)' }}>
              {story.description}
            </p>
          </div>

          {/* Tags + CTA */}
          <div className="mt-8">
            <div className="flex flex-wrap gap-2 mb-6">
              {story.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] px-3 py-1 rounded font-medium"
                  style={{
                    color: 'rgba(255,255,255,0.55)',
                    border: '1px solid rgba(255,255,255,0.10)',
                    background: 'rgba(255,255,255,0.04)',
                    fontFamily: FONT,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <motion.a
              href={story.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded text-sm font-semibold text-white"
              style={{
                background: ESRI_BLUE,
                boxShadow: `0 4px 20px rgba(0,121,193,0.40)`,
                fontFamily: FONT,
                letterSpacing: '0.01em',
              }}
            >
              Open StoryMap
              <ExternalLink size={14} />
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────
export default function StoryMaps() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, scrollTrigger: { trigger: sectionRef.current, start: 'top 88%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="storymaps"
      ref={sectionRef}
      style={{
        paddingBlock: '80px',
        background: SECTION_BG,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Esri-style blue cosmic glow blob */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '-20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '800px',
          height: '400px',
          borderRadius: '50%',
          background: `radial-gradient(ellipse, rgba(0,121,193,0.18) 0%, transparent 70%)`,
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />
      {/* Bottom glow */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: '-10%',
          right: '10%',
          width: '500px',
          height: '300px',
          borderRadius: '50%',
          background: `radial-gradient(ellipse, rgba(0,169,224,0.10) 0%, transparent 70%)`,
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      <div className="container-tight relative z-10" style={{ maxWidth: '1000px', fontFamily: FONT }}>
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <span
            className="inline-block text-[10px] font-semibold tracking-[0.22em] uppercase px-3 py-1.5 rounded mb-5"
            style={{
              color: ESRI_BLUE2,
              background: 'rgba(0,121,193,0.12)',
              border: `1px solid rgba(0,121,193,0.25)`,
              fontFamily: FONT,
            }}
          >
            Interactive Narratives
          </span>

          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
            style={{ color: '#ffffff', letterSpacing: '-0.02em', lineHeight: 1.15 }}
          >
            Story<span style={{ color: ESRI_BLUE }}>Maps</span>
          </h2>

          <p
            className="text-sm sm:text-base max-w-xl mx-auto"
            style={{ color: 'rgba(255,255,255,0.50)', lineHeight: 1.75 }}
          >
            Scroll-driven geospatial stories blending maps, data, and narrative to communicate spatial insights — built with ArcGIS StoryMaps.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {STORYMAPS.map((story, i) => (
            <StoryCard key={story.id} story={story} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
