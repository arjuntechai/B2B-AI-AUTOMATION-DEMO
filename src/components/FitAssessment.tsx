import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
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

export function UnderlinedEyebrow({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <div ref={ref} className="relative inline-block pb-2 mb-4">
      <p className="text-xs uppercase tracking-widest text-accent/80">{text}</p>
      <svg
        className="absolute bottom-0 left-0 w-full h-[2px]"
        fill="none"
        viewBox="0 0 100 2"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0,1 L100,1"
          stroke="#4A6FA5"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
        />
      </svg>
    </div>
  );
}

function SpotlightCard({ children, className }: { children: React.ReactNode; className: string }) {
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
      className={`spotlight-card rounded-2xl border border-line bg-ink-700 p-8 hover:-translate-y-[2px] hover:border-accent/40 transition-all duration-200 ${className}`}
    >
      <div className="relative z-10 h-full flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
}

export default function FitAssessment() {
  return (
    <section className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <UnderlinedEyebrow text="Honest Fit Assessment" />
          <Reveal>
            <h2 className="text-heading text-3xl sm:text-4xl font-semibold tracking-tightish">
              Who this is for — and who it isn't.
            </h2>
          </Reveal>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* For you */}
          <Reveal className="h-full">
            <SpotlightCard className="h-full">
              <div>
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
            </SpotlightCard>
          </Reveal>

          {/* Not for you */}
          <Reveal delay={0.1} className="h-full">
            <SpotlightCard className="h-full hover:border-accent/40">
              <div>
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
            </SpotlightCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
