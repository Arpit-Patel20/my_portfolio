import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Linkedin, Github, Send, Phone, CheckCircle, AlertCircle, Loader } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const contacts = [
  {
    icon: <Mail size={16} />,
    label: 'Email',
    value: 'arpit.patel.gis@gmail.com',
    href: 'mailto:arpit.patel.gis@gmail.com',
  },
  {
    icon: <Phone size={16} />,
    label: 'Phone',
    value: '(368) 887-1315',
    href: 'tel:+13688871315',
  },
  {
    icon: <Linkedin size={16} />,
    label: 'LinkedIn',
    value: 'linkedin.com/in/arpit-patel',
    href: 'https://www.linkedin.com/in/arpit-patel-53b68a254',
  },
  {
    icon: <Github size={16} />,
    label: 'GitHub',
    value: 'github.com/Arpit-Patel20',
    href: 'https://github.com/Arpit-Patel20',
  },
];

export default function Contact() {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [formData, setFormData] = useState({ name: '', organisation: '', email: '', message: '' });

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

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('https://formspree.io/f/mjglnrve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          organisation: formData.organisation,
          email: formData.email,
          message: formData.message,
        }),
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', organisation: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const inputStyle = {
    background: 'rgba(255,255,255,0.15)',
    border: '1px solid rgba(255,255,255,0.30)',
    color: 'var(--text)',
  };

  const lightInputStyle = {
    background: 'rgba(255,255,255,0.7)',
    border: '1px solid rgba(0,0,0,0.1)',
    color: '#111',
  };

  return (
    <section id="contact" ref={sectionRef} className="section">
      <div className="container-tight">
        <div className="text-center mb-10 md:mb-12 px-2">
          <span className="eyebrow">Let's Connect</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl mt-3" style={{ fontStyle: 'italic' }}>
            Get in Touch
          </h2>
          <p className="mt-3 text-sm sm:text-base max-w-md mx-auto" style={{ color: 'var(--text-2)' }}>
            Open to GIS Analyst roles in Municipal, Environmental, and Utility GIS. Have an opportunity? Let's talk.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-stretch">

          {/* ── Left: contact info ── */}
          <div ref={leftRef} className="card p-5 sm:p-7 space-y-3 sm:space-y-4 h-full">
            {contacts.map(({ icon, label, value, href }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ x: 4 }}
                className="flex items-center gap-3 sm:gap-4 p-3 sm:p-3.5 rounded-xl transition-colors group"
                style={{ border: '1px solid rgba(255,255,255,0.35)', background: 'rgba(255,255,255,0.12)' }}
              >
                <div
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                  style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}
                >
                  {icon}
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] sm:text-[11px] font-medium mb-0.5" style={{ color: 'var(--text-4)' }}>
                    {label}
                  </p>
                  <p className="text-xs sm:text-sm font-medium truncate" style={{ color: 'var(--text)' }}>
                    {value}
                  </p>
                </div>
              </motion.a>
            ))}

            {/* Availability badge */}
            <div
              className="mt-2 p-3 sm:p-4 rounded-xl flex items-center gap-3"
              style={{ background: 'rgba(13,122,111,0.06)', border: '1px solid rgba(13,122,111,0.10)' }}
            >
              <span className="flex-shrink-0">
                <span className="relative flex w-2 h-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ background: 'var(--accent)' }} />
                  <span className="relative inline-flex w-2 h-2 rounded-full" style={{ background: 'var(--accent)' }} />
                </span>
              </span>
              <p className="text-xs sm:text-sm" style={{ color: 'var(--accent)' }}>
                Currently <strong>available</strong> for full-time GIS Analyst roles — Municipal GIS, Environmental GIS,
                Asset Management, and Infrastructure Mapping.
              </p>
            </div>
          </div>

          {/* ── Right: form ── */}
          <div ref={rightRef} className="card p-5 sm:p-7 h-full">
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center gap-4 py-10"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(13,122,111,0.12)', color: 'var(--accent)' }}
                >
                  <CheckCircle size={32} />
                </div>
                <div>
                  <p className="text-lg font-semibold" style={{ color: 'var(--text)' }}>Message Sent!</p>
                  <p className="text-sm mt-1" style={{ color: 'var(--text-2)' }}>
                    Thanks for reaching out — I'll get back to you soon.
                  </p>
                </div>
                <button
                  onClick={() => setStatus('idle')}
                  className="text-xs underline underline-offset-2 mt-2"
                  style={{ color: 'var(--text-3)' }}
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form className="space-y-3 sm:space-y-4" onSubmit={handleSubmit}>

                {/* Name + Organisation */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {[
                    { label: 'Your Name', name: 'name', placeholder: 'Jane Smith', type: 'text' },
                    { label: 'Organisation', name: 'organisation', placeholder: 'Acme GIS Ltd', type: 'text' },
                  ].map((f) => (
                    <div key={f.name}>
                      <label className="block text-[10px] sm:text-xs font-medium mb-1.5" style={{ color: 'var(--text-3)' }}>
                        {f.label}
                      </label>
                      <input
                        type={f.type}
                        name={f.name}
                        value={formData[f.name]}
                        onChange={handleChange}
                        placeholder={f.placeholder}
                        required
                        className="w-full px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm outline-none transition-shadow"
                        style={inputStyle}
                        onFocus={(e) => (e.target.style.boxShadow = '0 0 0 3px rgba(13,122,111,0.18)')}
                        onBlur={(e) => (e.target.style.boxShadow = 'none')}
                      />
                    </div>
                  ))}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[10px] sm:text-xs font-medium mb-1.5" style={{ color: 'var(--text-3)' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="jane@company.com"
                    required
                    className="w-full px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm outline-none transition-shadow"
                    style={lightInputStyle}
                    onFocus={(e) => (e.target.style.boxShadow = '0 0 0 3px rgba(13,122,111,0.18)')}
                    onBlur={(e) => (e.target.style.boxShadow = 'none')}
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-[10px] sm:text-xs font-medium mb-1.5" style={{ color: 'var(--text-3)' }}>
                    Message
                  </label>
                  <textarea
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe the opportunity or project..."
                    required
                    className="w-full px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm outline-none transition-shadow resize-none"
                    style={lightInputStyle}
                    onFocus={(e) => (e.target.style.boxShadow = '0 0 0 3px rgba(13,122,111,0.18)')}
                    onBlur={(e) => (e.target.style.boxShadow = 'none')}
                  />
                </div>

                {/* Error banner */}
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-3 rounded-xl text-xs"
                    style={{ background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.20)', color: '#f87171' }}
                  >
                    <AlertCircle size={14} />
                    Something went wrong. Please try again or email me directly.
                  </motion.div>
                )}

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={status === 'loading'}
                  whileHover={status !== 'loading' ? { scale: 1.02, y: -1 } : {}}
                  whileTap={status !== 'loading' ? { scale: 0.97 } : {}}
                  className="btn-primary w-full justify-center"
                  style={{ opacity: status === 'loading' ? 0.7 : 1 }}
                >
                  {status === 'loading'
                    ? <><Loader size={15} className="animate-spin" /> Sending…</>
                    : <><Send size={15} /> Send Message</>
                  }
                </motion.button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
