import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Linkedin, Github, Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const contacts = [
  { icon: <Mail size={16} />, label: 'Email', value: 'alex.chen@email.com', href: 'mailto:alex.chen@email.com' },
  { icon: <Linkedin size={16} />, label: 'LinkedIn', value: 'linkedin.com/in/alexchengis', href: 'https://linkedin.com' },
  { icon: <Github size={16} />, label: 'GitHub', value: 'github.com/alexchen-gis', href: 'https://github.com' },
];

export default function Contact() {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(leftRef.current, { x: -56, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: leftRef.current, start: 'top 82%' } });
      gsap.fromTo(rightRef.current, { x: 56, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: rightRef.current, start: 'top 82%' } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="section">
      <div className="container-tight">
        <div className="text-center mb-12">
          <span className="eyebrow">Let's Connect</span>
          <h2 className="font-serif text-4xl md:text-5xl mt-3" style={{ fontStyle: 'italic' }}>Get in Touch</h2>
          <p className="mt-3 text-base max-w-md mx-auto" style={{ color: 'var(--text-2)' }}>
            Open to GIS Analyst and Spatial Data roles. Have a project or opportunity? Reach out.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Left — info */}
          <div ref={leftRef} className="card p-7 space-y-4 h-full">
            {contacts.map(({ icon, label, value, href }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ x: 4 }}
                className="flex items-center gap-4 p-3.5 rounded-xl transition-colors group"
                style={{ border: '1px solid rgba(0,0,0,0.06)', background: 'rgba(255,255,255,0.5)' }}
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                  style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>
                  {icon}
                </div>
                <div>
                  <p className="text-[11px] font-medium mb-0.5" style={{ color: 'var(--text-4)' }}>{label}</p>
                  <p className="text-sm font-medium" style={{ color: 'var(--text)' }}>{value}</p>
                </div>
              </motion.a>
            ))}

            {/* Availability note */}
            <div className="mt-2 p-4 rounded-xl flex items-start gap-3"
              style={{ background: 'var(--accent-light)', border: '1px solid rgba(13,122,111,0.15)' }}>
              <span className="flex-shrink-0 mt-0.5">
                <span className="relative flex w-2 h-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                    style={{ background: 'var(--accent)' }} />
                  <span className="relative inline-flex w-2 h-2 rounded-full" style={{ background: 'var(--accent)' }} />
                </span>
              </span>
              <p className="text-sm" style={{ color: 'var(--accent)' }}>
                Currently <strong>available</strong> for full-time GIS roles and freelance spatial analysis projects.
              </p>
            </div>
          </div>

          {/* Right — form */}
          <div ref={rightRef} className="card p-7 h-full">
            <form className="space-y-4" onSubmit={e => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'Your Name', placeholder: 'Jane Smith', type: 'text' },
                  { label: 'Organisation', placeholder: 'Acme GIS Ltd', type: 'text' },
                ].map(f => (
                  <div key={f.label}>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-3)' }}>{f.label}</label>
                    <input type={f.type} placeholder={f.placeholder}
                      className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none transition-shadow"
                      style={{
                        background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(0,0,0,0.1)',
                        color: 'var(--text)',
                      }}
                      onFocus={e => (e.target.style.boxShadow = '0 0 0 3px rgba(13,122,111,0.18)')}
                      onBlur={e => (e.target.style.boxShadow = 'none')}
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-3)' }}>Email</label>
                <input type="email" placeholder="jane@company.com"
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none transition-shadow"
                  style={{ background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(0,0,0,0.1)', color: 'var(--text)' }}
                  onFocus={e => (e.target.style.boxShadow = '0 0 0 3px rgba(13,122,111,0.18)')}
                  onBlur={e => (e.target.style.boxShadow = 'none')}
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-3)' }}>Message</label>
                <textarea rows={4} placeholder="Describe the opportunity or project..."
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none transition-shadow resize-none"
                  style={{ background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(0,0,0,0.1)', color: 'var(--text)' }}
                  onFocus={e => (e.target.style.boxShadow = '0 0 0 3px rgba(13,122,111,0.18)')}
                  onBlur={e => (e.target.style.boxShadow = 'none')}
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="btn-primary w-full justify-center"
              >
                <Send size={15} /> Send Message
              </motion.button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
