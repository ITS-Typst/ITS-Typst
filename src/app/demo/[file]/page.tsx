import { notFound } from 'next/navigation';
import FlipbookViewer from '@/components/ui/flipbook-viewer';

interface PageProps {
  params: Promise<{ file: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { file } = await params;
  const name = decodeURIComponent(file).replace(/\.pdf$/i, '');
  return {
    title: `${name}`,
    description: `Lihat template ${name} dalam flipbook interaktif`,
  };
}

export default async function DemoPage({ params }: PageProps) {
  const { file } = await params;

  // Only allow .pdf files — block path traversal and non-PDF requests
  if (!file.endsWith('.pdf') || file.includes('/') || file.includes('..')) {
    notFound();
  }

  const pdfUrl = `/documents/${file}`;

  return <FlipbookViewer pdfUrl={pdfUrl} fileName={file} />;
}
