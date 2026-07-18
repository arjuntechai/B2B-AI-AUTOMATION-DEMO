import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Reveal from './Reveal';
import { UnderlinedEyebrow } from './FitAssessment';

const steps = [
  {
    n: '01',
    title: 'Understand the current system',
    desc: 'We start by mapping how work actually moves through your business — tools, handoffs, decisions, and all the manual steps in between.',
  },
  {
    n: '02',
    title: 'Identify bottlenecks and waste',
    desc: 'We look for patterns: repeated tasks, error-prone handoffs, delays caused by waiting on information that could be automatic.',
  },
  {
    n: '03',
    title: 'Design practical automations',
    desc: 'We propose specific, buildable solutions — not theoretical frameworks. Each recommendation is scoped to your actual environment.',
  },
  {
    n: '04',
    title: 'Decide together what makes sense',
    desc: 'You review the findings. There\'s no pressure to proceed. The audit has value regardless of what you choose to do next.',
  },
];

function StepCircle({ n, delay, sizeClass = "h-11 w-11 mb-6 text-sm" }: { n: string; delay: number; sizeClass?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ backgroundColor: 'rgba(10, 10, 10, 0)', borderColor: '#242424', color: '#4A6FA5' }}
      animate={inView ? {
        backgroundColor: '#4A6FA5',
        borderColor: '#4A6FA5',
        color: '#FFFFFF'
      } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`flex items-center justify-center rounded-full border font-medium relative z-10 ${sizeClass}`}
    >
      {n}
    </motion.div>
  );
}

export default function HowItWorks() {
  return (
    <section className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <UnderlinedEyebrow text="The Process" />
          <Reveal>
            <h2 className="text-heading text-3xl sm:text-4xl font-semibold tracking-tightish">
              Four steps. No surprises.
            </h2>
          </Reveal>
        </div>

        {/* Horizontal stepper on desktop */}
        <div className="hidden md:grid grid-cols-4 gap-0 relative">
          {/* connecting line */}
          <div className="absolute top-[22px] left-0 right-0 h-px bg-line" aria-hidden />
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08} className="relative px-5">
              <StepCircle n={s.n} delay={i * 0.12} />
              <h3 className="text-heading text-base font-medium mb-2.5">{s.title}</h3>
              <p className="text-body text-sm leading-relaxed">{s.desc}</p>
            </Reveal>
          ))}
        </div>

        {/* Vertical timeline on mobile */}
        <div className="md:hidden space-y-8 relative pl-6">
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-line" aria-hidden />
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.06}>
              <div className="relative">
                <div className="absolute -left-6 top-0">
                  <StepCircle n={s.n} delay={i * 0.08} sizeClass="h-10 w-10 text-xs" />
                </div>
                <h3 className="text-heading text-base font-medium mb-2 mt-1">{s.title}</h3>
                <p className="text-body text-sm leading-relaxed">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
