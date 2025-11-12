'use client';

import { BoltIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import type { ContentPost } from '@/lib/types';

interface UpcomingPostListProps {
  posts: ContentPost[];
  loading: boolean;
}

const platformPalette: Record<ContentPost['platform'], string> = {
  instagram: 'from-rose-500/40 via-rose-500/10 to-transparent',
  facebook: 'from-blue-500/30 via-blue-500/10 to-transparent',
  tiktok: 'from-slate-100/40 via-slate-100/10 to-transparent',
  linkedin: 'from-sky-500/40 via-sky-500/10 to-transparent',
  pinterest: 'from-amber-500/40 via-amber-500/10 to-transparent',
  twitter: 'from-cyan-500/40 via-cyan-500/10 to-transparent'
};

export default function UpcomingPostList({ posts, loading }: UpcomingPostListProps) {
  return (
    <section className="glass gradient-ring relative rounded-3xl p-6">
      <header className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-200/80">Content dossier</p>
          <h2 className="font-display text-2xl text-white">Editorial queue</h2>
        </div>
        <BoltIcon className="h-6 w-6 text-brand-200" />
      </header>

      <div className="mt-6 space-y-4">
        {loading && (
          <div className="grid gap-3">
            {[0, 1].map((item) => (
              <motion.div key={item} className="h-28 animate-pulse rounded-2xl bg-white/5" />
            ))}
          </div>
        )}

        {!loading && posts.length === 0 && (
          <p className="text-sm text-slate-300">No editorial items queued.</p>
        )}

        {!loading && posts.length > 0 && (
          <div className="grid gap-3">
            {posts.map((post) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className={`rounded-2xl border border-white/10 bg-gradient-to-r ${platformPalette[post.platform]} p-4`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-slate-200/70">{post.platform}</p>
                    <h3 className="font-display text-xl text-white">{post.theme}</h3>
                  </div>
                  <div className="flex flex-wrap gap-1 text-xs text-slate-200/80">
                    {post.hashtags.map((tag) => (
                      <span key={tag} className="rounded-full border border-white/20 px-2 py-0.5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="mt-3 text-sm text-slate-100">{post.caption}</p>
                <div className="mt-3 grid gap-2 text-xs text-slate-200/70 md:grid-cols-2">
                  <div>
                    <p className="font-semibold uppercase tracking-widest text-brand-200/60">Visual direction</p>
                    <ul className="mt-1 space-y-1">
                      {post.visuals.map((visual) => (
                        <li key={visual}>• {visual}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold uppercase tracking-widest text-brand-200/60">Enrichments</p>
                    <ul className="mt-1 space-y-1">
                      {post.enrichments.map((item) => (
                        <li key={item}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-3 text-xs text-brand-200/70">CTA: {post.callToAction}</div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
