export default function Hero(): React.JSX.Element {
  return (
    <section
      id='hero'
      className='relative flex items-center overflow-hidden rounded-br-[4rem] pb-16 md:pb-20'
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

      <div className='relative mx-auto w-full max-w-6xl px-4 py-16 md:px-8 md:py-24'>
        <div className='max-w-2xl'>
          <h1 className='mb-6 text-5xl font-bold leading-[1.1] tracking-tight text-white md:text-7xl'>
            Template Typst
            <br />
            <span className='text-white/75'>untuk ITS</span>
          </h1>

          <p className='mb-10 max-w-lg text-md sm:text-lg leading-relaxed text-white/75'>
            Koleksi template Typst berkualitas tinggi untuk berbagai kebutuhan
            akademik mahasiswa Institut Teknologi Sepuluh Nopember, seperti
            Tugas Akhir, Proposal, Kerja Praktik (KP), Magang, dan lainnya.
          </p>
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
