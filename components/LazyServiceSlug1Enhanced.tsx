import dynamic from 'next/dynamic';
import { LazyWrapper } from './LazyComponent';

// Lazy load the largest component to reduce initial bundle size
const ServiceSlug1Enhanced = dynamic(
  () => import('./pageHelperComponents.js/ServiceSlug1Enhanced'),
  {
    loading: () => (
      <div className="animate-pulse">
        <div className="h-64 bg-gray-200 rounded-lg mb-4"></div>
        <div className="h-8 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>
    ),
    ssr: false,
  }
);

interface LazyServiceSlug1EnhancedProps {
  // Add any props that ServiceSlug1Enhanced accepts
  [key: string]: any;
}

export default function LazyServiceSlug1Enhanced(
  props: LazyServiceSlug1EnhancedProps
) {
  return (
    <LazyWrapper>
      <ServiceSlug1Enhanced {...props} />
    </LazyWrapper>
  );
}
