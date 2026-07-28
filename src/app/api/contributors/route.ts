import { fetchContributors } from '@/services/github.service';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const contributors = await fetchContributors();
    return NextResponse.json(contributors);
  } catch (e) {
    console.error('[api/contributors]', e);
    return NextResponse.json([]);
  }
}
