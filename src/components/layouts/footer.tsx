import Image from 'next/image';
import Link from 'next/link';
import { GITHUB_CONFIG } from '@/config/github.config';

export default function Footer(): React.JSX.Element {
  return (
    <footer>
      <div className='mx-auto max-w-6xl px-8 py-12'>
        <div className='flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between'>
          <div className='max-w-xs'>
            <div className='mb-2 flex items-center gap-2.5'>
              <Image
                src='/images/ITS Typst HD.webp'
                alt='ITS Typst'
                width={32}
                height={32}
                className='rounded-md'
              />
              <p className='text-lg font-bold text-foreground'>
                ITS <span className='text-primary'>Typst</span>
              </p>
            </div>
            <p className='text-sm leading-relaxed text-muted'>
              Template Typst open-source untuk keperluan akademik Institut
              Teknologi Sepuluh Nopember.
            </p>
          </div>

          <div className='flex gap-12'>
            <div>
              <p className='mb-3 text-xs font-semibold uppercase tracking-wider text-muted'>
                Tautan
              </p>
              <ul className='space-y-2'>
                <li>
                  <Link
                    href='#templates'
                    className='text-sm text-muted transition-colors hover:text-foreground'
                  >
                    Template
                  </Link>
                </li>
                <li>
                  <Link
                    href='#contributors'
                    className='text-sm text-muted transition-colors hover:text-foreground'
                  >
                    Kontributor
                  </Link>
                </li>
                <li>
                  <a
                    href={GITHUB_CONFIG.orgUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-sm text-muted transition-colors hover:text-foreground'
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className='mt-10 border-t border-border pt-6 text-center text-xs text-muted'>
          © {new Date().getFullYear()} ITS Typst. Dirilis dengan{' '}
          <a
            href={`${GITHUB_CONFIG.repoUrl}/blob/main/LICENSE`}
            target='_blank'
            rel='noopener noreferrer'
            className='text-primary hover:underline'
          >
            lisensi MIT
          </a>
          .
        </div>
      </div>
    </footer>
  );
}
