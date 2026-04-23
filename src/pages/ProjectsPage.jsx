import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

// ─── FONT IMPORT ─────────────────────────────────────────────────────────────
const fontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600;1,700&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');
`;

// ─── SVG ILLUSTRATIONS ───────────────────────────────────────────────────────

const FieldMapsIllustration = () => (
  <img 
    src={`${import.meta.env.BASE_URL}assets/image.png`} 
    alt="GIS Field Survey" 
    className="w-full h-full object-cover"
    style={{ aspectRatio: '540/340' }}
  />
);

const ATSIllustration = () => (
  <img
    src={`${import.meta.env.BASE_URL}assets/image copy.png`}
    alt="ATS NTS Reference"
    className="w-full h-full object-cover"
    style={{ aspectRatio: '540/340' }}
  />
);

const ModelBuilderIllustration = () => (
  <img
    src={`${import.meta.env.BASE_URL}assets/image copy 2.png`}
    alt="ModelBuilder Pipeline"
    className="w-full h-full object-cover"
    style={{ aspectRatio: '540/220' }}
  />
);

const LandCoverIllustration = () => (
  <img
    src={`${import.meta.env.BASE_URL}assets/image copy 3.png`}
    alt="Land Cover Map"
    className="w-full h-full object-cover"
    style={{ aspectRatio: '540/340' }}
  />
);

const CaliforniaIllustration = () => (
  <img
    src={`${import.meta.env.BASE_URL}assets/california_hunting_map.png`}
    alt="Rifle Hunting Participation in California"
    className="w-full h-full object-contain"
    style={{ aspectRatio: '540/340' }}
  />
);

const WildfireIllustration = () => (
  <img
    src={`${import.meta.env.BASE_URL}assets/wildfire_risk_poster.jpg`}
    alt="Wildfire Risk Management & Emergency Response"
    className="w-full h-full object-contain"
    style={{ aspectRatio: '540/340' }}
  />
);

// ─── PROJECT DATA ─────────────────────────────────────────────────────────────
const projects = [
  {
    number: "01",
    title: "Field Data Collection & Asset Mapping",
    subtitle: "Mobile GIS · ArcGIS Field Maps",
    category: "Mobile GIS",
    color: "#26a69a",
    accent: "#00897b",
    description: "Designed and executed a mobile GIS data collection workflow using ArcGIS Field Maps to capture environmental and infrastructure features across an urban study area in Calgary. Point, line, and polygon feature classes were configured with custom attribute forms to enforce data quality at the source.",
    outcome: "Synchronized live field data to ArcGIS Online, enabling real-time visualization and stakeholder reporting — demonstrating end-to-end mobile-to-cloud GIS integration.",
    challenge: "Configuring offline map areas and resolving sync conflicts from concurrent field edits.",
    impact: "Reduced data entry errors by 60% through attribute form validation and domain-coded fields.",
    tools: ["ArcGIS Field Maps", "ArcGIS Online", "ArcGIS Pro", "Mobile GIS", "Attribute Domains"],
    Illustration: FieldMapsIllustration,
    stats: [{ val: "3", label: "Feature Types" }, { val: "23+", label: "Features Captured" }, { val: "1:8K", label: "Map Scale" }],
  },
  {
    number: "02",
    title: "ATS & NTS Spatial Referencing",
    subtitle: "Land Survey · Coordinate Systems",
    category: "Spatial Reference",
    color: "#8d6e63",
    accent: "#6d4c41",
    description: "Explored and applied the Alberta Township System (ATS) and National Topographic System (NTS) for land parceling and topographic sheet referencing in Western Canada. ATS legal descriptions were translated into spatial features in ArcGIS Pro.",
    outcome: "Produced a precisely georeferenced map of Township 21, Range 25 West of the 4th Meridian near Carseland, AB, integrating hydrology, road network, pipelines, and contours.",
    challenge: "Converting ATS text-based legal descriptions into accurate geometry without positional drift.",
    impact: "Built a reusable ATS-to-GIS conversion workflow applicable to oil & gas and land management sectors.",
    tools: ["ArcGIS Pro", "ATS Land System", "NTS Grid", "NAD 1983 UTM Z12N", "Spatial Referencing"],
    Illustration: ATSIllustration,
    stats: [{ val: "36", label: "Sections Mapped" }, { val: "5+", label: "Feature Layers" }, { val: "W4M", label: "Meridian" }],
  },
  {
    number: "03",
    title: "GIS Workflow Automation",
    subtitle: "ModelBuilder · Geoprocessing Pipelines",
    category: "Automation",
    color: "#5c6bc0",
    accent: "#3949ab",
    description: "Engineered a multi-stage automated geoprocessing pipeline in ArcGIS ModelBuilder to eliminate repetitive manual tasks in a large-scale spatial analysis project. The model chained data import, projection definition, spatial clipping, merging, and feature export into a single executable workflow.",
    outcome: "Reduced a 45-minute manual processing sequence to a single-click execution, with consistent outputs across hydrology, contour, road, pipeline, and study area datasets.",
    challenge: "Managing coordinate system mismatches across six input datasets from different government sources.",
    impact: "Delivered a reusable, documented geoprocessing model deployable across regional GIS projects.",
    tools: ["ArcGIS Pro", "ModelBuilder", "Define Projection", "Clip", "Merge", "Feature Export"],
    Illustration: ModelBuilderIllustration,
    stats: [{ val: "6", label: "Tool Chains" }, { val: "12+", label: "Automated Steps" }, { val: "1-click", label: "Execution" }],
  },
  {
    number: "04",
    title: "Land Cover Interpretation & EIA",
    subtitle: "Aerial Imagery · Environmental Assessment",
    category: "Remote Sensing",
    color: "#388e3c",
    accent: "#2e7d32",
    description: "Performed manual airphoto interpretation and polygon digitization of Level-1 land cover classes — Developed, Agricultural, and Natural Areas — across a study corridor near Grande Prairie, Alberta.",
    outcome: "Calculated impacted land area per class for a proposed oil and gas development footprint, producing a formal Environmental Impact Assessment report with disturbance threshold analysis.",
    challenge: "Accurately distinguishing early-successional natural areas from agricultural fields under similar spectral response.",
    impact: "Identified that the proposed development exceeded the 4.0 ha natural area disturbance threshold, informing a regulatory review decision.",
    tools: ["ArcGIS Pro", "Airphoto Interpretation", "Manual Digitization", "MMU Standards", "Impact Analysis"],
    Illustration: LandCoverIllustration,
    stats: [{ val: "3", label: "Cover Classes" }, { val: "0.5ha", label: "Min. Map Unit" }, { val: "1:40K", label: "Map Scale" }],
  },
  {
    number: "05",
    title: "Rifle Hunting Participation in California",
    subtitle: "Cartographic Visualization · Spatial Statistics",
    category: "Choropleth Mapping",
    color: "#b5451b",
    accent: "#9e3814",
    description: "Depicted spatial patterns in rifle hunting participation across California counties. Utilized demographic data enriched via ArcGIS Pro from the Esri portal to calculate and map participation rates as a percentage of the total county population.",
    outcome: "Produced a choropleth map using Natural Breaks classification, which was determined to best represent the data distribution with a Goodness of Variance Fit (GVF) of 0.95.",
    challenge: "Evaluating multiple classification methods (Equal Interval, Quantile, Manual, Natural Breaks) to find the most statistically appropriate representation for skewed demographic data.",
    impact: "Clearly visualized spatial patterns showing lower participation in urbanized coastal regions compared to higher rates in rural and mountainous areas.",
    tools: ["ArcGIS Pro", "Cartography", "Esri Portal", "Spatial Statistics", "Choropleth Map"],
    Illustration: CaliforniaIllustration,
    stats: [{ val: "58", label: "Counties Mapped" }, { val: "0.95", label: "GVF Score" }, { val: "5", label: "Data Classes" }],
  },
  {
    number: "06",
    title: "Wildfire Risk Management & Emergency Response",
    subtitle: "Capstone · Multi-Criteria GIS Analysis · WebGIS",
    category: "Capstone Project",
    color: "#e65100",
    accent: "#bf360c",
    description: "Assessed wildfire risk and supported emergency response planning for Frog Lake First Nation, Alberta. Processed PlanetScope 3m multispectral imagery to produce a supervised land cover classification, then applied a weighted overlay across slope, moisture, elevation, and aspect to generate a predictive wildfire risk surface.",
    outcome: "Delivered a full GIS decision-support system: a wildfire risk raster map (82% accuracy), an ArcGIS Network Analysis model for optimal first-responder routing, a Field Maps mobile app for real-time fire sighting collection, and an Experience Builder web application hosted on ESRI — all integrated on a single public-facing platform.",
    challenge: "Integrating five heterogeneous environmental raster layers (land cover, slope, moisture, elevation, aspect) into a single consistent risk surface while managing coordinate system alignment and weighted overlay calibration across datasets from different government sources.",
    impact: "Identified that 37.4% of the study area falls within Risk Level 3 (high risk), with high-risk zones clustered in forested regions. The system enhances situational awareness, improves first-responder routing, and supports safer wildfire response for an Indigenous community with limited emergency resources.",
    tools: ["ArcGIS Pro", "PlanetScope Imagery", "ModelBuilder", "Network Analysis", "ArcGIS Field Maps", "Experience Builder", "Python", "WebGIS"],
    Illustration: WildfireIllustration,
    stats: [{ val: "3m", label: "Image Resolution" }, { val: "82%", label: "Model Accuracy" }, { val: "37.4%", label: "High-Risk Area" }],
  },
];

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────
const TechBadge = ({ label, color }) => (
  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border"
    style={{ fontFamily: "'DM Mono', monospace", color, borderColor: `${color}40`, backgroundColor: `${color}0f` }}>
    {label}
  </span>
);

const StatChip = ({ val, label, color }) => (
  <div className="flex flex-col items-center px-4 py-2 rounded-xl bg-white/60 backdrop-blur-sm border border-white/80">
    <span className="text-xl font-bold" style={{ fontFamily: "'Cormorant Garamond', serif", color }}>{val}</span>
    <span className="text-xs text-slate-500 mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>{label}</span>
  </div>
);

// ─── LIGHTBOX ────────────────────────────────────────────────────────────────
const MIN_ZOOM = 0.5;
const MAX_ZOOM = 5;
const ZOOM_STEP = 0.25;

const Lightbox = ({ src, alt, onClose }) => {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef(null);
  const panAtDrag = useRef({ x: 0, y: 0 });

  // Keyboard shortcuts: Escape, +, -, 0
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === '+' || e.key === '=') setZoom(z => Math.min(MAX_ZOOM, +(z + ZOOM_STEP).toFixed(2)));
      if (e.key === '-') setZoom(z => Math.max(MIN_ZOOM, +(z - ZOOM_STEP).toFixed(2)));
      if (e.key === '0') { setZoom(1); setPan({ x: 0, y: 0 }); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  // Reset pan when zoom returns to 1
  useEffect(() => { if (zoom === 1) setPan({ x: 0, y: 0 }); }, [zoom]);

  // Scroll wheel zoom
  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP;
    setZoom(z => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, +(z + delta).toFixed(2))));
  };

  // Drag-to-pan
  const handleMouseDown = (e) => {
    if (zoom <= 1) return;
    e.preventDefault();
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    panAtDrag.current = pan;
  };
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPan({
      x: panAtDrag.current.x + (e.clientX - dragStart.current.x),
      y: panAtDrag.current.y + (e.clientY - dragStart.current.y),
    });
  };
  const handleMouseUp = () => setIsDragging(false);

  const zoomIn  = () => setZoom(z => Math.min(MAX_ZOOM, +(z + ZOOM_STEP).toFixed(2)));
  const zoomOut = () => setZoom(z => Math.max(MIN_ZOOM, +(z - ZOOM_STEP).toFixed(2)));
  const reset   = () => { setZoom(1); setPan({ x: 0, y: 0 }); };

  return (
    <AnimatePresence>
      <motion.div
        key="lightbox"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="fixed inset-0 z-[9999] flex items-center justify-center"
        style={{ background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(10px)', cursor: isDragging ? 'grabbing' : 'default' }}
      >
        {/* ── Image wrapper — stops clicks from closing ── */}
        <div
          onClick={(e) => e.stopPropagation()}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          style={{
            transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
            transition: isDragging ? 'none' : 'transform 0.2s ease',
            cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
            maxWidth: '90vw',
            maxHeight: '85vh',
            display: 'flex',
          }}
        >
          <img
            src={src}
            alt={alt}
            draggable={false}
            style={{
              maxWidth: '90vw',
              maxHeight: '85vh',
              objectFit: 'contain',
              borderRadius: '16px',
              boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
              border: '1px solid rgba(255,255,255,0.10)',
              userSelect: 'none',
            }}
          />
        </div>

        {/* ── Top-right: Close ── */}
        <button
          onClick={onClose}
          title="Close (Esc)"
          className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center text-white transition-colors hover:bg-white/20"
          style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.22)' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>

        {/* ── Bottom-center: Zoom toolbar ── */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full"
          style={{ background: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.18)', boxShadow: '0 4px 24px rgba(0,0,0,0.4)' }}
        >
          {/* Zoom out */}
          <button
            onClick={zoomOut}
            disabled={zoom <= MIN_ZOOM}
            title="Zoom out (-)"
            className="w-8 h-8 rounded-full flex items-center justify-center text-white transition-all hover:bg-white/20 disabled:opacity-30"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35M8 11h6"/>
            </svg>
          </button>

          {/* Zoom level + reset */}
          <button
            onClick={reset}
            title="Reset zoom (0)"
            className="min-w-[54px] text-center text-xs font-semibold text-white/80 hover:text-white transition-colors px-1"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            {Math.round(zoom * 100)}%
          </button>

          {/* Zoom in */}
          <button
            onClick={zoomIn}
            disabled={zoom >= MAX_ZOOM}
            title="Zoom in (+)"
            className="w-8 h-8 rounded-full flex items-center justify-center text-white transition-all hover:bg-white/20 disabled:opacity-30"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35M11 8v6M8 11h6"/>
            </svg>
          </button>

          {/* Divider */}
          <div className="w-px h-5 bg-white/20 mx-1"/>

          {/* Caption */}
          <span className="text-[10px] text-white/40 tracking-widest uppercase hidden sm:block"
            style={{ fontFamily: "'DM Mono', monospace" }}>
            Scroll · Drag · Esc
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

const ProjectCard = ({ project, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [expanded, setExpanded] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const isEven = index % 2 === 0;
  const { number, title, subtitle, category, color, accent, description, outcome, challenge, impact, tools, Illustration, stats } = project;

  // Grab the image src from the Illustration to pass to the lightbox
  const illustrationRef = useRef(null);
  const openLightbox = () => {
    const img = illustrationRef.current?.querySelector('img');
    if (img) setLightboxSrc({ src: img.src, alt: img.alt });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-3xl overflow-hidden border border-white/60 shadow-lg backdrop-blur-sm"
      style={{
        background: 'rgba(255,255,255,0.52)',
        boxShadow: `0 8px 40px ${color}18, 0 2px 12px rgba(0,0,0,0.06)`,
      }}
    >
      {/* Decorative number */}
      <div className="absolute top-4 right-6 text-8xl font-bold select-none pointer-events-none leading-none"
        style={{ fontFamily: "'Cormorant Garamond', serif", color: `${color}12` }}>
        {number}
      </div>

      <div className={`grid ${isEven ? "md:grid-cols-[1fr_1.1fr]" : "md:grid-cols-[1.1fr_1fr]"}`}>
        {/* Illustration side */}
        <div className={`${isEven ? "order-1" : "order-2 md:order-2"} p-4 md:p-6`}>
          <div className="relative group" ref={illustrationRef}>
            <motion.div whileHover={{ scale: 1.015 }} transition={{ duration: 0.3 }}
              className="rounded-2xl overflow-hidden shadow-md border border-white/70"
              style={{ boxShadow: `0 4px 20px ${color}20` }}>
              <Illustration />
            </motion.div>
            {/* Full-size button */}
            <button
              onClick={openLightbox}
              title="View full size"
              className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ background: `${color}cc`, backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.4)', boxShadow: `0 2px 10px ${color}40` }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
              </svg>
            </button>
          </div>
          <div className="flex gap-2 mt-4 flex-wrap">
            {stats.map(s => <StatChip key={s.label} val={s.val} label={s.label} color={color} />)}
          </div>
        </div>

        {/* Content side */}
        <div className={`${isEven ? "order-2" : "order-1 md:order-1"} p-6 md:p-8 flex flex-col justify-between`}>
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-medium tracking-widest uppercase px-3 py-1 rounded-full"
                style={{ fontFamily: "'DM Mono', monospace", color: accent, backgroundColor: `${color}18` }}>
                {category}
              </span>
              <span className="text-xs text-slate-400" style={{ fontFamily: "'DM Mono', monospace" }}>Project {number}</span>
            </div>

            <h2 className="text-3xl md:text-4xl leading-tight mb-1"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1a2a1a", fontStyle: "italic", fontWeight: 600 }}>
              {title}
            </h2>
            <p className="text-sm mb-5" style={{ fontFamily: "'DM Sans', sans-serif", color }}>{subtitle}</p>
            <div className="w-12 h-0.5 mb-5 rounded-full" style={{ backgroundColor: color }} />

            <p className="text-sm leading-relaxed text-slate-600 mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {description}
            </p>

            <div className="rounded-xl p-4 mb-4 border-l-4 text-sm"
              style={{ borderColor: color, backgroundColor: `${color}0c`, fontFamily: "'DM Sans', sans-serif", color: "#37474f" }}>
              <span className="font-semibold block mb-1" style={{ color: accent }}>→ Outcome</span>
              {outcome}
            </div>

            <AnimatePresence>
              {expanded && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="overflow-hidden">
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="rounded-xl p-3 bg-white/60 border border-white/80">
                      <span className="text-xs font-semibold block mb-1" style={{ color: accent, fontFamily: "'DM Mono', monospace" }}>CHALLENGE</span>
                      <p className="text-xs text-slate-600" style={{ fontFamily: "'DM Sans', sans-serif" }}>{challenge}</p>
                    </div>
                    <div className="rounded-xl p-3 bg-white/60 border border-white/80">
                      <span className="text-xs font-semibold block mb-1" style={{ color: accent, fontFamily: "'DM Mono', monospace" }}>IMPACT</span>
                      <p className="text-xs text-slate-600" style={{ fontFamily: "'DM Sans', sans-serif" }}>{impact}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div>
            <div className="flex flex-wrap gap-2 mb-5">
              {tools.map(t => <TechBadge key={t} label={t} color={color} />)}
            </div>
            <div className="flex items-center gap-3">
              <motion.button onClick={() => setExpanded(!expanded)}
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white"
                style={{ fontFamily: "'DM Sans', sans-serif", backgroundColor: color, boxShadow: `0 4px 16px ${color}40` }}>
                {expanded ? "Show Less" : "View Details"}
                <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.3 }}>↓</motion.span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox portal */}
      {lightboxSrc && (
        <Lightbox src={lightboxSrc.src} alt={lightboxSrc.alt} onClose={() => setLightboxSrc(null)} />
      )}
    </motion.div>
  );
};

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function ProjectsPage({ onBack }) {
  return (
    <>
      <style>{fontStyle}</style>

      {/* Scroll to top on mount */}
      <div
        className="min-h-screen w-full"
        style={{
          background: "linear-gradient(150deg, #eafaf4 0%, #f5faf2 30%, #fffff8 65%, #fefdf0 100%)",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* Background decorations — matching the main site's blobs */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-40"
            style={{ background: "radial-gradient(circle, rgba(134,239,172,0.6) 0%, transparent 70%)", filter: "blur(60px)" }} />
          <div className="absolute top-1/3 -right-24 w-80 h-80 rounded-full opacity-25"
            style={{ background: "radial-gradient(circle, rgba(253,224,71,0.55) 0%, transparent 70%)", filter: "blur(60px)" }} />
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full opacity-25"
            style={{ background: "radial-gradient(circle, rgba(110,231,183,0.5) 0%, transparent 70%)", filter: "blur(60px)" }} />
          {/* Coordinate grid watermark */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.035]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="coordGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#26a69a" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#coordGrid)"/>
          </svg>
        </div>

        {/* ── HEADER ── */}
        <header className="relative z-10 px-5 md:px-10 pt-6 pb-4 flex items-center justify-between"
          style={{ backdropFilter: 'blur(20px)', background: 'rgba(255,255,255,0.22)', borderBottom: '1px solid rgba(255,255,255,0.4)' }}>
          <motion.button onClick={onBack}
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05, x: -3 }} whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border border-white/60 bg-white/50 backdrop-blur-sm text-slate-600 hover:bg-white/80 transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back
          </motion.button>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
            className="text-xs tracking-widest uppercase font-medium" style={{ fontFamily: "'DM Mono', monospace", color: '#0D7A6F' }}>
            Arpit Patel · GIS Portfolio
          </motion.div>
        </header>

        {/* ── HERO ── */}
        <section className="relative z-10 px-5 md:px-10 py-14 md:py-20 text-center">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[10px] tracking-[0.28em] uppercase mb-4 font-medium" style={{ fontFamily: "'DM Mono', monospace", color: '#0D7A6F' }}>
            Class Projects
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="leading-tight mb-5 whitespace-nowrap"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 600, color: "#1A1714", fontSize: 'clamp(2rem, 6vw, 4.5rem)' }}>
            Maps That <span style={{ color: "#0D7A6F" }}>Tell Stories</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
            className="max-w-xl mx-auto text-slate-500 text-base leading-relaxed mb-10" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Six applied GIS projects spanning mobile data collection, land survey systems, geoprocessing automation, environmental impact analysis, cartographic visualization, and wildfire risk management.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-8">
            {[{ val: "06", label: "Projects" },{ val: "8+", label: "GIS Tools" },{ val: "4+", label: "Regions Mapped" },{ val: "100%", label: "ArcGIS Ecosystem" }].map(({ val, label }) => (
              <div key={label} className="text-center">
                <div className="text-3xl md:text-4xl leading-none" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, color: "#0D7A6F" }}>{val}</div>
                <div className="text-xs text-slate-400 mt-1" style={{ fontFamily: "'DM Mono', monospace" }}>{label}</div>
              </div>
            ))}
          </motion.div>
        </section>

        {/* Divider */}
        <div className="relative z-10 flex items-center justify-center px-10 mb-10">
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(13,122,111,0.3))' }}/>
          <div className="mx-4 flex gap-1.5">
            {[0,1,2].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#0D7A6F", opacity: 0.35 + i * 0.2 }}/>)}
          </div>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(13,122,111,0.3))' }}/>
        </div>

        {/* ── PROJECTS ── */}
        <section className="relative z-10 px-4 md:px-8 lg:px-10 pb-24 space-y-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.number} project={project} index={index} />
          ))}
        </section>

        {/* ── FOOTER CTA ── */}
        <motion.footer initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-6 py-14" style={{ borderTop: '1px solid rgba(255,255,255,0.4)' }}>
          <p className="text-[10px] tracking-widest uppercase mb-3 font-medium" style={{ fontFamily: "'DM Mono', monospace", color: '#0D7A6F' }}>Let's Connect</p>
          <h3 className="text-4xl md:text-5xl mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: "#1A1714" }}>
            Interested in collaborating?
          </h3>
          <motion.button onClick={onBack} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
            className="px-8 py-3.5 rounded-full text-white text-sm font-medium"
            style={{ fontFamily: "'DM Sans', sans-serif", backgroundColor: "#0D7A6F", boxShadow: "0 6px 24px rgba(13,122,111,0.35)" }}>
            Get in Touch →
          </motion.button>
        </motion.footer>
      </div>
    </>
  );
}
