import { motion } from 'framer-motion';
import Reveal, { EASE } from './Reveal';

const stats = [
  { value: '7+', label: 'Years working with business systems and data infrastructure' },
  { value: '40+', label: 'Automations currently running in production environments' },
  { value: '6', label: 'Industries served including finance, logistics, and professional services' },
  { value: '100%', label: 'Of engagements begin with a no-commitment audit' },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export default function Credibility() {
  return (
    <section className="border-y border-line bg-ink-800 px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl">
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
          {stats.map((s) => (
            <motion.div key={s.value} variants={item} className="text-center">
              <div className="text-heading text-4xl sm:text-5xl font-semibold tracking-tightish mb-3">
                {s.value}
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
