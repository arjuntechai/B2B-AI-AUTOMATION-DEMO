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
  const [step, setStep] = useState(1);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      fullName: '',
      email: '',
      company: '',
      industry: '',
      bottleneck: '',
    }
  });

  const watched = watch();

  const onSubmit = async (data: FormValues) => {
    // Simulate API delay
    await new Promise((r) => setTimeout(r, 800));
    void data;
    setSubmitted(true);
  };

  const registerField = (name: keyof FormValues, validation?: any) => {
    const { onBlur: rOnBlur, ...rRest } = register(name, validation);
    return {
      onFocus: () => setFocusedField(name),
      onBlur: (e: any) => {
        setFocusedField(null);
        rOnBlur(e);
      },
      ...rRest,
    };
  };

  const getLabelClass = (fieldName: keyof FormValues) => {
    const active = focusedField === fieldName || !!watched[fieldName];
    return `absolute transition-all duration-200 pointer-events-none px-1.5 z-10 ${
      active
        ? '-top-2.5 left-3 text-xs text-accent bg-[#141414]'
        : 'top-3.5 left-4 text-[15px] text-muted'
    }`;
  };

  const fieldClass = (hasError: boolean) =>
    `field-input w-full rounded-lg px-4 py-3 text-[15px] text-heading placeholder:text-muted ${
      hasError ? 'border-red-500/60' : ''
    }`;

  const bottleneckVal = watched.bottleneck || '';
  const charCount = bottleneckVal.length;
  const isOver80 = charCount >= 400;

  const bottleneckOptions = [
    {
      id: 'integration',
      title: "Systems don't talk to each other",
      desc: "CRMs, sheets, and legacy tools aren't synced, forcing manual transfers.",
    },
    {
      id: 'copy-paste',
      title: "Manual copy-pasting & data entry",
      desc: "Team spends hours keying in data, extracting PDFs, or matching records.",
    },
    {
      id: 'onboarding',
      title: "Slow, manual client onboarding",
      desc: "Creating documents, setting up accounts, and sending emails takes too long.",
    },
    {
      id: 'custom',
      title: "Other operational bottleneck",
      desc: "A custom workflow bottleneck unique to our operational structure.",
    },
  ];

  const handleSelectBottleneck = (opt: typeof bottleneckOptions[0]) => {
    if (opt.id !== 'custom') {
      setValue('bottleneck', opt.title);
    } else {
      setValue('bottleneck', '');
    }
    setStep(2);
  };

  return (
    <section id="audit-form" className="px-6 py-24 sm:py-32 scroll-mt-24">
      <div className="mx-auto max-w-form">
        <Reveal className="mb-8 text-center">
          <h2 className="text-heading text-3xl sm:text-4xl font-semibold tracking-tightish">
            Request Your Workflow Blueprint
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-body text-base leading-relaxed">
            Answer one quick question to help us map your workflows, then share your details to get your blueprint.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="rounded-2xl border border-line bg-ink-700 p-7 sm:p-9 overflow-hidden">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="confirmation"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center py-10 text-center"
                >
                  <motion.div
                    layoutId="submit-btn-morph"
                    className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-accent/40 bg-accent/10"
                  >
                    <Check className="h-6 w-6 text-accent" strokeWidth={2.5} />
                  </motion.div>
                  <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2, ease: EASE }}
                    className="max-w-sm text-heading text-lg font-medium leading-relaxed"
                  >
                    Blueprint request received. Check your inbox for a confirmation — we'll be in touch within one business day.
                  </motion.p>
                </motion.div>
              ) : (
                <motion.div key="form-container">
                  <AnimatePresence mode="wait">
                    {step === 1 ? (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.25, ease: EASE }}
                        className="space-y-6"
                      >
                        <div className="text-center mb-6">
                          <span className="text-xs font-semibold tracking-widest text-accent uppercase">Step 1 of 2</span>
                          <h3 className="text-heading text-lg font-medium mt-1">Select your primary bottleneck</h3>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                          {bottleneckOptions.map((opt) => (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => handleSelectBottleneck(opt)}
                              className="spotlight-card group rounded-xl border border-line bg-ink-600/50 p-5 text-left transition-all duration-200 hover:-translate-y-[2px] hover:border-accent/40 focus:outline-none focus:border-accent"
                            >
                              <h4 className="text-heading text-sm font-semibold mb-1 group-hover:text-accent transition-colors">
                                {opt.title}
                              </h4>
                              <p className="text-muted text-xs leading-relaxed">{opt.desc}</p>
                            </button>
                          ))}
                        </div>
                        <p className="text-center text-xs text-muted mt-4">
                          Select an option to proceed to the next step.
                          </p>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.25, ease: EASE }}
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate
                        className="space-y-6"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="text-xs text-muted hover:text-accent transition-colors flex items-center gap-1 font-medium"
                          >
                            ← Back to Step 1
                          </button>
                          <span className="text-xs font-semibold tracking-widest text-accent uppercase">Step 2 of 2</span>
                        </div>

                        {/* Full Name */}
                        <div className="relative">
                          <input
                            id="fullName"
                            type="text"
                            placeholder=" "
                            className={fieldClass(!!errors.fullName)}
                            {...registerField('fullName', { required: 'Please enter your full name.' })}
                          />
                          <label htmlFor="fullName" className={getLabelClass('fullName')}>
                            Full Name
                          </label>
                          {errors.fullName && (
                            <p className="mt-1.5 text-xs text-red-400">{errors.fullName.message}</p>
                          )}
                        </div>

                        {/* Email */}
                        <div className="relative">
                          <input
                            id="email"
                            type="email"
                            placeholder=" "
                            className={fieldClass(!!errors.email)}
                            {...registerField('email', {
                              required: 'Please enter your email address.',
                              pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'Please enter a valid email address.',
                              },
                            })}
                          />
                          <label htmlFor="email" className={getLabelClass('email')}>
                            Email Address
                          </label>
                          {errors.email && (
                            <p className="mt-1.5 text-xs text-red-400">{errors.email.message}</p>
                          )}
                        </div>

                        {/* Company */}
                        <div className="relative">
                          <input
                            id="company"
                            type="text"
                            placeholder=" "
                            className={fieldClass(!!errors.company)}
                            {...registerField('company', { required: 'Please enter your company name.' })}
                          />
                          <label htmlFor="company" className={getLabelClass('company')}>
                            Company Name
                          </label>
                          {errors.company && (
                            <p className="mt-1.5 text-xs text-red-400">{errors.company.message}</p>
                          )}
                        </div>

                        {/* Industry */}
                        <div className="relative">
                          <select
                            id="industry"
                            className={fieldClass(!!errors.industry)}
                            {...registerField('industry', { required: 'Please select your industry.' })}
                          >
                            <option value="" disabled className="text-muted"></option>
                            {industries.map((ind) => (
                              <option key={ind} value={ind} className="bg-ink-700">
                                {ind}
                              </option>
                            ))}
                          </select>
                          <label htmlFor="industry" className={getLabelClass('industry')}>
                            Industry
                          </label>
                          {errors.industry && (
                            <p className="mt-1.5 text-xs text-red-400">{errors.industry.message}</p>
                          )}
                        </div>

                        {/* Bottleneck */}
                        <div className="relative">
                          <textarea
                            id="bottleneck"
                            rows={3}
                            placeholder=" "
                            maxLength={500}
                            className={`${fieldClass(false)} resize-none`}
                            {...registerField('bottleneck')}
                          />
                          <label htmlFor="bottleneck" className={getLabelClass('bottleneck')}>
                            Describe the bottleneck in more detail (optional)
                          </label>
                          <div className="mt-1.5 flex justify-between items-center text-xs">
                            <span />
                            <span className={isOver80 ? 'text-accent font-medium' : 'text-muted'}>
                              {charCount} / 500
                            </span>
                          </div>
                        </div>

                        <motion.button
                          layoutId="submit-btn-morph"
                          type="submit"
                          disabled={isSubmitting}
                          className="btn-sweep w-full rounded-lg bg-accent px-6 py-4 text-[15px] font-medium text-white transition-colors duration-200 hover:bg-accent-soft disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {isSubmitting ? 'Submitting…' : 'Get My Custom Blueprint'}
                        </motion.button>

                        <p className="text-center text-xs text-muted">
                          No sales pitch. No obligation. We'll send a confirmation to your email.
                        </p>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
