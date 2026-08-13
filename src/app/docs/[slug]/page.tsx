import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Navbar from '@/components/layouts/navbar';
import Footer from '@/components/layouts/footer';
import DocsSidebar from '@/components/docs/sidebar';
import DocsContent from '@/components/docs/content';
import Breadcrumb from '@/components/ui/breadcrumb';
import { docsNav } from '@/config/docs.config';
import { docsContent } from '@/lib/docs-content';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams(): { slug: string }[] {
  return docsNav.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const meta = docsNav.find((p) => p.slug === slug);
  if (!meta) return {};
  return {
    title: meta.title,
    description: meta.description,
  };
}

export default async function DocsSlugPage({
  params,
}: PageProps): Promise<React.JSX.Element> {
  const { slug } = await params;

  const meta = docsNav.find((p) => p.slug === slug);
  if (!meta) notFound();

  const content = docsContent[slug];
  if (!content) notFound();

  return (
    <>
      <Navbar />
      <div className='fixed inset-x-0 bottom-0 top-16 overflow-hidden'>
        <div className='mx-auto flex h-full w-full max-w-6xl overflow-hidden'>
          <DocsSidebar currentSlug={slug} />
          <main className='min-w-0 flex-1 overflow-y-auto scroll-smooth'>
            <div className='px-6 py-8 sm:px-10'>
              <Breadcrumb
                segments={
                  slug === 'introduction'
                    ? [
                        { label: 'Beranda', href: '/' },
                        { label: 'Dokumentasi' },
                      ]
                    : [
                        { label: 'Beranda', href: '/' },
                        { label: 'Dokumentasi', href: '/docs' },
                        { label: meta.title },
                      ]
                }
              />
              <DocsContent
                rawMarkdown={content}
                slug={slug}
                title={meta.title}
              />
            </div>
            <Footer />
          </main>
        </div>
      </div>
    </>
  );
}
