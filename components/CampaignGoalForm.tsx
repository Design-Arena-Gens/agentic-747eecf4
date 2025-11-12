'use client';

import { useState } from 'react';
import { CalendarDaysIcon, FlagIcon } from '@heroicons/react/24/outline';
import type { CampaignGoal, SocialPlatform } from '@/lib/types';
import { PLATFORM_CTA } from '@/lib/constants';

const objectiveLabels: Record<CampaignGoal['objective'], string> = {
  awareness: 'Awareness lift',
  engagement: 'Deep engagement',
  leadGeneration: 'Lead generation'
};

interface CampaignGoalFormProps {
  value: CampaignGoal;
  disabled?: boolean;
  onChange: (value: CampaignGoal) => void;
}

export default function CampaignGoalForm({ value, onChange, disabled }: CampaignGoalFormProps) {
  const [kpiDraft, setKpiDraft] = useState('');

  const update = <K extends keyof CampaignGoal>(key: K, next: CampaignGoal[K]) => {
    onChange({ ...value, [key]: next });
  };

  const addKpi = () => {
    const clean = kpiDraft.trim();
    if (!clean) return;
    update('kpis', Array.from(new Set([...value.kpis, clean])));
    setKpiDraft('');
  };

  const syncCTA = (platform: SocialPlatform | null) => {
    if (platform) {
      update('callToAction', PLATFORM_CTA[platform]);
    }
  };

  return (
    <aside className="glass gradient-ring relative h-fit rounded-3xl p-6">
      <div className="space-y-6">
        <header className="space-y-3">
          <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-brand-200/80">
            <FlagIcon className="h-4 w-4" /> Campaign goal script
          </p>
          <h2 className="font-display text-2xl text-white">Set the mission</h2>
          <p className="text-sm text-slate-300">
            Outline the ambition so the agent can choreograph cadence, angles, and conversion hooks.
          </p>
        </header>

        <div className="grid gap-4 text-sm">
          <div className="space-y-2">
            <span className="text-slate-200">Primary objective</span>
            <div className="grid gap-2">
              {Object.entries(objectiveLabels).map(([key, label]) => {
                const selected = value.objective === key;
                return (
                  <button
                    key={key}
                    type="button"
                    disabled={disabled}
                    onClick={() => update('objective', key as CampaignGoal['objective'])}
                    className={`rounded-xl border px-4 py-3 text-left transition ${
                      selected
                        ? 'border-brand-300/70 bg-brand-500/20 text-white'
                        : 'border-white/10 bg-white/5 text-slate-200 hover:border-brand-400/40 hover:bg-brand-500/10'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-slate-200">Launch date</span>
            <label className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-slate-100 focus-within:border-brand-400 focus-within:ring-2 focus-within:ring-brand-400/20">
              <CalendarDaysIcon className="h-5 w-5 text-brand-200" />
              <input
                type="date"
                value={value.launchDate.slice(0, 10)}
                disabled={disabled}
                onChange={(event) => update('launchDate', new Date(event.target.value).toISOString())}
                className="flex-1 bg-transparent text-sm outline-none"
              />
            </label>
          </div>

          <div className="space-y-2">
            <span className="text-slate-200">Success indicators</span>
            <div className="flex flex-wrap gap-2">
              {value.kpis.map((kpi) => (
                <span key={kpi} className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-100">
                  {kpi}
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-400/30"
                placeholder="Add KPI (e.g., Video completions)"
                value={kpiDraft}
                disabled={disabled}
                onChange={(event) => setKpiDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault();
                    addKpi();
                  }
                }}
              />
              <button
                type="button"
                onClick={addKpi}
                disabled={disabled}
                className="rounded-lg bg-brand-500/70 px-3 py-2 text-xs font-medium text-white transition hover:bg-brand-500"
              >
                Add KPI
              </button>
            </div>
          </div>

          <label className="space-y-2 text-sm">
            <span className="text-slate-200">Call to action</span>
            <textarea
              className="min-h-[96px] w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-400/30"
              value={value.callToAction}
              disabled={disabled}
              onChange={(event) => update('callToAction', event.target.value)}
            />
          </label>

          <div className="rounded-xl border border-white/5 bg-white/5 p-4 text-xs text-slate-300">
            Sync CTA from platform cadence:
            <div className="mt-3 flex flex-wrap gap-2">
              {(Object.keys(PLATFORM_CTA) as SocialPlatform[]).map((platform) => (
                <button
                  key={platform}
                  type="button"
                  disabled={disabled}
                  onClick={() => syncCTA(platform)}
                  className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-100 transition hover:border-brand-400/40 hover:bg-brand-500/10"
                >
                  {platform}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
