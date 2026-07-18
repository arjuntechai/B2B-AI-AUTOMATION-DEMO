import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { EASE } from './Reveal';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToForm = () => {
    document.getElementById('audit-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'bg-ink-900/80 backdrop-blur-md border-b border-line'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8 h-16 flex items-center justify-between">
        <a href="#top" className="group flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-md border border-accent/40 text-accent text-xs font-semibold tracking-tightish">
            M
          </span>
          <span className="text-heading text-sm font-medium tracking-wide">
            Meridian Systems
          </span>
        </a>
        <button
          onClick={scrollToForm}
          className="rounded-md border border-line px-4 py-2 text-sm text-body transition-colors duration-200 hover:border-accent/60 hover:text-heading"
        >
          Request an Audit
        </button>
      </div>
    </motion.header>
  );
}
