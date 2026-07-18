import Reveal from './Reveal';

export default function FinalCTA() {
  const scrollToForm = () => {
    document.getElementById('audit-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <h2 className="text-heading text-3xl sm:text-4xl font-semibold tracking-tightish leading-snug">
            Ready to see what's actually possible?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-body text-lg leading-relaxed">
            The audit takes less than 30 minutes of your time and gives you a clear picture of where
            automation fits — or doesn't.
          </p>
          <div className="mt-10">
            <button
              onClick={scrollToForm}
              className="rounded-lg bg-accent px-8 py-4 text-[15px] font-medium text-white transition-colors duration-200 hover:bg-accent-soft"
            >
              Request an Automation Audit
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
