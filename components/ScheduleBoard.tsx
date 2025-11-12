'use client';

import { CalendarIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import type { WeeklySchedule } from '@/lib/types';

interface ScheduleBoardProps {
  schedule: WeeklySchedule | undefined;
  loading: boolean;
}

export default function ScheduleBoard({ schedule, loading }: ScheduleBoardProps) {
  const posts = schedule?.posts ?? [];

  return (
    <section className="glass gradient-ring relative rounded-3xl p-6">
      <header className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-200/80">Optimal cadence</p>
          <h2 className="font-display text-2xl text-white">Week of {schedule?.weekOf ?? '—'}</h2>
        </div>
        <CalendarIcon className="h-6 w-6 text-brand-200" />
      </header>

      <div className="mt-6 space-y-4">
        {loading && (
          <div className="grid gap-3">
            {[0, 1, 2].map((item) => (
              <motion.div
                key={item}
                className="h-20 w-full animate-pulse rounded-2xl bg-white/5"
              />
            ))}
          </div>
        )}

        {!loading && posts.length === 0 && (
          <p className="text-sm text-slate-300">No schedule yet. Adjust the profile or campaign inputs.</p>
        )}

        {!loading && posts.length > 0 && (
          <div className="grid gap-3">
            {posts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-white/10 bg-gradient-to-r from-white/5 to-transparent p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-brand-200/60">{post.platform}</p>
                    <p className="font-display text-lg text-white">{post.theme}</p>
                  </div>
                  <div className="flex flex-wrap gap-1 text-xs text-brand-200/80">
                    {post.bestTimes.slice(0, 2).map((slot) => (
                      <span key={slot} className="rounded-full bg-brand-500/10 px-3 py-1">
                        {slot}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="mt-3 text-sm text-slate-200">{post.hook}</p>
                <p className="mt-2 text-xs text-slate-400">{post.supportingData}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
