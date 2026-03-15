import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProjectsPage from './pages/ProjectsPage';

/* Floating cursor dot that follows mouse */
function CursorGlow() {
  const dotRef = useRef(null);
  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;
    let raf;
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let cx = mx, cy = my;
    const onMove = (e) => { mx = e.clientX; my = e.clientY; };
    window.addEventListener('pointermove', onMove);
    const animate = () => {
      cx += (mx - cx) * 0.1;
      cy += (my - cy) * 0.1;
      dot.style.transform = `translate(${cx - 200}px, ${cy - 200}px)`;
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => { window.removeEventListener('pointermove', onMove); cancelAnimationFrame(raf); };
  }, []);
  return (
    <div ref={dotRef} aria-hidden style={{
      position: 'fixed', top: 0, left: 0, width: 400, height: 400, borderRadius: '50%',
      pointerEvents: 'none', zIndex: 1,
      background: 'radial-gradient(circle, rgba(13,122,111,0.08) 0%, transparent 70%)',
    }} />
  );
}

export default function App() {
  const [page, setPage] = useState('home');

  // Scroll to top whenever page changes
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [page]);

  // Projects page
  if (page === 'projects') {
    return <ProjectsPage onBack={() => setPage('home')} />;
  }

  return (
    <div style={{ background: 'var(--bg)' }} className="min-h-screen overflow-x-hidden">
      {/* ── Ambient blobs ── */}
      <div aria-hidden className="fixed inset-0 overflow-hidden z-0 pointer-events-none">
        <div style={{
          position: 'absolute', top: '-12%', left: '-8%',
          width: '62vw', height: '62vw', borderRadius: '50%', filter: 'blur(70px)',
          background: 'radial-gradient(circle, rgba(134,239,172,0.70) 0%, rgba(52,211,153,0.45) 30%, transparent 68%)',
          animation: 'blobDrift1 14s ease-in-out infinite alternate',
        }} />
        <div style={{
          position: 'absolute', top: '28%', right: '-14%',
          width: '52vw', height: '52vw', borderRadius: '50%', filter: 'blur(75px)',
          background: 'radial-gradient(circle, rgba(253,224,71,0.62) 0%, rgba(251,189,35,0.38) 35%, transparent 68%)',
          animation: 'blobDrift2 18s ease-in-out infinite alternate',
        }} />
        <div style={{
          position: 'absolute', bottom: '-10%', left: '18%',
          width: '46vw', height: '46vw', borderRadius: '50%', filter: 'blur(70px)',
          background: 'radial-gradient(circle, rgba(110,231,183,0.55) 0%, rgba(167,243,208,0.30) 40%, transparent 68%)',
          animation: 'blobDrift3 22s ease-in-out infinite alternate',
        }} />
      </div>

      <CursorGlow />

      <div className="relative z-10">
        {/* Pass navigate function to Navbar and Projects */}
        <Navbar onNavigate={setPage} />
        <Hero onNavigate={setPage} />
        <About />
        <Skills />
        <Experience />
        <Projects onNavigate={setPage} />
        <Contact />
        <Footer />
      </div>

      <style>{`
        @keyframes blobDrift1 { 0% { transform: translate(0,0) scale(1); } 100% { transform: translate(40px,30px) scale(1.08); } }
        @keyframes blobDrift2 { 0% { transform: translate(0,0) scale(1); } 100% { transform: translate(-30px,40px) scale(1.06); } }
        @keyframes blobDrift3 { 0% { transform: translate(0,0) scale(1); } 100% { transform: translate(20px,-30px) scale(1.05); } }
      `}</style>
    </div>
  );
}
