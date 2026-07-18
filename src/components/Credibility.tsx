import { useEffect, useRef, useState } from 'react';
import { motion, animate, useInView } from 'framer-motion';
import Reveal, { EASE } from './Reveal';

const stats = [
  { value: 7, suffix: '+', label: 'Years working with business systems and data infrastructure' },
  { value: 40, suffix: '+', label: 'Automations currently running in production environments' },
  { value: 6, suffix: '', label: 'Industries served including finance, logistics, and professional services' },
  { value: 100, suffix: '%', label: 'Of engagements begin with a no-commitment audit' },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (inView) {
      const controls = animate(0, value, {
        duration: 1.2,
        ease: 'easeOut',
        onUpdate: (latest) => {
          setDisplayValue(Math.round(latest));
        },
      });
      return () => controls.stop();
    }
  }, [inView, value]);

  return <span ref={ref}>{displayValue}</span>;
}

export default function Credibility() {
  return (
    <section className="relative overflow-hidden border-y border-line bg-ink-800 px-6 py-24 sm:py-28">
      {/* Drifting Accent Orb 3 (Accent Blue/Amber glow combination) */}
      <motion.div
        aria-hidden
        animate={{
          x: [0, 30, -30, 0],
          y: [0, -40, 40, 0],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
        className="pointer-events-none absolute -bottom-20 -left-10 h-[300px] w-[300px] rounded-full bg-accent/6 filter blur-[80px]"
      />

      <div className="relative mx-auto max-w-6xl z-10">
        <Reveal className="mb-14 text-center">
          <h2 className="text-body text-xl sm:text-2xl font-light tracking-tightish">
            Built on operational experience, not theory.
          </h2>
        </Reveal>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-2 gap-8 sm:gap-12 lg:grid-cols-4"
        >
          {stats.map((s, idx) => (
            <motion.div key={idx} variants={item} className="text-center">
              <div className="text-heading text-4xl sm:text-5xl font-semibold tracking-tightish mb-3">
                <Counter value={s.value} />
                {s.suffix}
              </div>
              <p className="text-muted text-sm leading-relaxed max-w-[200px] mx-auto">
                {s.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Partner blocks */}
        <Reveal delay={0.15} className="mt-16">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="partner-shimmer h-14 rounded-lg border border-line flex items-center justify-center"
              >
                <span className="text-[10px] uppercase tracking-widest text-muted/70">Partner</span>
              </div>
            ))}
          </div>
          <p className="mt-5 text-center text-muted text-xs italic">
            (Client logos available upon request — we respect confidentiality)
          </p>
        </Reveal>
      </div>
    </section>
  );
}
