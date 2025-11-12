'use client';

import { useState } from 'react';
import { CheckCircleIcon, PlusIcon } from '@heroicons/react/24/solid';
import type { BrandProfile, SocialPlatform } from '@/lib/types';
import { PLATFORM_CTA } from '@/lib/constants';

const toneLabels: Record<BrandProfile['tone'], string> = {
  glamorous: 'Glamorous',
  immersive: 'Immersive',
  adventurous: 'Adventurous',
  serene: 'Serene',
  bespoke: 'Bespoke'
};

const audienceLabels: Record<BrandProfile['audience'], string> = {
  ultraHighNetWorth: 'Ultra high-net-worth',
  affluentFamilies: 'Affluent families',
  honeymooners: 'Honeymooners',
  experientialSeekers: 'Experiential seekers'
};

const platformLabels: Record<SocialPlatform, string> = {
  instagram: 'Instagram',
  facebook: 'Facebook',
  tiktok: 'TikTok',
  linkedin: 'LinkedIn',
  pinterest: 'Pinterest',
  twitter: 'X / Twitter'
};

interface BrandProfileFormProps {
  value: BrandProfile;
  disabled?: boolean;
  onChange: (value: BrandProfile) => void;
}

export default function BrandProfileForm({ value, onChange, disabled }: BrandProfileFormProps) {
  const [destinationDraft, setDestinationDraft] = useState('');

  const update = <K extends keyof BrandProfile>(key: K, next: BrandProfile[K]) => {
    onChange({ ...value, [key]: next });
  };

  const togglePlatform = (platform: SocialPlatform) => {
    const exists = value.preferredPlatforms.includes(platform);
    const next = exists
      ? value.preferredPlatforms.filter((item) => item !== platform)
      : [...value.preferredPlatforms, platform];
    update('preferredPlatforms', next);
  };

  const addDestination = () => {
    const clean = destinationDraft.trim();
    if (!clean) return;
    update('destinations', Array.from(new Set([...value.destinations, clean])));
    setDestinationDraft('');
  };

  return (
    <div className="glass gradient-ring relative rounded-3xl p-6">
      <div className="space-y-6">
        <div className="flex items-baseline justify-between">
          <div>
            <h2 className="font-display text-2xl text-white">Brand profile</h2>
            <p className="text-sm text-slate-300">Train the agent with your maison DNA.</p>
          </div>
        </div>

        <div className="grid gap-4">
          <label className="space-y-2 text-sm">
            <span className="text-slate-200">Brand name</span>
            <input
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-400/30"
              value={value.brandName}
              disabled={disabled}
              onChange={(event) => update('brandName', event.target.value)}
            />
          </label>

          <label className="space-y-2 text-sm">
            <span className="text-slate-200">Signature experience</span>
            <input
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-400/30"
              value={value.signatureOffering}
              disabled={disabled}
              onChange={(event) => update('signatureOffering', event.target.value)}
            />
          </label>

          <div className="grid gap-2">
            <span className="text-sm text-slate-200">Tone & texture</span>
            <div className="grid gap-2 sm:grid-cols-2">
              {Object.entries(toneLabels).map(([key, label]) => {
                const selected = value.tone === key;
                return (
                  <button
                    key={key}
                    type="button"
                    disabled={disabled}
                    onClick={() => update('tone', key as BrandProfile['tone'])}
                    className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition ${
                      selected
                        ? 'border-brand-300/70 bg-brand-500/20 text-white'
                        : 'border-white/10 bg-white/5 text-slate-200 hover:border-brand-400/40 hover:bg-brand-500/10'
                    }`}
                  >
                    {label}
                    {selected && <CheckCircleIcon className="h-5 w-5 text-brand-200" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-2">
            <span className="text-sm text-slate-200">Audience focus</span>
            <div className="grid gap-2 sm:grid-cols-2">
              {Object.entries(audienceLabels).map(([key, label]) => {
                const selected = value.audience === key;
                return (
                  <button
                    key={key}
                    type="button"
                    disabled={disabled}
                    onClick={() => update('audience', key as BrandProfile['audience'])}
                    className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition ${
                      selected
                        ? 'border-brand-300/70 bg-brand-500/20 text-white'
                        : 'border-white/10 bg-white/5 text-slate-200 hover:border-brand-400/40 hover:bg-brand-500/10'
                    }`}
                  >
                    {label}
                    {selected && <CheckCircleIcon className="h-5 w-5 text-brand-200" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-3">
            <span className="text-sm text-slate-200">Priority destinations</span>
            <div className="flex flex-wrap gap-2">
              {value.destinations.map((destination) => (
                <span
                  key={destination}
                  className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs text-slate-100"
                >
                  {destination}
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-400/30"
                placeholder="Add new destination"
                value={destinationDraft}
                disabled={disabled}
                onChange={(event) => setDestinationDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault();
                    addDestination();
                  }
                }}
              />
              <button
                type="button"
                onClick={addDestination}
                disabled={disabled}
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg bg-brand-500/60 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-500"
              >
                <PlusIcon className="h-4 w-4" />
                Add
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-sm text-slate-200">Preferred platforms</span>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(platformLabels) as SocialPlatform[]).map((platform) => {
                const selected = value.preferredPlatforms.includes(platform);
                return (
                  <button
                    key={platform}
                    type="button"
                    disabled={disabled}
                    onClick={() => togglePlatform(platform)}
                    className={`rounded-full border px-4 py-1.5 text-sm transition ${
                      selected
                        ? 'border-brand-400 bg-brand-500/30 text-white'
                        : 'border-white/10 bg-white/0 text-slate-200 hover:border-brand-400/40 hover:bg-brand-500/10'
                    }`}
                  >
                    {platformLabels[platform]}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-xs text-slate-300">
            The agent auto-adjusts call-to-action suggestions per platform. Current flagship CTA:{' '}
            <span className="text-brand-200">{PLATFORM_CTA[value.preferredPlatforms[0] ?? 'instagram']}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
