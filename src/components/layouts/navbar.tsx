'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import ThemeToggle from '@/components/ui/theme-toggle';
import { GITHUB_CONFIG } from '@/config/github.config';

export default function Navbar(): React.JSX.Element {
  const pathname = usePathname();

  const isHome = pathname === '/';
  const isDocs = pathname.startsWith('/docs');

  const [scrolled, setScrolled] = useState(!isHome);

  useEffect(() => {
    const hero = document.getElementById('hero');
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md transition-all duration-300 ${
        scrolled ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}
    >
      <nav
        className='mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-8'
        aria-label='Navigasi utama'
      >
        <Link href='/' className='flex items-center gap-3'>
          <span className='text-base font-bold tracking-tight text-foreground sm:text-lg'>
            ITS <span className='text-primary'>Typst</span>
          </span>
        </Link>

        <div className='flex items-center gap-1'>
          <div className='hidden items-center gap-1 sm:flex'>
            <Link
              href='/'
              className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
                isHome
                  ? 'font-medium text-primary'
                  : 'text-muted hover:text-foreground'
              }`}
              aria-current={isHome ? 'page' : undefined}
            >
              Beranda
            </Link>

            <Link
              href='/docs'
              className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
                isDocs
                  ? 'font-medium text-primary'
                  : 'text-muted hover:text-foreground'
              }`}
              aria-current={isDocs ? 'page' : undefined}
            >
              Dokumentasi
            </Link>

            <a
              href={GITHUB_CONFIG.orgUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='rounded-lg px-3 py-1.5 text-sm text-muted transition-colors hover:text-foreground'
            >
              GitHub
            </a>
          </div>

          <div className='ml-2'>
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
}
