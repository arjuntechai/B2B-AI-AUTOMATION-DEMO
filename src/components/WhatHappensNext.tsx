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
              <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-full border border-line bg-ink-900 text-accent text-sm font-medium">
                {s.n}
              </div>
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
                <div className="absolute -left-6 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-ink-900 text-accent text-xs font-medium">
                  {s.n}
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
