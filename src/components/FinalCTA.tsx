import { motion } from 'framer-motion';
import Reveal from './Reveal';
import Magnetic from './Magnetic';

export default function FinalCTA() {
  const scrollToForm = () => {
    document.getElementById('audit-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden px-6 py-28 sm:py-36">
      {/* Drifting Accent Orb (Warm Amber) */}
      <motion.div
        aria-hidden
        animate={{
          x: [0, -40, 30, 0],
          y: [0, 40, -30, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
        className="pointer-events-none absolute -top-10 -right-20 h-[320px] w-[320px] rounded-full bg-[#F59E0B]/3 filter blur-[90px]"
      />

      <div className="relative mx-auto max-w-3xl text-center z-10">
        <Reveal>
          <h2 className="text-heading text-3xl sm:text-4xl font-semibold tracking-tightish leading-snug">
            Ready to see what's actually possible?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-body text-lg leading-relaxed">
            The audit takes less than 30 minutes of your time and gives you a clear picture of where
            automation fits — or doesn't.
          </p>
          <div className="mt-10">
            <Magnetic>
              <button
                onClick={scrollToForm}
                className="rounded-lg bg-accent px-8 py-4 text-[15px] font-medium text-white transition-colors duration-200 hover:bg-accent-soft"
              >
                Request an Automation Audit
              </button>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
