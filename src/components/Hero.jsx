import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { Github, Linkedin, Download, Mail, MapPin, ArrowDown } from 'lucide-react';
import arpitImg from "/assets/arpit.jpg";

const BASE = import.meta.env.BASE_URL;

const socials = [
  { href: "https://www.linkedin.com/in/arpit-patel-53b68a254", icon: <Linkedin size={15} />, label: "LinkedIn" },
  { href: "https://github.com/Arpit-Patel20", icon: <Github size={15} />, label: "GitHub" },
];

const NAME_WORDS = ['Arpit', 'Patel'];

const wordVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay: 0.4 + i * 0.18, ease: [0.16, 1, 0.3, 1] },
  }),
};

const SUBTITLE = "Production-focused GIS specialist with experience in aerial imagery QC, spatial analysis, and geospatial automation across the full data pipeline.";

export default function Hero({ onNavigate }) {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 100]);
  const heroOpacity = useTransform(scrollY, [0, 350], [1, 0]);
  const lineRef = useRef(null);
  const canvasRef = useRef(null);
  const [typedText, setTypedText] = useState('');
  const [cursorOn, setCursorOn] = useState(true);

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    const NUM = 55;
    const pts = Array.from({ length: NUM }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      r: Math.random() * 1.4 + 0.5,
    }));
    const draw = () => {
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 115) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = 'rgba(0,121,193,' + (0.16 * (1 - d / 115)) + ')';
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      pts.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,169,224,0.5)';
        ctx.fill();
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  // Typing animation
  useEffect(() => {
    const delay = setTimeout(() => {
      let i = 0;
      const timer = setInterval(() => {
        i++;
        setTypedText(SUBTITLE.slice(0, i));
        if (i >= SUBTITLE.length) clearInterval(timer);
      }, 18);
      return () => clearInterval(timer);
    }, 1000);
    return () => clearTimeout(delay);
  }, []);

  // Cursor blink
  useEffect(() => {
    const c = setInterval(() => setCursorOn(v => !v), 530);
    return () => clearInterval(c);
  }, []);

  useEffect(() => {
    gsap.fromTo(
      lineRef.current,
      { scaleX: 0, transformOrigin: "left center" },
      { scaleX: 1, duration: 0.9, delay: 1.1, ease: "power3.out" },
    );
  }, []);

  return (
    <section
      id="profile"
      className="relative min-h-[80vh] flex items-center overflow-hidden"
    >
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}
      />

      <motion.div
        style={{ y: heroY, opacity: heroOpacity, position: 'relative', zIndex: 1 }}
        className="container-tight pt-24 pb-12 flex flex-col md:flex-row items-center gap-8 md:gap-14"
      >
        {/* Text left */}
        <div className="flex-1 order-2 md:order-1 space-y-5 px-1">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <span className="eyebrow text-[0.6rem] sm:text-[0.6875rem]">
              Production Technician Intern · GIS Analyst
            </span>
          </motion.div>

          {/* Name */}
          <div>
            <h1
              className="font-sans leading-[1.04] font-bold"
              style={{
                fontSize: "clamp(2.6rem, 7vw, 5.5rem)",
                color: "#ffffff",
                letterSpacing: '-0.02em',
              }}
            >
              {NAME_WORDS.map((word, i) => (
                <motion.span
                  key={word}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={wordVariants}
                  style={{
                    display: "inline-block",
                    marginRight: i < NAME_WORDS.length - 1 ? "0.28em" : 0,
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </h1>
            <div
              ref={lineRef}
              className="h-0.5 mt-2 rounded-full w-2/3"
              style={{
                background: "linear-gradient(90deg, var(--accent), transparent)",
              }}
            />
          </div>

          {/* Subtitle with typing effect */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.0 }}
            className="text-sm sm:text-base md:text-lg leading-7 max-w-md"
            style={{ color: "var(--text-2)", minHeight: '5.5rem' }}
          >
            {typedText}
            <span style={{ color: 'var(--accent)', opacity: cursorOn ? 1 : 0, transition: 'opacity 0.1s' }}>|</span>
          </motion.p>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="flex items-center gap-1.5 text-xs sm:text-sm"
            style={{ color: "var(--text-3)" }}
          >
            <MapPin size={13} />
            <span>Calgary, Alberta · Open to Relocate</span>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.35 }}
            className="flex flex-wrap gap-3"
          >
            <motion.a
              href={BASE + 'assets/Arpit_Patel_GIS.pdf'}
              download
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              className="btn-primary text-xs sm:text-sm"
            >
              <Download size={14} /> Download CV
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              className="btn-ghost text-xs sm:text-sm"
            >
              <Mail size={14} /> Get in Touch
            </motion.a>
          </motion.div>

          {/* Socials */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.5 }}
            className="flex gap-2"
          >
            {socials.map(({ href, icon, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.93 }}
                className="btn-ghost text-xs px-4 py-2 gap-2"
              >
                {icon} {label}
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Photo right */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.1,
            delay: 0.25,
            type: "spring",
            stiffness: 70,
            damping: 16,
          }}
          className="order-1 md:order-2 shrink-0 relative"
        >
          {/* Rings */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
            className="absolute inset-[-18px] rounded-[2.8rem] border border-dashed"
            style={{ borderColor: "rgba(0,121,193,0.25)" }}
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
            className="absolute inset-[-32px] rounded-[3.2rem] border"
            style={{ borderColor: "rgba(0,169,224,0.12)", borderStyle: "dotted" }}
          />
          <div
            className="absolute inset-0 rounded-[2.4rem] blur-2xl opacity-50"
            style={{
              background: "radial-gradient(circle at 50% 30%, rgba(0,121,193,0.25), rgba(0,169,224,0.10) 60%, transparent 80%)",
            }}
          />
          <div
            className="relative overflow-hidden"
            style={{
              width: "clamp(170px, 24vw, 260px)",
              height: "clamp(220px, 32vw, 340px)",
              borderRadius: "2.25rem",
              boxShadow: "0 20px 64px rgba(0,121,193,0.20), 0 4px 20px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.08)",
              background: "rgba(7,17,31,0.80)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(0,121,193,0.25)",
              padding: "6px",
            }}
          >
            <img
              src={arpitImg}
              alt="Arpit Patel"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
                borderRadius: "1.9rem",
                display: "block",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0, left: 0, right: 0,
                height: "35%",
                borderRadius: "0 0 1.9rem 1.9rem",
                background: "linear-gradient(to top, rgba(0,121,193,0.20) 0%, transparent 100%)",
                pointerEvents: "none",
              }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ zIndex: 1 }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ArrowDown size={18} style={{ color: "var(--text-4)" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
