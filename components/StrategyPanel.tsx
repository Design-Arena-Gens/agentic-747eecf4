'use client';

import { SparklesIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import type { BrandProfile, CampaignGoal, ContentStrategy } from '@/lib/types';

interface StrategyPanelProps {
  strategy: ContentStrategy;
  profile: BrandProfile;
  goal: CampaignGoal;
  loading: boolean;
}

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.08 }
  })
};

export default function StrategyPanel({ strategy, profile, goal, loading }: StrategyPanelProps) {
  const list = strategy.narrativeArc;
  return (
    <motion.section
      className="glass gradient-ring relative h-full rounded-3xl p-6"
      initial="hidden"
      animate={loading ? 'hidden' : 'visible'}
    >
      <header className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-200/80">Narrative architecture</p>
          <h2 className="font-display text-2xl text-white">Story spine</h2>
        </div>
        <SparklesIcon className="h-6 w-6 text-brand-200" />
      </header>

      <div className="mt-6 grid gap-4">
        {list.map((item, index) => (
          <motion.div
            key={item}
            className="rounded-2xl border border-white/10 bg-gradient-to-r from-white/8 to-white/2 p-4 text-sm text-slate-200"
            custom={index}
            variants={cardVariants}
          >
            {item}
          </motion.div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-brand-500/30 bg-brand-500/10 p-4 text-sm text-slate-100">
          <p className="text-xs uppercase tracking-widest text-brand-200/80">Experience pillars</p>
          <ul className="mt-2 space-y-1 text-sm text-slate-100">
            {strategy.experiencePillars.map((pillar) => (
              <li key={pillar}>• {pillar}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
          <p className="text-xs uppercase tracking-widest text-brand-200/70">Storytelling notes</p>
          <ul className="mt-2 space-y-1 text-sm">
            {strategy.storytellingNotes.map((note) => (
              <li key={note}>• {note}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
        <p className="text-xs uppercase tracking-[0.4em] text-brand-200/60">Hero signature</p>
        <p className="mt-1 font-display text-xl text-white">{strategy.heroOffer}</p>
        <p className="mt-3 text-xs text-slate-300">
          Engineered for {profile.brandName} to grow {goal.objective} KPIs across the next campaign wave.
        </p>
      </div>
    </motion.section>
  );
}
