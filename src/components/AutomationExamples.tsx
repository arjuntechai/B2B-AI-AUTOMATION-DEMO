import { useRef } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  UserCheck,
  RefreshCw,
  BarChart3,
  UserPlus,
  PackageCheck,
} from 'lucide-react';
import Reveal, { EASE } from './Reveal';

const examples = [
  {
    icon: FileText,
    title: 'Invoice Processing',
    desc: 'Extracting, validating, and routing invoices without manual data entry',
  },
  {
    icon: UserCheck,
    title: 'Lead Routing & Qualification',
    desc: 'Automatically scoring and assigning inbound leads based on defined criteria',
  },
  {
    icon: RefreshCw,
    title: 'Data Sync Across Tools',
    desc: 'Keeping records consistent across CRMs, spreadsheets, and internal systems',
  },
  {
    icon: BarChart3,
    title: 'Report Generation',
    desc: 'Compiling operational data into structured reports on a schedule',
  },
  {
    icon: UserPlus,
    title: 'Client Onboarding Workflows',
    desc: 'Triggering document requests, task assignments, and communications automatically',
  },
  {
    icon: PackageCheck,
    title: 'Inventory & Order Reconciliation',
    desc: 'Matching purchase orders, receipts, and inventory counts without manual cross-referencing',
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

function ExampleCard({ icon: Icon, title, desc, variants }: { icon: any; title: string; desc: string; variants: any }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      variants={variants}
      className="spotlight-card group rounded-xl border border-line bg-ink-700 p-6 hover:-translate-y-[2px] hover:border-accent/40"
    >
      <div className="relative z-10">
        <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-ink-600 transition-colors duration-200 group-hover:border-accent/40">
          <Icon className="h-5 w-5 text-accent transition-transform duration-200 group-hover:translate-x-[2px]" strokeWidth={1.75} />
        </div>
        <h3 className="text-heading text-base font-medium mb-2">{title}</h3>
        <p className="text-body text-sm leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}

export default function AutomationExamples() {
  return (
    <section className="px-6 py-24 sm:py-32 bg-ink-800">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-14 text-center">
          <h2 className="text-heading text-3xl sm:text-4xl font-semibold tracking-tightish">
            What kinds of work get automated?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-body text-lg leading-relaxed">
            These are real examples from operational workflows — not demos or prototypes.
          </p>
        </Reveal>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {examples.map(({ icon, title, desc }) => (
            <ExampleCard
              key={title}
              icon={icon}
              title={title}
              desc={desc}
              variants={item}
            />
          ))}
        </motion.div>

        <Reveal delay={0.1} className="mt-10 text-center">
          <p className="text-muted text-sm italic">
            Every engagement starts with understanding your specific system. We don't apply templates.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
