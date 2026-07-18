import Reveal from './Reveal';

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

export default function HowItWorks() {
  return (
    <section className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-14 text-center">
          <p className="mb-3 text-xs uppercase tracking-widest text-accent/80">The Process</p>
          <h2 className="text-heading text-3xl sm:text-4xl font-semibold tracking-tightish">
            Four steps. No surprises.
          </h2>
        </Reveal>

        {/* Horizontal stepper on desktop */}
        <div className="hidden md:grid grid-cols-4 gap-0 relative">
          {/* connecting line */}
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

        {/* Vertical timeline on mobile */}
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
