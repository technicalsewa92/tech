import dynamic from 'next/dynamic';
import { LazyWrapper } from './LazyComponent';

// Lazy load the Nav component to reduce initial bundle size
const Nav = dynamic(() => import('./Nav'), {
  loading: () => (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <nav className="relative mx-auto max-w-[1280px] border-[#ededed] gap-[15px] flex justify-between max-lg:p-4 items-center bg-white h-[70px]">
        <div className="flex items-center">
          <div className="w-32 h-8 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="md:hidden">
          <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </nav>
    </header>
  ),
  ssr: true, // Keep SSR for navigation
});

interface LazyNavProps {
  services?: any[];
  trainingCategories?: any[];
}

export default function LazyNav(props: LazyNavProps) {
  return (
    <LazyWrapper>
      <Nav {...props} />
    </LazyWrapper>
  );
}
