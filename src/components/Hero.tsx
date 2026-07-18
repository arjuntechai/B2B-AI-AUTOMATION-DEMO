import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const scrollToForm = () => {
    document.getElementById('audit-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-16"
    >
      {/* Ambient accent glow — very subtle */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 35%, rgba(74,111,165,0.08), transparent 70%)',
        }}
      />

      <div className="relative mx-auto max-w-4xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="mb-8 text-xs uppercase tracking-widest text-accent/80"
        >
          Automation Systems · Designed Deliberately
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease }}
          className="text-heading text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-semibold leading-[1.08] tracking-tightish"
        >
          Your operations are more manual than they need to be.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18, ease }}
          className="mx-auto mt-7 max-w-2xl text-lg sm:text-[22px] leading-relaxed text-body"
        >
          We map how your business actually runs, find where time and effort are
          being lost, and design automation systems that fit the way your team
          works — not the other way around.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease }}
          className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-muted"
        >
          AI isn't a product you install. It's a system you build deliberately.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.42, ease }}
          className="mt-10"
        >
          <button
            onClick={scrollToForm}
            className="rounded-lg bg-accent px-8 py-4 text-[15px] font-medium text-white transition-colors duration-200 hover:bg-accent-soft"
          >
            Request an Automation Audit
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6, ease }}
          className="mx-auto mt-14 flex max-w-3xl flex-col items-center justify-center gap-3 text-[11px] uppercase tracking-widest text-muted sm:flex-row sm:gap-0 sm:divide-x sm:divide-line"
        >
          <span className="px-4 text-center">7+ Years Working With Operational Systems</span>
          <span className="px-4 text-center">40+ Automations Running in Production</span>
          <span className="px-4 text-center">
            Industries: Finance · Logistics · Professional Services · E-Commerce
          </span>
        </motion.div>
      </div>
    </section>
  );
}
