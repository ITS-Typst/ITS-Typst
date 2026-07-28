import { GITHUB_CONFIG } from '@/config/github.config';

export default function Hero(): React.JSX.Element {
  return (
    <section
      id='hero'
      className='relative flex items-center overflow-hidden rounded-br-[4rem] pb-16'
      style={{ background: 'var(--hero-gradient)' }}
    >
      {/* Noise / grain texture overlay */}
      <svg
        className='pointer-events-none absolute inset-0 h-full w-full opacity-[0.13] mix-blend-overlay'
        aria-hidden='true'
      >
        <filter id='hero-noise'>
          <feTurbulence
            type='fractalNoise'
            baseFrequency='0.8'
            numOctaves='4'
            stitchTiles='stitch'
          />
          <feColorMatrix type='saturate' values='0' />
        </filter>
        <rect width='100%' height='100%' filter='url(#hero-noise)' />
      </svg>

      {/* Decorative light blobs */}
      <div
        className='pointer-events-none absolute -right-32 -top-32 h-128 w-lg rounded-full bg-white/20 blur-3xl'
        aria-hidden='true'
      />
      <div
        className='pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-white/15 blur-3xl'
        aria-hidden='true'
      />
      <div
        className='pointer-events-none absolute left-[55%] top-[30%] h-64 w-64 rounded-full bg-cyan-200/10 blur-2xl'
        aria-hidden='true'
      />

      <div className='relative mx-auto w-full max-w-6xl px-8 py-24'>
        <div className='max-w-2xl'>
          <h1 className='mb-6 text-5xl font-bold leading-[1.1] tracking-tight text-white md:text-7xl'>
            Template Typst
            <br />
            <span className='text-white/75'>untuk ITS</span>
          </h1>

          <p className='mb-10 max-w-lg text-lg leading-relaxed text-white/75'>
            Koleksi template Typst berkualitas tinggi untuk keperluan akademik —
            Tugas Akhir, Proposal, KP, Magang, dan lainnya.
          </p>

          <div className='flex flex-col gap-4 sm:flex-row'>
            <a
              href='#templates'
              className='inline-flex h-12 items-center justify-center rounded-xl bg-white px-8 text-sm font-semibold text-primary transition-opacity hover:opacity-90'
            >
              Lihat Template
            </a>
            <a
              href={GITHUB_CONFIG.orgUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-8 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20'
            >
              <GitHubIcon />
              GitHub
            </a>
          </div>
        </div>
      </div>

      {/* S-curve bottom: kiri droop ke bawah, kanan flat → combined dengan rounded-br-[4rem] jadi bentuk S */}
      <div
        className='pointer-events-none absolute bottom-0 left-0 w-full'
        aria-hidden='true'
      >
        <svg
          viewBox='0 0 1440 80'
          preserveAspectRatio='none'
          className='block h-16 w-full md:h-20'
        >
          <path
            d='M 0,55 C 250,80 650,10 950,8 C 1100,6 1280,0 1440,0 L 1440,80 L 0,80 Z'
            style={{ fill: 'var(--background)' }}
          />
        </svg>
      </div>
    </section>
  );
}

function GitHubIcon(): React.JSX.Element {
  return (
    <svg
      width='18'
      height='18'
      viewBox='0 0 24 24'
      fill='currentColor'
      aria-hidden='true'
    >
      <path d='M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z' />
    </svg>
  );
}
