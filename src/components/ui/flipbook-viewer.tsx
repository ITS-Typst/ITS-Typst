'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import type { BookViewer, PageData } from 'flipbook-viewer';

interface FlipbookViewerProps {
  pdfUrl: string;
  fileName?: string;
}

type Status = 'loading' | 'ready' | 'error';

const CONTAINER_ID = 'flipbook-root';
const MOBILE_BREAKPOINT = 768;

export default function FlipbookViewer({
  pdfUrl,
  fileName,
}: FlipbookViewerProps) {
  const [status, setStatus] = useState<Status>('loading');
  const [errorMsg, setErrorMsg] = useState('');
  const [viewer, setViewer] = useState<BookViewer | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const cancelledRef = useRef(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pdfRef = useRef<any>(null);
  const mobileCanvasRef = useRef<HTMLCanvasElement>(null);

  // Mobile: re-render canvas whenever currentPage changes
  useEffect(() => {
    if (!isMobile || status !== 'ready' || !pdfRef.current) return;

    const canvas = mobileCanvasRef.current;
    if (!canvas) return;

    let cancelled = false;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pdfRef.current.getPage(currentPage).then((page: any) => {
      if (cancelled) return;

      const container = canvas.parentElement;
      const containerWidth = (container?.clientWidth ?? window.innerWidth) - 16;
      const baseViewport = page.getViewport({ scale: 1 });
      const scale = containerWidth / baseViewport.width;
      const viewport = page.getViewport({ scale });
      const outputScale = window.devicePixelRatio || 1;

      canvas.width = Math.floor(viewport.width * outputScale);
      canvas.height = Math.floor(viewport.height * outputScale);
      canvas.style.width = `${Math.floor(viewport.width)}px`;
      canvas.style.height = `${Math.floor(viewport.height)}px`;

      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const transform =
        outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : undefined;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (
        page.render({
          canvas: null,
          canvasContext: ctx,
          transform,
          viewport,
        }) as any
      ).promise.catch(console.error);
    });

    return () => {
      cancelled = true;
    };
  }, [currentPage, status, isMobile]);

  useEffect(() => {
    cancelledRef.current = false;

    async function init() {
      try {
        const pdfjsLib = await import('pdfjs-dist');
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

        const pdf = await pdfjsLib.getDocument({ url: pdfUrl }).promise;
        if (cancelledRef.current) return;

        const vw = window.innerWidth;
        const mobile = vw < MOBILE_BREAKPOINT;
        setIsMobile(mobile);
        setTotalPages(pdf.numPages);

        if (mobile) {
          // Mobile: render pages directly with pdfjs — skip flipbook library entirely
          pdfRef.current = pdf;
          setCurrentPage(1);
          setStatus('ready');
        } else {
          // Desktop: use flipbook library for double-page spread
          const { init: flipbook } = await import('flipbook-viewer');

          const cache: Record<number, PageData> = {};

          const book = {
            pdf,
            numPages: () => pdf.numPages,
            getPage: (
              n: number,
              cb: (err: unknown, page?: PageData) => void
            ) => {
              if (!n || n > pdf.numPages) return cb(null);
              if (cache[n]) return cb(null, cache[n]);

              pdf
                .getPage(n)
                .then((page) => {
                  const scale = 1.5;
                  const viewport = page.getViewport({ scale });
                  const outputScale = window.devicePixelRatio || 1;

                  const canvas = document.createElement('canvas');
                  canvas.width = Math.floor(viewport.width * outputScale);
                  canvas.height = Math.floor(viewport.height * outputScale);
                  canvas.style.width = `${Math.floor(viewport.width)}px`;
                  canvas.style.height = `${Math.floor(viewport.height)}px`;

                  const ctx = canvas.getContext('2d')!;
                  ctx.fillStyle = '#ffffff';
                  ctx.fillRect(0, 0, canvas.width, canvas.height);

                  const transform =
                    outputScale !== 1
                      ? [outputScale, 0, 0, outputScale, 0, 0]
                      : undefined;

                  page
                    .render({
                      canvas: null,
                      canvasContext: ctx,
                      transform,
                      viewport,
                    })
                    .promise.then(() => {
                      ctx.globalCompositeOperation = 'destination-over';
                      ctx.fillStyle = '#ffffff';
                      ctx.fillRect(0, 0, canvas.width, canvas.height);
                      ctx.globalCompositeOperation = 'source-over';

                      const img = new Image();
                      img.src = canvas.toDataURL();
                      img.onload = () => {
                        const pageData: PageData = {
                          img,
                          num: n,
                          width: img.width,
                          height: img.height,
                        };
                        cache[n] = pageData;
                        cb(null, pageData);
                      };
                    })
                    .catch((err) => cb(err));
                })
                .catch((err) => cb(err));
            },
          };

          const bookWidth = Math.min(800, vw - 64);
          const bookHeight = Math.round(bookWidth * 0.72);

          flipbook(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            book as any,
            CONTAINER_ID,
            {
              width: bookWidth,
              height: bookHeight,
              backgroundColor: '#3a3a3a',
            },
            (err: unknown, v: BookViewer) => {
              if (cancelledRef.current) return;
              if (err) {
                setErrorMsg('Gagal memuat flipbook viewer');
                setStatus('error');
                return;
              }
              v.on('seen', (n: number) => setCurrentPage(n));
              setViewer(v);
              setStatus('ready');
            }
          );
        }
      } catch (err) {
        if (!cancelledRef.current) {
          setErrorMsg(err instanceof Error ? err.message : 'Gagal memuat PDF');
          setStatus('error');
        }
      }
    }

    init();
    return () => {
      cancelledRef.current = true;
    };
  }, [pdfUrl]);

  // Desktop: right page is odd; currentPage-1 & currentPage are visible together
  const isDoubleSpread = !isMobile && currentPage > 1 && currentPage % 2 === 1;
  const pageLabel =
    status === 'ready'
      ? isDoubleSpread
        ? `${currentPage - 1}–${currentPage} / ${totalPages}`
        : `${currentPage} / ${totalPages}`
      : '';

  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  return (
    <div className='relative flex min-h-screen flex-col bg-[#3a3a3a]'>
      {/* Top bar */}
      <div className='sticky top-0 z-10 w-full border-b border-[#555] bg-[#2e2e2e]/90 px-4 py-3 backdrop-blur-md sm:px-6'>
        <div className='mx-auto flex max-w-6xl items-center justify-between'>
          <Link
            href='/'
            className='flex items-center gap-2 text-sm text-[#aaa] transition-colors hover:text-white'
          >
            <svg
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              aria-hidden='true'
            >
              <path d='m15 18-6-6 6-6' />
            </svg>
            Kembali
          </Link>

          <span className='truncate px-4 text-sm font-medium text-white'>
            {fileName ? decodeURIComponent(fileName) : 'PDF Viewer'}
          </span>

          <span className='text-sm tabular-nums text-[#aaa]'>{pageLabel}</span>
        </div>
      </div>

      {/* Main content */}
      <div className='flex flex-1 flex-col items-center justify-center px-2 py-6 sm:px-4 sm:py-6'>
        {status === 'loading' && (
          <div className='flex flex-col items-center gap-4 text-[#aaa]'>
            <div className='h-10 w-10 animate-spin rounded-full border-4 border-[#555] border-t-[#aaa]' />
            <p className='text-sm'>Memuat PDF...</p>
          </div>
        )}

        {status === 'error' && (
          <div className='flex flex-col items-center gap-3 text-center'>
            <svg
              width='40'
              height='40'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='1.5'
              className='text-red-400'
              aria-hidden='true'
            >
              <circle cx='12' cy='12' r='10' />
              <path d='m15 9-6 6M9 9l6 6' />
            </svg>
            <p className='font-medium text-white'>Gagal memuat PDF</p>
            <p className='text-sm text-[#aaa]'>{errorMsg}</p>
            <Link
              href='/'
              className='mt-2 rounded-lg bg-[#4a9abb] px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-80'
            >
              Kembali ke beranda
            </Link>
          </div>
        )}

        {/* Mobile: single-page canvas — pdfjs renders directly, no flipbook lib */}
        <div
          className={
            !isMobile || status !== 'ready'
              ? 'invisible h-0 overflow-hidden'
              : 'flex w-full justify-center'
          }
        >
          <canvas
            ref={mobileCanvasRef}
            style={{ display: 'block', maxWidth: '100%' }}
          />
        </div>

        {/* Desktop: flipbook container — must always exist in DOM for lib to find it */}
        <div
          className={
            isMobile || status !== 'ready'
              ? 'invisible h-0 overflow-hidden'
              : 'flex w-full justify-center overflow-x-auto'
          }
        >
          <div id={CONTAINER_ID} style={{ width: 'fit-content' }} />
        </div>
      </div>

      {/* Navigation bar */}
      {status === 'ready' && (
        <div className='sticky bottom-0 w-full border-t border-[#555] bg-[#2e2e2e]/90 backdrop-blur-md'>
          <div className='mx-auto flex max-w-xs items-center justify-center gap-3 py-3'>
            {/* Prev page */}
            <button
              onClick={() =>
                isMobile
                  ? setCurrentPage((p) => Math.max(1, p - 1))
                  : viewer?.flip_back()
              }
              disabled={isFirstPage}
              className={`flex h-10 w-10 items-center justify-center rounded-lg border transition-colors ${
                isFirstPage
                  ? 'cursor-not-allowed border-[#3a3a3a] bg-[#2a2a2a] text-[#444]'
                  : 'border-[#555] bg-[#4a4a4a] text-white hover:bg-[#555]'
              }`}
              aria-label='Halaman sebelumnya'
            >
              <svg
                width='18'
                height='18'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                aria-hidden='true'
              >
                <path d='m15 18-6-6 6-6' />
              </svg>
            </button>

            {/* Next page */}
            <button
              onClick={() =>
                isMobile
                  ? setCurrentPage((p) => Math.min(totalPages, p + 1))
                  : viewer?.flip_forward()
              }
              disabled={isLastPage}
              className={`flex h-10 w-10 items-center justify-center rounded-lg border transition-colors ${
                isLastPage
                  ? 'cursor-not-allowed border-[#3a3a3a] bg-[#2a2a2a] text-[#444]'
                  : 'border-[#555] bg-[#4a4a4a] text-white hover:bg-[#555]'
              }`}
              aria-label='Halaman berikutnya'
            >
              <svg
                width='18'
                height='18'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                aria-hidden='true'
              >
                <path d='m9 18 6-6-6-6' />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
