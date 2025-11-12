import { NextResponse } from 'next/server';
import { runAgent, defaultBrandProfile, defaultCampaignGoal } from '@/lib/strategy';
import type { BrandProfile, CampaignGoal } from '@/lib/types';

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as Partial<{
    profile: BrandProfile;
    goal: CampaignGoal;
  }>;

  const profile = body.profile ?? defaultBrandProfile();
  const goal = body.goal ?? defaultCampaignGoal();

  const agentOutput = runAgent(profile, goal);

  return NextResponse.json(agentOutput);
}

export async function GET() {
  const agentOutput = runAgent(defaultBrandProfile(), defaultCampaignGoal());
  return NextResponse.json(agentOutput);
}
