import { NextResponse } from 'next/server';
import { buildWeeklySchedule } from '@/lib/scheduler';
import { defaultBrandProfile, defaultCampaignGoal } from '@/lib/strategy';
import type { BrandProfile, CampaignGoal } from '@/lib/types';

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as Partial<{
    profile: BrandProfile;
    goal: CampaignGoal;
  }>;

  const profile = body.profile ?? defaultBrandProfile();
  const goal = body.goal ?? defaultCampaignGoal();

  return NextResponse.json(buildWeeklySchedule(profile, goal));
}

export async function GET() {
  return NextResponse.json(buildWeeklySchedule(defaultBrandProfile(), defaultCampaignGoal()));
}
