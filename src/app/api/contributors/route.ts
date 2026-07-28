import { fetchContributors } from '@/services/github.service';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  const contributors = await fetchContributors();
  return NextResponse.json(contributors);
}
