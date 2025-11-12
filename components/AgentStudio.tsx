'use client';

import { useEffect, useState, useTransition } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { defaultBrandProfile, defaultCampaignGoal, runAgent } from '@/lib/strategy';
import type { AgentResponse, BrandProfile, CampaignGoal, ContentPost } from '@/lib/types';
import { PLATFORM_CTA } from '@/lib/constants';
import BrandProfileForm from './BrandProfileForm';
import CampaignGoalForm from './CampaignGoalForm';
import StrategyPanel from './StrategyPanel';
import ScheduleBoard from './ScheduleBoard';
import UpcomingPostList from './UpcomingPostList';

const shimmer = {
  animate: {
    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
    transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' }
  }
};

export default function AgentStudio() {
  const [profile, setProfile] = useState<BrandProfile>(defaultBrandProfile());
  const [goal, setGoal] = useState<CampaignGoal>({
    ...defaultCampaignGoal(),
    callToAction: PLATFORM_CTA.instagram
  });
  const [agentResponse, setAgentResponse] = useState<AgentResponse | null>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    startTransition(async () => {
      try {
        const res = await fetch('/api/generate', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load initial plan');
        const data = (await res.json()) as AgentResponse;
        setAgentResponse(data);
        setProfile(data.profile);
        setGoal(data.goal);
      } catch (err) {
        console.error(err);
        setError('Unable to fetch the launch blueprint. Adjust the inputs and retry.');
      }
    });
  }, []);

  const regenerate = (nextProfile: BrandProfile, nextGoal: CampaignGoal) => {
    setError(null);
    startTransition(async () => {
      try {
        const res = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ profile: nextProfile, goal: nextGoal })
        });
        if (!res.ok) throw new Error('Generation failed');
        const payload = (await res.json()) as AgentResponse;
        setAgentResponse(payload);
      } catch (err) {
        console.error(err);
        setAgentResponse(runAgent(nextProfile, nextGoal));
        setError('Live generation encountered an issue. Displaying locally rendered plan.');
      }
    });
  };

  const handleProfileUpdate = (nextProfile: BrandProfile) => {
    setProfile(nextProfile);
    regenerate(nextProfile, goal);
  };

  const handleGoalUpdate = (nextGoal: CampaignGoal) => {
    setGoal(nextGoal);
    regenerate(profile, nextGoal);
  };

  const posts = agentResponse?.schedule.posts ?? [];

  return (
    <div className="space-y-10">
      <motion.section
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-brand-900/70 via-slate-950 to-slate-950 p-10 shadow-[0_0_120px_rgba(122,71,255,0.2)]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="absolute -top-10 -right-10 h-64 w-64 rounded-full bg-brand-500/40 blur-3xl"
          variants={shimmer}
          animate="animate"
        />
        <div className="relative z-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-10">
            <header className="space-y-4">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-1 text-sm text-brand-200">
                <span className="h-2 w-2 rounded-full bg-brand-300" /> Concierge Intelligence Suite
              </p>
              <h1 className="font-display text-4xl font-semibold text-white sm:text-5xl">
                VoyageLux Agent Studio
              </h1>
              <p className="max-w-xl text-base text-slate-300">
                Design, script, and schedule cinematic storytelling for your luxury travel brand. The agent
                blends hospitality nuance with optimal posting cadences, ready to orchestrate your next campaign.
              </p>
            </header>

            <BrandProfileForm value={profile} onChange={handleProfileUpdate} disabled={isPending} />
          </div>

          <CampaignGoalForm value={goal} onChange={handleGoalUpdate} disabled={isPending} />
        </div>
      </motion.section>

      <AnimatePresence>{error && (
        <motion.div
          className="rounded-2xl border border-rose-500/40 bg-rose-500/10 p-4 text-sm text-rose-100"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          {error}
        </motion.div>
      )}</AnimatePresence>

      <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
        {agentResponse && (
          <StrategyPanel
            strategy={agentResponse.strategy}
            profile={agentResponse.profile}
            goal={agentResponse.goal}
            loading={isPending}
          />
        )}

        <div className="space-y-8">
          <ScheduleBoard
            schedule={agentResponse?.schedule}
            loading={isPending}
          />
          <UpcomingPostList posts={posts as ContentPost[]} loading={isPending} />
        </div>
      </div>
    </div>
  );
}
