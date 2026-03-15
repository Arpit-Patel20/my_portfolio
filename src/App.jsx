import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import StoryMaps from './components/StoryMaps';
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
    background: 'radial-gradient(circle, rgba(0,121,193,0.10) 0%, transparent 70%)',
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
          position: 'absolute', top: '-15%', left: '-10%',
          width: '70vw', height: '70vw', borderRadius: '50%', filter: 'blur(100px)',
          background: 'radial-gradient(circle, rgba(0,121,193,0.18) 0%, rgba(0,121,193,0.08) 40%, transparent 68%)',
          animation: 'blobDrift1 16s ease-in-out infinite alternate',
        }} />
        <div style={{
          position: 'absolute', top: '35%', right: '-15%',
          width: '55vw', height: '55vw', borderRadius: '50%', filter: 'blur(120px)',
          background: 'radial-gradient(circle, rgba(0,169,224,0.12) 0%, rgba(0,121,193,0.06) 40%, transparent 68%)',
          animation: 'blobDrift2 20s ease-in-out infinite alternate',
        }} />
        <div style={{
          position: 'absolute', bottom: '-10%', left: '20%',
          width: '50vw', height: '50vw', borderRadius: '50%', filter: 'blur(90px)',
          background: 'radial-gradient(circle, rgba(0,121,193,0.10) 0%, rgba(0,169,224,0.05) 40%, transparent 68%)',
          animation: 'blobDrift3 24s ease-in-out infinite alternate',
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
        <StoryMaps />
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
