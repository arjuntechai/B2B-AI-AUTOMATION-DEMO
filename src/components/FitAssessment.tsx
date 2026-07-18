import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import Reveal, { EASE } from './Reveal';

const forYou = [
  'Your team spends hours on work that follows a pattern',
  'You use multiple tools that don\'t talk to each other',
  'You want to understand what\'s possible before committing to anything',
  'You\'re a founder or operator who values clarity over hype',
  'You have real workflows, real data, and real inefficiencies',
];

const notForYou = [
  'You\'re looking for a quick fix or a magic button',
  'You\'re exploring AI as a hobby or side experiment',
  'You expect results without process or collaboration',
  'You want someone to hand you a tool and disappear',
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

export default function FitAssessment() {
  return (
    <section className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mb-12 text-center">
          <p className="mb-3 text-xs uppercase tracking-widest text-accent/80">Honest Fit Assessment</p>
          <h2 className="text-heading text-3xl sm:text-4xl font-semibold tracking-tightish">
            Who this is for — and who it isn't.
          </h2>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          {/* For you */}
          <Reveal>
            <div className="h-full rounded-2xl border border-line bg-ink-700 p-8 transition-colors duration-200 hover:border-accent/40">
              <h3 className="text-heading text-lg font-medium mb-6">This is for you if:</h3>
              <motion.ul
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
                className="space-y-4"
              >
                {forYou.map((point) => (
                  <motion.li key={point} variants={item} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2.5} />
                    <span className="text-body text-[15px] leading-relaxed">{point}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </Reveal>

          {/* Not for you */}
          <Reveal delay={0.1}>
            <div className="h-full rounded-2xl border border-line bg-ink-700 p-8 transition-colors duration-200 hover:border-line/80">
              <h3 className="text-heading text-lg font-medium mb-6">This probably isn't for you if:</h3>
              <motion.ul
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
                className="space-y-4"
              >
                {notForYou.map((point) => (
                  <motion.li key={point} variants={item} className="flex items-start gap-3">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-muted" strokeWidth={2.5} />
                    <span className="text-muted text-[15px] leading-relaxed">{point}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
