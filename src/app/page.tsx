import { Suspense } from 'react';

export const dynamic = 'force-dynamic';
import Navbar from '@/components/layouts/navbar';
import Footer from '@/components/layouts/footer';
import Hero from '@/components/home/hero';
import Templates from '@/components/home/templates';
import Contributors, {
  ContributorsSkeleton,
} from '@/components/home/contributors';

export default function Page(): React.JSX.Element {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Templates />
        <Suspense fallback={<ContributorsSkeleton />}>
          <Contributors />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
