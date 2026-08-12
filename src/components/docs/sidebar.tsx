'use client';

import Link from 'next/link';
import { useState } from 'react';
import { docsNav } from '@/config/docs.config';

interface DocsSidebarProps {
  currentSlug: string;
}

function NavList({
  currentSlug,
  onNavigate,
}: {
  currentSlug: string;
  onNavigate?: () => void;
}): React.JSX.Element {
  return (
    <nav aria-label='Navigasi dokumentasi'>
      <ul className='space-y-0.5'>
        {docsNav.map((page) => {
          const isActive = page.slug === currentSlug;
          return (
            <li key={page.slug}>
              <Link
                href={`/docs/${page.slug}`}
                onClick={onNavigate}
                className={`block rounded-md px-2.5 py-1.5 transition-colors ${
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted hover:bg-surface hover:text-foreground'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <span
                  className={`block text-[13px] leading-snug ${isActive ? 'font-medium' : ''}`}
                >
                  {page.title}
                </span>
                {page.description && (
                  <span
                    className={`block truncate text-[11px] leading-snug ${isActive ? 'text-primary/50' : 'text-muted/60'}`}
                  >
                    {page.description}
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default function DocsSidebar({
  currentSlug,
}: DocsSidebarProps): React.JSX.Element {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className='hidden w-52 shrink-0 self-start overflow-y-auto my-4 ml-4 mr-2 max-h-[calc(100%-2rem)] rounded-xl border border-border bg-background px-4 py-6 lg:block'>
        <NavList currentSlug={currentSlug} />
      </aside>

      {/* Mobile: FAB toggle */}
      <button
        type='button'
        onClick={() => setMobileOpen((v) => !v)}
        className='fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg lg:hidden'
        aria-label='Toggle menu dokumentasi'
      >
        {mobileOpen ? (
          <svg
            width='18'
            height='18'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2.5'
            strokeLinecap='round'
            strokeLinejoin='round'
            aria-hidden='true'
          >
            <line x1='18' y1='6' x2='6' y2='18' />
            <line x1='6' y1='6' x2='18' y2='18' />
          </svg>
        ) : (
          <svg
            width='18'
            height='18'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2.5'
            strokeLinecap='round'
            strokeLinejoin='round'
            aria-hidden='true'
          >
            <line x1='3' y1='12' x2='21' y2='12' />
            <line x1='3' y1='6' x2='21' y2='6' />
            <line x1='3' y1='18' x2='21' y2='18' />
          </svg>
        )}
      </button>

      {/* Mobile: overlay drawer */}
      {mobileOpen && (
        <div
          className='fixed inset-0 z-30 bg-background/60 backdrop-blur-sm lg:hidden'
          onClick={() => setMobileOpen(false)}
        >
          <aside
            className='absolute left-0 top-0 h-full w-64 overflow-y-auto border-r border-border bg-background p-6 shadow-xl'
            onClick={(e) => e.stopPropagation()}
          >
            <NavList
              currentSlug={currentSlug}
              onNavigate={() => setMobileOpen(false)}
            />
          </aside>
        </div>
      )}
    </>
  );
}
