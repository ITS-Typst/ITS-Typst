import Image from 'next/image';
import Link from 'next/link';
import ThemeToggle from '@/components/ui/theme-toggle';
import { GITHUB_CONFIG } from '@/config/github.config';

export default function Navbar(): React.JSX.Element {
  return (
    <header className='fixed left-0 right-0 top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md'>
      <nav
        className='mx-auto flex h-16 max-w-6xl items-center justify-between px-8'
        aria-label='Navigasi utama'
      >
        <Link href='/' className='flex items-center gap-2.5'>
          <Image
            src='/images/ITS Typst HD.webp'
            alt='ITS Typst'
            width={32}
            height={32}
            className='rounded-md'
          />
          <span className='text-lg font-bold tracking-tight text-foreground'>
            ITS <span className='text-primary'>Typst</span>
          </span>
        </Link>

        <div className='flex items-center gap-6'>
          <div className='hidden items-center gap-6 sm:flex'>
            <Link
              href='#templates'
              className='text-sm text-muted transition-colors hover:text-foreground'
            >
              Template
            </Link>
            <Link
              href='#contributors'
              className='text-sm text-muted transition-colors hover:text-foreground'
            >
              Kontributor
            </Link>
            <a
              href={GITHUB_CONFIG.orgUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='text-sm text-muted transition-colors hover:text-foreground'
            >
              GitHub
            </a>
          </div>

          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
