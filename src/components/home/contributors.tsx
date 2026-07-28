'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import Skeleton from '@/components/ui/skeleton';
import type { GitHubContributor } from '@/types/github.types';

export function ContributorsSkeleton(): React.JSX.Element {
  const skeletonKeys = Array.from({ length: 12 }, (_, i) => `skeleton-${i}`);

  return (
    <section className='py-24' aria-label='Memuat kontributor'>
      <div className='mx-auto max-w-6xl px-8'>
        <Skeleton className='mb-4 h-3.5 w-24' />
        <Skeleton className='mb-3 h-9 w-56 rounded-xl' />
        <Skeleton className='mb-12 h-4 w-80' />
        <ul
          className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'
          role='list'
        >
          {skeletonKeys.map((key) => (
            <li key={key} className='flex flex-col items-center gap-3 p-4'>
              <Skeleton className='h-16 w-16' />
              <Skeleton className='h-3 w-20' />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function Contributors(): React.JSX.Element {
  const [contributors, setContributors] = useState<GitHubContributor[] | null>(
    null
  );

  useEffect(() => {
    fetch('/api/contributors')
      .then((r) => r.json())
      .then((data: GitHubContributor[]) => setContributors(data))
      .catch(() => setContributors([]));
  }, []);

  if (contributors === null) return <ContributorsSkeleton />;

  return (
    <section
      id='contributors'
      className='py-24'
      aria-labelledby='contributors-heading'
    >
      <div className='mx-auto max-w-6xl px-8'>
        <div className='max-w-xl'>
          <h2
            id='contributors-heading'
            className='mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl'
          >
            Komunitas
          </h2>
          <p className='text-base leading-relaxed text-muted'>
            Terima kasih kepada semua orang yang telah berkontribusi dalam
            pengembangan template ini.
          </p>
        </div>

        {contributors.length === 0 ? (
          <p className='mt-8 text-sm text-muted'>
            Belum ada kontributor tercatat. Jadilah yang pertama!
          </p>
        ) : (
          <ul
            className='mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'
            role='list'
          >
            {contributors.map((contributor) => (
              <li key={contributor.login}>
                <ContributorCard contributor={contributor} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

function ContributorCard({
  contributor,
}: {
  contributor: GitHubContributor;
}): React.JSX.Element {
  return (
    <a
      href={contributor.html_url}
      target='_blank'
      rel='noopener noreferrer'
      aria-label={`${contributor.login} — kontributor`}
      className='group flex flex-col items-center gap-3 rounded-2xl border border-transparent p-4 text-center transition-all hover:border-border hover:bg-surface'
    >
      <Image
        src={contributor.avatar_url}
        alt={contributor.login}
        width={64}
        height={64}
        className='rounded-full ring-2 ring-border transition-all group-hover:ring-primary/40'
      />
      <p className='text-sm font-medium leading-tight text-foreground'>
        {contributor.login}
      </p>
    </a>
  );
}
