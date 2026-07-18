import { Check } from 'lucide-react';
import Reveal from './Reveal';
import { UnderlinedEyebrow } from './FitAssessment';

const bullets = [
  'No tools or platforms pushed on you',
  'Findings are yours to keep regardless of next steps',
  'Designed to give you clarity, not create dependency',
];

export default function AuditOffer() {
  return (
    <section className="px-6 py-24 sm:py-32 bg-ink-800">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <div className="rounded-2xl border border-line bg-ink-700/60 p-10 sm:p-14 text-center">
            <UnderlinedEyebrow text="Free Automation Audit" />
            <h2 className="mt-2 text-heading text-2xl sm:text-3xl font-semibold tracking-tightish leading-snug">
              See where your operations are losing time — before you commit to anything.
            </h2>

            <div className="mx-auto mt-6 max-w-2xl space-y-4 text-left">
              <p className="text-body text-[15px] leading-relaxed">
                The audit is a structured review of your current workflows. We look at how work moves
                through your business, where manual effort is concentrated, and where automation could
                realistically reduce friction.
              </p>
              <p className="text-body text-[15px] leading-relaxed">
                You'll leave with a clear picture of what's possible and what it would take — whether
                or not we work together afterward.
              </p>
            </div>

            <ul className="mx-auto mt-8 max-w-md space-y-3 text-left">
              {bullets.map((b) => (
                <li key={b} className="flex items-center gap-3">
                  <Check className="h-4 w-4 shrink-0 text-accent" strokeWidth={2.5} />
                  <span className="text-heading text-[15px]">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
