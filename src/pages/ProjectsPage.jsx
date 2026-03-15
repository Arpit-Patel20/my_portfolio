import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

// ─── FONT IMPORT ─────────────────────────────────────────────────────────────
const fontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600;1,700&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');
`;

// ─── SVG ILLUSTRATIONS ───────────────────────────────────────────────────────

const FieldMapsIllustration = () => (
  <svg viewBox="0 0 540 340" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <linearGradient id="satBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1c2b1c" />
        <stop offset="100%" stopColor="#243324" />
      </linearGradient>
      <linearGradient id="legendBg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
        <stop offset="100%" stopColor="#f1f8e9" stopOpacity="0.95" />
      </linearGradient>
      <filter id="glow"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>
    <rect width="380" height="260" fill="url(#satBg)" rx="6"/>
    {[
      "30,20 90,18 92,55 28,58", "95,18 160,20 158,55 93,55",
      "165,20 230,22 228,55 163,58", "235,22 300,20 302,55 233,55",
      "305,20 370,22 368,55 303,55", "28,62 90,60 88,100 26,102",
      "93,60 160,62 158,100 91,100", "163,62 230,60 228,102 161,102",
      "233,60 300,62 298,100 231,102", "26,106 88,104 86,145 24,147",
      "91,104 160,106 158,145 89,145", "163,106 228,104 226,145 161,147",
      "231,104 298,106 296,145 229,147", "24,151 86,149 84,192 22,194",
      "89,149 160,151 158,192 87,192", "163,149 226,151 224,192 161,192",
      "229,151 296,149 294,192 227,192",
    ].map((pts, i) => (
      <polygon key={i} points={pts} fill={i % 4 === 0 ? "#2a3d2a" : i % 4 === 1 ? "#1e2e1e" : i % 4 === 2 ? "#243224" : "#2d3d2d"} />
    ))}
    <rect x="0" y="196" width="380" height="8" fill="#3d5a3d" opacity="0.9"/>
    <rect x="0" y="147" width="380" height="5" fill="#2d4a2d"/>
    <rect x="0" y="100" width="380" height="5" fill="#2d4a2d"/>
    <rect x="0" y="55" width="380" height="5" fill="#2d4a2d"/>
    <rect x="160" y="0" width="6" height="260" fill="#3d5a3d" opacity="0.9"/>
    <rect x="90" y="0" width="3" height="260" fill="#2d4a2d"/>
    <rect x="230" y="0" width="3" height="260" fill="#2d4a2d"/>
    <rect x="300" y="0" width="3" height="260" fill="#2d4a2d"/>
    <path d="M 20 240 Q 60 220 100 200 Q 160 175 200 150 Q 260 110 320 125 Q 355 135 375 158"
      fill="none" stroke="#ff6b35" strokeWidth="2.5" strokeDasharray="7,4" opacity="0.9" filter="url(#glow)"/>
    <path d="M 0 147 L 380 147" stroke="#4fc3f7" strokeWidth="1.5" strokeDasharray="10,5" opacity="0.7"/>
    {[[80,200],[163,200],[250,200],[340,200]].map(([x,y],i) => (
      <g key={`bs${i}`} filter="url(#glow)">
        <circle cx={x} cy={y} r="7" fill="#26a69a"/>
        <text x={x} y={y+4} textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">B</text>
      </g>
    ))}
    {[[45,35],[120,38],[195,30],[260,42],[335,32],[45,125],[120,115],[195,118],[280,130],[350,120]].map(([x,y],i) => (
      <g key={`t${i}`}>
        <circle cx={x} cy={y} r="8" fill="#1b5e20" opacity="0.7"/>
        <circle cx={x} cy={y} r="5" fill="#2e7d32" opacity="0.8"/>
        <circle cx={x} cy={y} r="2.5" fill="#43a047"/>
      </g>
    ))}
    <polygon points="235,160 295,157 293,192 233,194" fill="#fff176" opacity="0.15" stroke="#ffd54f" strokeWidth="1"/>
    <polygon points="305,160 365,157 363,192 303,194" fill="#a5d6a7" opacity="0.15" stroke="#81c784" strokeWidth="1"/>
    <rect x="386" y="0" width="154" height="340" fill="url(#legendBg)" rx="0 6 6 0"/>
    <text x="394" y="22" fontSize="11" fill="#1b5e20" fontWeight="bold" fontFamily="DM Sans, sans-serif">GIS Field Survey</text>
    <text x="394" y="36" fontSize="9.5" fill="#37474f" fontFamily="DM Sans, sans-serif">17 Ave SW, Calgary</text>
    <line x1="394" y1="42" x2="530" y2="42" stroke="#b2dfdb" strokeWidth="1"/>
    {[{ label: "Bus Stops", color: "#26a69a", shape: "circle", y: 60 },{ label: "Restaurants", color: "#ff8a65", shape: "circle", y: 82 }].map(({ label, color, shape, y }) => (
      <g key={label}>
        <circle cx="402" cy={y-4} r="6" fill={color}/>
        <text x="415" y={y} fontSize="10" fill="#455a64" fontFamily="DM Sans, sans-serif">{label}</text>
      </g>
    ))}
    <line x1="394" y1="98" x2="530" y2="98" stroke="#e0e0e0" strokeWidth="0.5"/>
    <line x1="396" y1="112" x2="412" y2="112" stroke="#4fc3f7" strokeWidth="1.5" strokeDasharray="4,2"/>
    <text x="416" y="116" fontSize="10" fill="#455a64" fontFamily="DM Sans, sans-serif">Bikelanes</text>
    <line x1="396" y1="130" x2="412" y2="130" stroke="#ff6b35" strokeWidth="1.5" strokeDasharray="5,3"/>
    <text x="416" y="134" fontSize="10" fill="#455a64" fontFamily="DM Sans, sans-serif">Trail Path</text>
    <line x1="394" y1="145" x2="530" y2="145" stroke="#e0e0e0" strokeWidth="0.5"/>
    <text x="394" y="162" fontSize="9" fill="#78909c" fontFamily="DM Mono, monospace">NAD 1983 3TM 114</text>
    <text x="394" y="178" fontSize="9" fill="#78909c" fontFamily="DM Mono, monospace">Scale: 1:8,000</text>
    <text x="394" y="194" fontSize="9" fill="#78909c" fontFamily="DM Mono, monospace">Avg RMSE: 5.893</text>
    <g transform="translate(394, 305)">
      <rect x="0" y="-4" width="40" height="6" fill="#26a69a"/>
      <rect x="40" y="-4" width="40" height="6" fill="white" stroke="#26a69a" strokeWidth="0.5"/>
      <text x="0" y="10" fontSize="8" fill="#546e7a">0</text>
      <text x="36" y="10" fontSize="8" fill="#546e7a">240m</text>
    </g>
    <g transform="translate(510, 310)">
      <polygon points="0,-13 -5,5 0,0 5,5" fill="#26a69a"/>
      <circle cx="0" cy="0" r="7" fill="none" stroke="#26a69a" strokeWidth="1"/>
      <text x="0" y="22" textAnchor="middle" fontSize="10" fill="#26a69a" fontWeight="bold">N</text>
    </g>
    <text x="394" y="338" fontSize="8" fill="#90a4ae" fontFamily="DM Mono, monospace">Cartographer: Arpit Patel</text>
  </svg>
);

const ATSIllustration = () => (
  <svg viewBox="0 0 540 340" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <linearGradient id="atsBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fafafa"/>
        <stop offset="100%" stopColor="#f5f0e8"/>
      </linearGradient>
      <pattern id="atsGrid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#d4c5a9" strokeWidth="0.5"/>
      </pattern>
    </defs>
    <rect width="380" height="260" fill="url(#atsBg)" rx="6"/>
    <rect width="380" height="260" fill="url(#atsGrid)" opacity="0.5"/>
    {[0,1,2,3,4,5].map(col =>
      [0,1,2,3,4].map(row => (
        <rect key={`sec${col}${row}`} x={10 + col * 60} y={10 + row * 48} width="58" height="46"
          fill="none" stroke="#8d6e63" strokeWidth="1.5" strokeDasharray="3,2"/>
      ))
    )}
    {[31,32,33,34,35,36,30,29,28,27,26,25,19,20,21,22,23,24,18,17,16,15,14,13].map((n, i) => (
      <text key={n} x={39 + (i%6)*60} y={34 + Math.floor(i/6)*48}
        textAnchor="middle" fontSize="11" fill="#5d4037" fontWeight="500" fontFamily="DM Mono, monospace">{n}</text>
    ))}
    <path d="M 70 10 Q 85 30 80 48 Q 75 62 72 80 Q 68 100 75 110 Q 82 125 78 140 Q 74 155 70 170 Q 65 185 62 200 Q 58 215 55 230 Q 52 245 48 260"
      fill="none" stroke="#5c9bd1" strokeWidth="5" opacity="0.7"/>
    <path d="M 10 80 Q 60 75 120 85 Q 180 90 220 80 Q 270 72 310 85 Q 340 92 370 80"
      fill="none" stroke="#a1887f" strokeWidth="0.8" strokeDasharray="2,2" opacity="0.6"/>
    <path d="M 10 130 Q 50 125 100 132 Q 160 140 210 128 Q 270 118 320 132 Q 350 140 370 128"
      fill="none" stroke="#a1887f" strokeWidth="0.8" strokeDasharray="2,2" opacity="0.6"/>
    <line x1="10" y1="58" x2="370" y2="58" stroke="#795548" strokeWidth="2.5"/>
    <line x1="10" y1="202" x2="370" y2="202" stroke="#795548" strokeWidth="2.5"/>
    <line x1="130" y1="10" x2="130" y2="250" stroke="#795548" strokeWidth="2.5"/>
    <rect x="10" y="10" width="118" height="94" fill="none" stroke="#e53935" strokeWidth="2" strokeDasharray="6,3" opacity="0.7"/>
    <rect x="386" y="0" width="154" height="340" fill="#fafaf7" rx="0 6 6 0"/>
    <text x="394" y="22" fontSize="11" fill="#4e342e" fontWeight="bold" fontFamily="DM Sans, sans-serif">ATS · NTS Reference</text>
    <text x="394" y="36" fontSize="9.5" fill="#6d4c41" fontFamily="DM Sans, sans-serif">Carseland, Alberta</text>
    <line x1="394" y1="42" x2="530" y2="42" stroke="#d7ccc8" strokeWidth="1"/>
    <text x="394" y="60" fontSize="9" fill="#78909c" fontFamily="DM Mono, monospace">Township: 21</text>
    <text x="394" y="74" fontSize="9" fill="#78909c" fontFamily="DM Mono, monospace">Range: 25</text>
    <text x="394" y="88" fontSize="9" fill="#78909c" fontFamily="DM Mono, monospace">Meridian: W4M</text>
    <line x1="394" y1="98" x2="530" y2="98" stroke="#eeeeee" strokeWidth="0.5"/>
    {[
      { label: "GPS Location", color: "#e53935", shape: "star", y: 118 },
      { label: "Study Area", color: "#e53935", shape: "rect-dash", y: 140 },
      { label: "Section", color: "#8d6e63", shape: "rect-dash", y: 162 },
    ].map(({ label, color, shape, y }) => (
      <g key={label}>
        {shape === "star" && <polygon points={`402,${y-7} 404,${y-2} 409,${y-2} 405,${y+1} 407,${y+6} 402,${y+3} 397,${y+6} 399,${y+1} 395,${y-2} 400,${y-2}`} fill={color}/>}
        {shape === "rect-dash" && <rect x="396" y={y-8} width="14" height="10" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="3,2"/>}
        <text x="415" y={y} fontSize="10" fill="#455a64" fontFamily="DM Sans, sans-serif">{label}</text>
      </g>
    ))}
    <text x="394" y="338" fontSize="8" fill="#90a4ae" fontFamily="DM Mono, monospace">Cartographer: Arpit Patel</text>
  </svg>
);

const ModelBuilderIllustration = () => {
  const nodes = [
    { id: "in1", x: 30, y: 60, label: "Study_Polygon", type: "input" },
    { id: "in2", x: 30, y: 110, label: "GDB_Location", type: "input" },
    { id: "in3", x: 30, y: 160, label: "GPS_TMPay", type: "input" },
    { id: "t1", x: 120, y: 85, label: "XY Table\nTo Point", type: "tool" },
    { id: "t2", x: 200, y: 60, label: "Select\nLayer", type: "tool" },
    { id: "p1", x: 280, y: 35, label: "Hydro\nDefine Proj", type: "process" },
    { id: "p2", x: 280, y: 65, label: "Contour\nDefine Proj", type: "process" },
    { id: "p3", x: 280, y: 95, label: "Road\nDefine Proj", type: "process" },
    { id: "p4", x: 280, y: 125, label: "Pipeline\nDefine Proj", type: "process" },
    { id: "p5", x: 280, y: 155, label: "Study\nArea", type: "process" },
    { id: "m1", x: 360, y: 35, label: "Merge", type: "merge" },
    { id: "m2", x: 360, y: 80, label: "Merge", type: "merge" },
    { id: "m3", x: 360, y: 140, label: "Merge", type: "merge" },
    { id: "c1", x: 430, y: 35, label: "Clip", type: "clip" },
    { id: "c2", x: 430, y: 80, label: "Clip", type: "clip" },
    { id: "c3", x: 430, y: 125, label: "Clip", type: "clip" },
    { id: "c4", x: 430, y: 170, label: "Clip", type: "clip" },
    { id: "o1", x: 505, y: 22, label: "Hydro", type: "output" },
    { id: "o2", x: 505, y: 65, label: "Contour", type: "output" },
    { id: "o3", x: 505, y: 108, label: "Road", type: "output" },
    { id: "o4", x: 505, y: 150, label: "Pipeline", type: "output" },
  ];
  const edges = [
    ["in1","t1"],["in2","t1"],["in3","t1"],["t1","t2"],
    ["t2","p1"],["t2","p2"],["t2","p3"],["t2","p4"],["t2","p5"],
    ["p1","m1"],["p2","m1"],["p2","m2"],["p3","m2"],["p3","m3"],["p4","m3"],
    ["m1","c1"],["m2","c2"],["m3","c3"],["p5","c4"],
    ["c1","o1"],["c2","o2"],["c3","o3"],["c4","o4"],
  ];
  const nodeColors = { input: "#e3f2fd", tool: "#fff3e0", process: "#e8f5e9", merge: "#fce4ec", clip: "#f3e5f5", output: "#e0f7fa" };
  const nodeBorders = { input: "#42a5f5", tool: "#ffa726", process: "#66bb6a", merge: "#ef5350", clip: "#ab47bc", output: "#26c6da" };
  const getNode = (id) => nodes.find(n => n.id === id);
  return (
    <svg viewBox="0 0 540 220" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="mbBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fafbff"/><stop offset="100%" stopColor="#f0f4ff"/>
        </linearGradient>
        <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M 0 0 L 6 3 L 0 6 Z" fill="#90a4ae"/>
        </marker>
      </defs>
      <rect width="540" height="220" fill="url(#mbBg)" rx="6"/>
      {[0,40,80,120,160,200].map(y => <line key={y} x1="0" y1={y} x2="540" y2={y} stroke="#e8eaf6" strokeWidth="0.5"/>)}
      {[0,60,120,180,240,300,360,420,480,540].map(x => <line key={x} x1={x} y1="0" x2={x} y2="220" stroke="#e8eaf6" strokeWidth="0.5"/>)}
      <text x="10" y="15" fontSize="10" fill="#3949ab" fontWeight="bold" fontFamily="DM Mono, monospace">ModelBuilder — Automated Geoprocessing Pipeline</text>
      {edges.map(([from, to], i) => {
        const a = getNode(from), b = getNode(to);
        if (!a || !b) return null;
        const mx = (a.x + 28 + b.x) / 2;
        return <path key={i} d={`M ${a.x+28} ${a.y+10} C ${mx} ${a.y+10} ${mx} ${b.y+10} ${b.x} ${b.y+10}`}
          fill="none" stroke="#90a4ae" strokeWidth="1" markerEnd="url(#arrow)" opacity="0.7"/>;
      })}
      {nodes.map(({ id, x, y, label, type }) => (
        <g key={id}>
          <rect x={x} y={y} width="56" height="22" rx="3" fill={nodeColors[type]} stroke={nodeBorders[type]} strokeWidth="1.5"/>
          {label.split("\n").map((line, i) => (
            <text key={i} x={x+28} y={y + 9 + i * 9} textAnchor="middle" fontSize="7" fill="#37474f" fontFamily="DM Sans, sans-serif">{line}</text>
          ))}
        </g>
      ))}
    </svg>
  );
};

const LandCoverIllustration = () => (
  <svg viewBox="0 0 540 340" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <linearGradient id="lcBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f9fbe7"/><stop offset="100%" stopColor="#f1f8e9"/>
      </linearGradient>
    </defs>
    <rect width="380" height="260" fill="url(#lcBg)" rx="6"/>
    <polygon points="10,10 180,12 175,80 160,120 140,150 100,165 60,160 20,140 10,100" fill="#a5d6a7" stroke="#66bb6a" strokeWidth="1"/>
    <polygon points="185,12 350,10 370,50 365,110 340,140 300,155 260,150 230,130 220,95 230,60 210,30" fill="#c8e6c9" stroke="#81c784" strokeWidth="1"/>
    <polygon points="60,165 140,155 170,180 180,220 160,250 90,255 70,240" fill="#b9f6ca" stroke="#69f0ae" strokeWidth="0.8"/>
    <polygon points="145,155 230,135 265,160 255,200 235,230 200,250 170,245 165,215" fill="#a5d6a7" stroke="#66bb6a" strokeWidth="1"/>
    <polygon points="235,145 300,160 340,145 370,170 365,220 330,250 290,255 260,240 250,205" fill="#c8e6c9" stroke="#81c784" strokeWidth="1"/>
    <polygon points="90,50 130,45 135,85 105,90 85,75" fill="#cfd8dc" stroke="#b0bec5" strokeWidth="1" opacity="0.8"/>
    <polygon points="260,50 310,48 315,90 270,95 255,75" fill="#b0bec5" stroke="#90a4ae" strokeWidth="1" opacity="0.8"/>
    <polygon points="20,155 50,170 45,210 15,200" fill="#2e7d32" stroke="#1b5e20" strokeWidth="1" opacity="0.7"/>
    <polygon points="155,95 195,85 205,125 170,135 150,115" fill="#388e3c" stroke="#2e7d32" strokeWidth="1" opacity="0.7"/>
    <path d="M 10 85 Q 50 90 80 80 Q 120 70 160 82 Q 200 92 240 82 Q 280 70 320 80 Q 350 88 370 82"
      fill="none" stroke="#42a5f5" strokeWidth="2.5" opacity="0.7"/>
    {[[95,50],[150,168],[290,55],[300,175]].map(([x,y],i) => (
      <g key={`dev${i}`}>
        <rect x={x-12} y={y-10} width="24" height="20" rx="2" fill="#e53935" opacity="0.85" stroke="#b71c1c" strokeWidth="1"/>
        <text x={x} y={y+4} textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">D</text>
      </g>
    ))}
    <rect x="386" y="0" width="154" height="340" fill="#f9fbe7" rx="0 6 6 0"/>
    <text x="394" y="22" fontSize="11" fill="#1b5e20" fontWeight="bold" fontFamily="DM Sans, sans-serif">Land Cover Map</text>
    <text x="394" y="36" fontSize="9.5" fill="#33691e" fontFamily="DM Sans, sans-serif">Grande Prairie, AB</text>
    <line x1="394" y1="42" x2="530" y2="42" stroke="#c8e6c9" strokeWidth="1"/>
    {[
      { label: "Agricultural", color: "#a5d6a7", border: "#66bb6a", y: 62 },
      { label: "Natural Areas", color: "#2e7d32", border: "#1b5e20", y: 82 },
      { label: "Developed", color: "#b0bec5", border: "#90a4ae", y: 102 },
      { label: "Proposed Dev.", color: "#e53935", border: "#b71c1c", y: 122 },
    ].map(({ label, color, border, y }) => (
      <g key={label}>
        <rect x="396" y={y-10} width="16" height="12" rx="2" fill={color} stroke={border} strokeWidth="1"/>
        <text x="418" y={y} fontSize="10" fill="#455a64" fontFamily="DM Sans, sans-serif">{label}</text>
      </g>
    ))}
    <line x1="394" y1="135" x2="530" y2="135" stroke="#e0e0e0" strokeWidth="0.5"/>
    <text x="394" y="155" fontSize="10" fill="#33691e" fontWeight="bold" fontFamily="DM Sans, sans-serif">Impacted Area (ha)</text>
    {[
      { label: "Agricultural", val: 3.60, color: "#66bb6a", width: 90 },
      { label: "Developed", val: 0.25, color: "#90a4ae", width: 20 },
      { label: "Natural", val: 1.52, color: "#2e7d32", width: 45 },
    ].map(({ label, val, color, width }, i) => (
      <g key={label}>
        <text x="394" y={175 + i * 32} fontSize="9" fill="#546e7a" fontFamily="DM Sans, sans-serif">{label}</text>
        <rect x="394" y={178 + i * 32} width={width} height="12" rx="2" fill={color} opacity="0.8"/>
        <text x={398 + width} y={188 + i * 32} fontSize="9" fill="#37474f" fontFamily="DM Mono, monospace">{val}</text>
      </g>
    ))}
    <text x="394" y="295" fontSize="8" fill="#78909c" fontFamily="DM Mono, monospace">MMU Applied: 0.5ha</text>
    <text x="394" y="309" fontSize="8" fill="#78909c" fontFamily="DM Mono, monospace">Projection: NAD83</text>
    <text x="394" y="338" fontSize="8" fill="#90a4ae" fontFamily="DM Mono, monospace">Cartographer: Arpit Patel</text>
  </svg>
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
            Four applied GIS projects spanning mobile data collection, land survey systems, geoprocessing automation, and environmental impact analysis.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-8">
            {[{ val: "04", label: "Projects" },{ val: "5+", label: "GIS Tools" },{ val: "3+", label: "Canadian Provinces" },{ val: "100%", label: "ArcGIS Ecosystem" }].map(({ val, label }) => (
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
