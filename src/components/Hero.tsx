import { motion, useScroll, useTransform } from 'framer-motion';
import Magnetic from './Magnetic';

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const scrollToForm = () => {
    document.getElementById('audit-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const { scrollY } = useScroll();
  // Scroll parallax: headline moves down (slower than scroll), orbs move slower
  const headlineY = useTransform(scrollY, [0, 800], [0, -30]);
  const orb1Y = useTransform(scrollY, [0, 800], [0, -50]);
  const orb2Y = useTransform(scrollY, [0, 800], [0, -70]);

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-16"
    >
      {/* Drifting Accent Orb 1 (Accent Blue) */}
      <motion.div
        aria-hidden
        style={{ y: orb1Y }}
        animate={{
          x: [0, 40, -30, 0],
          y: [0, 50, -40, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
        className="pointer-events-none absolute -top-20 left-1/4 h-[350px] w-[350px] rounded-full bg-accent/8 filter blur-[80px]"
      />

      {/* Drifting Accent Orb 2 (Warm Amber) */}
      <motion.div
        aria-hidden
        style={{ y: orb2Y }}
        animate={{
          x: [0, -50, 40, 0],
          y: [0, -40, 50, 0],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
        className="pointer-events-none absolute top-1/4 right-1/4 h-[300px] w-[300px] rounded-full bg-[#F59E0B]/4 filter blur-[90px]"
      />

      <div className="relative mx-auto max-w-4xl text-center z-10">
        {/* Eyebrow Label with drawing Underline */}
        <div className="relative inline-block mb-10">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="text-xs uppercase tracking-widest text-accent/80 pb-2"
          >
            OPERATIONS INFRASTRUCTURE
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.25, ease }}
            style={{ transformOrigin: 'left' }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1.5px] w-8 bg-accent"
          />
        </div>

        {/* Headline with Parallax & Line-by-line reveal */}
        <motion.h1
          style={{ y: headlineY }}
          className="text-heading text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-semibold leading-[1.12] tracking-tightish"
        >
          {/* Line 1 */}
          <span className="block overflow-hidden py-1.5">
            <motion.span
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
              className="block"
            >
              Your operations are
            </motion.span>
          </span>
          {/* Line 2 with Gradient on key phrase */}
          <span className="block overflow-hidden py-1.5">
            <motion.span
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.16, ease }}
              className="block bg-gradient-to-r from-heading via-[#C0C0C0] to-accent bg-clip-text text-transparent"
            >
              losing valuable time.
            </motion.span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.32, ease }}
          className="mx-auto mt-8 max-w-2xl text-lg sm:text-[22px] leading-relaxed text-body"
        >
          Stop wasting hours on manual processes and disconnected systems. We map how your business actually runs, find where time is being lost, and build custom automation systems that run in the background.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.42, ease }}
          className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-muted"
        >
          No off-the-shelf software to learn. Built specifically to fit your team.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.52, ease }}
          className="mt-10"
        >
          <Magnetic>
            <button
              onClick={scrollToForm}
              className="rounded-lg bg-accent px-8 py-4 text-[15px] font-medium text-white transition-colors duration-200 hover:bg-accent-soft"
            >
              Request a Custom Workflow Blueprint
            </button>
          </Magnetic>
          <p className="mt-3 text-xs text-muted">
            30-minute intro call. Zero sales pitch, guaranteed.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.68, ease }}
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
