import { fetchContributors } from '@/services/github.service';
import { NextResponse } from 'next/server';

export const revalidate = 3600; // revalidate setiap 1 jam

export async function GET() {
  console.log(
    '[api/contributors] token:',
    process.env.GITHUB_TOKEN
      ? `set (${process.env.GITHUB_TOKEN.slice(0, 8)}...)`
      : 'MISSING'
  );
  try {
    const contributors = await fetchContributors();
    console.log('[api/contributors] count:', contributors.length);
    return NextResponse.json(contributors);
  } catch (e) {
    console.error('[api/contributors] error:', e);
    return NextResponse.json([]);
  }
}
