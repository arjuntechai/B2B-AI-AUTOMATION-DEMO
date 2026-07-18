import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Reveal from './Reveal';

const steps = [
  {
    n: '01',
    title: 'Confirmation sent',
    desc: "You'll receive an email confirming we received your request. No action needed on your end.",
  },
  {
    n: '02',
    title: 'Short intro call (30 min)',
    desc: "We schedule a brief call to understand your business and what you're dealing with. This is a conversation, not a pitch.",
  },
  {
    n: '03',
    title: 'Audit & findings',
    desc: 'We review your workflows and prepare a clear summary of automation opportunities, effort levels, and realistic outcomes.',
  },
  {
    n: '04',
    title: 'You decide',
    desc: "We share the findings. You decide what, if anything, to do next. There's no pressure and no follow-up sales sequence.",
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

export default function WhatHappensNext() {
  return (
    <section className="px-6 py-24 sm:py-32 bg-ink-800">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-14 text-center">
          <h2 className="text-heading text-3xl sm:text-4xl font-semibold tracking-tightish">
            Here's exactly what happens after you submit.
          </h2>
        </Reveal>

        {/* Horizontal flow on desktop */}
        <div className="hidden md:grid grid-cols-4 gap-0 relative">
          <div className="absolute top-[22px] left-0 right-0 h-px bg-line" aria-hidden />
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08} className="relative px-5">
              <StepCircle n={s.n} delay={i * 0.12} />
              <h3 className="text-heading text-base font-medium mb-2.5">{s.title}</h3>
              <p className="text-body text-sm leading-relaxed">{s.desc}</p>
            </Reveal>
          ))}
        </div>

        {/* Vertical on mobile */}
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
