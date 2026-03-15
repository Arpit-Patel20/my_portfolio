# Arpit Patel — GIS Analyst Portfolio

> A minimal, animated personal portfolio built for a GIS job search. Designed to highlight spatial analysis work, cartographic projects, and professional experience — not a developer's skills list.

**Live stack:** React · Vite · Tailwind CSS · Framer Motion · GSAP · Lucide Icons

---

## ✨ Features

- **Liquid glass Navbar** — frosted-glass blur effect with teal ambient blobs visible through it
- **Animated hero** — name animates in word-by-word via Framer Motion; parallax scroll fade
- **Dedicated Projects page** — 4 real GIS case studies with hand-drawn SVG map illustrations, expandable outcome/challenge/impact sections, and stat chips
- **About section** — equal-height 2×2 card grid (`gridAutoRows: 1fr`) with personal bio focused on Arpit as a person, not a skills list
- **Cursor glow** — subtle radial teal glow follows the mouse
- **Animated blobs** — three ambient colour blobs drift with CSS keyframe animations
- **State-based routing** — no React Router; `page` state in `App.jsx` switches between home and projects
- **Mobile responsive** throughout

---

## 🗂️ Project Structure

```
src/
├── App.jsx                  # Root — page state routing + ambient blobs + cursor glow
├── index.css                # Design tokens, glass utility classes, button styles
├── components/
│   ├── Navbar.jsx           # Liquid glass navbar; Projects link triggers navigation
│   ├── Hero.jsx             # Animated name, photo card, CTA buttons
│   ├── About.jsx            # Story + equal-height stat grid
│   ├── Skills.jsx           # GIS tool icons
│   ├── Experience.jsx       # Timeline with alternating GSAP entrance
│   ├── Projects.jsx         # 4-card summary with SVG map thumbnails → navigates to ProjectsPage
│   ├── Contact.jsx          # Contact form + availability card
│   └── Footer.jsx           # Clean footer with back-to-top
└── pages/
    └── ProjectsPage.jsx     # Full GIS project case studies with SVG illustrations
```

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:5173](http://localhost:5173)

---

## 🗺️ GIS Projects Showcased

| # | Project | Tools |
|---|---------|-------|
| 01 | Field Data Collection & Asset Mapping | ArcGIS Field Maps, ArcGIS Online |
| 02 | ATS & NTS Spatial Referencing | ArcGIS Pro, NAD 1983 UTM |
| 03 | GIS Workflow Automation (ModelBuilder) | ArcGIS Pro, ModelBuilder |
| 04 | Land Cover Interpretation & EIA | ArcGIS Pro, Airphoto Interpretation |

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Primary accent | `#0D7A6F` (deep teal) |
| Background | `#F5F4F0` (warm parchment) |
| Glass bg (resting) | `rgba(255,255,255,0.28)` |
| Glass bg (scrolled) | `rgba(255,255,255,0.82)` |
| Font — headings | Instrument Serif (italic) |
| Font — body | Inter |

---

## 📸 Assets

Place `arpit.jpg` in `public/assets/arpit.jpg` — the hero photo card will use it automatically.

---

## 📄 License

Personal portfolio — all content belongs to **Arpit Patel**.
"# my_gis_porfolio" 
"# my_gis_porfolio" 
