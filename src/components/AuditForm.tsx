import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import Reveal, { EASE } from './Reveal';

type FormValues = {
  fullName: string;
  email: string;
  company: string;
  industry: string;
  bottleneck: string;
};

const industries = [
  'Technology',
  'Finance',
  'Logistics & Supply Chain',
  'Professional Services',
  'E-Commerce',
  'Healthcare',
  'Real Estate',
  'Other',
];

export default function AuditForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    // ──────────────────────────────────────────────────────────────
    // EMAIL SERVICE INTEGRATION POINT
    // Send the confirmation + notification email here using a service
    // such as Resend, Postmark, or Formspree. Example (Resend):
    //
    //   await fetch('https://api.resend.com/emails', {
    //     method: 'POST',
    //     headers: {
    //       Authorization: `Bearer ${import.meta.env.VITE_RESEND_API_KEY}`,
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       from: 'hello@meridiansystems.io',
    //       to: data.email,
    //       subject: 'Audit request received — Meridian Systems',
    //       text: `Hi ${data.fullName}, we received your audit request...`,
    //     }),
    //   });
    //
    // Also persist the lead to your CRM / database at this point.
    // For now we simulate the async send with a short delay.
    // ──────────────────────────────────────────────────────────────
    await new Promise((r) => setTimeout(r, 600));
    void data; // referenced for clarity; `data` is the validated payload.
    setSubmitted(true);
  };

  const fieldClass = (hasError: boolean) =>
    `field-input w-full rounded-lg px-4 py-3 text-[15px] text-heading placeholder:text-muted ${
      hasError ? 'border-red-500/60' : ''
    }`;

  return (
    <section id="audit-form" className="px-6 py-24 sm:py-32 scroll-mt-20">
      <div className="mx-auto max-w-form">
        <Reveal className="mb-8 text-center">
          <h2 className="text-heading text-3xl sm:text-4xl font-semibold tracking-tightish">
            Request Your Free Audit
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-body text-base leading-relaxed">
            Fill in a few details and we'll reach out within one business day to schedule a short intro call.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="rounded-2xl border border-line bg-ink-700 p-7 sm:p-9">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="confirmation"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="flex flex-col items-center py-10 text-center"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-accent/40 bg-accent/10">
                    <Check className="h-6 w-6 text-accent" strokeWidth={2.5} />
                  </div>
                  <p className="max-w-sm text-heading text-lg font-medium leading-relaxed">
                    Request received. Check your inbox for a confirmation — we'll be in touch within one
                    business day.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  className="space-y-5"
                >
                  {/* Full Name */}
                  <div>
                    <label htmlFor="fullName" className="mb-1.5 block text-sm text-body">
                      Full Name
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      placeholder="Jane Doe"
                      className={fieldClass(!!errors.fullName)}
                      {...register('fullName', { required: 'Please enter your full name.' })}
                    />
                    {errors.fullName && (
                      <p className="mt-1.5 text-xs text-red-400">{errors.fullName.message}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-sm text-body">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="jane@company.com"
                      className={fieldClass(!!errors.email)}
                      {...register('email', {
                        required: 'Please enter your email address.',
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: 'Please enter a valid email address.',
                        },
                      })}
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-red-400">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Company */}
                  <div>
                    <label htmlFor="company" className="mb-1.5 block text-sm text-body">
                      Company Name
                    </label>
                    <input
                      id="company"
                      type="text"
                      placeholder="Acme Co."
                      className={fieldClass(!!errors.company)}
                      {...register('company', { required: 'Please enter your company name.' })}
                    />
                    {errors.company && (
                      <p className="mt-1.5 text-xs text-red-400">{errors.company.message}</p>
                    )}
                  </div>

                  {/* Industry */}
                  <div>
                    <label htmlFor="industry" className="mb-1.5 block text-sm text-body">
                      Industry
                    </label>
                    <select
                      id="industry"
                      defaultValue=""
                      className={fieldClass(!!errors.industry)}
                      {...register('industry', { required: 'Please select your industry.' })}
                    >
                      <option value="" disabled>
                        Select an industry
                      </option>
                      {industries.map((ind) => (
                        <option key={ind} value={ind} className="bg-ink-700">
                          {ind}
                        </option>
                      ))}
                    </select>
                    {errors.industry && (
                      <p className="mt-1.5 text-xs text-red-400">{errors.industry.message}</p>
                    )}
                  </div>

                  {/* Bottleneck */}
                  <div>
                    <label htmlFor="bottleneck" className="mb-1.5 block text-sm text-body">
                      What's your biggest operational bottleneck right now?{' '}
                      <span className="text-muted">(optional)</span>
                    </label>
                    <textarea
                      id="bottleneck"
                      rows={4}
                      placeholder="e.g., We manually reconcile orders every week, or our CRM and billing tool don't sync"
                      className={`${fieldClass(false)} resize-none`}
                      {...register('bottleneck')}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-lg bg-accent px-6 py-4 text-[15px] font-medium text-white transition-colors duration-200 hover:bg-accent-soft disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? 'Submitting…' : 'Submit Audit Request'}
                  </button>

                  <p className="text-center text-xs text-muted">
                    No sales pitch. No obligation. We'll send a confirmation to your email.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
