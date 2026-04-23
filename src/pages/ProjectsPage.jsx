import { useState, useRef } from "react";
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

const ProjectCard = ({ project, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [expanded, setExpanded] = useState(false);
  const isEven = index % 2 === 0;
  const { number, title, subtitle, category, color, accent, description, outcome, challenge, impact, tools, Illustration, stats } = project;

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
          <motion.div whileHover={{ scale: 1.015 }} transition={{ duration: 0.3 }}
            className="rounded-2xl overflow-hidden shadow-md border border-white/70"
            style={{ boxShadow: `0 4px 20px ${color}20` }}>
            <Illustration />
          </motion.div>
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
            Five applied GIS projects spanning mobile data collection, land survey systems, geoprocessing automation, environmental impact analysis, and cartographic visualization.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-8">
            {[{ val: "05", label: "Projects" },{ val: "5+", label: "GIS Tools" },{ val: "4+", label: "Regions Mapped" },{ val: "100%", label: "ArcGIS Ecosystem" }].map(({ val, label }) => (
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
