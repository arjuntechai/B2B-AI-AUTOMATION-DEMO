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

        {/* System Snapshots */}
        <Reveal delay={0.15} className="mt-20">
          <h3 className="text-center text-xs uppercase tracking-widest text-muted mb-8">
            Anonymized System Snapshots
          </h3>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                industry: 'Logistics',
                outcome: 'Custom OCR & ERP Sync',
                desc: 'Reduced manual invoice data entry from 14 minutes to 12 seconds per document.',
              },
              {
                industry: 'Finance & Fintech',
                outcome: 'Compliance Automations',
                desc: 'Automated end-of-month reconciliations across 3 external banking API partners.',
              },
              {
                industry: 'Professional Services',
                outcome: 'Client Onboarding Pipeline',
                desc: 'Instantly triggers custom contract drafting and CRM pipeline updates upon sign-off.',
              },
              {
                industry: 'E-Commerce',
                outcome: 'Inventory Reconciliation',
                desc: 'Synchronized real-time inventory counts between warehouse CMS and storefront.',
              },
            ].map((snap, idx) => (
              <CredibilityCard key={idx}>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-accent font-semibold mb-2">
                    {snap.industry}
                  </div>
                  <h4 className="text-heading text-sm font-medium mb-1.5">{snap.outcome}</h4>
                  <p className="text-muted text-xs leading-relaxed">{snap.desc}</p>
                </div>
              </CredibilityCard>
            ))}
          </div>
          <p className="mt-8 text-center text-muted text-xs italic">
            (Client names and detailed architectures are protected under strict NDA)
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function CredibilityCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ref.current.style.setProperty('--mouse-x', `${x}px`);
    ref.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className="spotlight-card rounded-xl border border-line bg-ink-700/60 p-6 flex flex-col justify-between text-left transition-all duration-200 hover:-translate-y-[2px] hover:border-accent/40"
    >
      {children}
    </div>
  );
}
