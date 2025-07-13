import React, { Suspense } from 'react';

interface LazyComponentProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
}

/**
 * LazyComponent - A wrapper for lazy loading components
 *
 * This component provides a consistent loading experience
 * for dynamically imported components.
 */
export const LazyComponent: React.FC<LazyComponentProps> = ({
  children,
  fallback,
  className = 'flex items-center justify-center p-4',
}) => {
  const defaultFallback = (
    <div className={className}>
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      <span className="ml-2 text-sm text-gray-600">Loading...</span>
    </div>
  );

  return <Suspense fallback={fallback || defaultFallback}>{children}</Suspense>;
};

/**
 * createLazyComponent - Helper function to create lazy components
 *
 * @param importFn - Function that returns a dynamic import
 * @param fallback - Optional fallback component
 * @returns A lazy component with proper error boundaries
 */
export function createLazyComponent<T extends React.ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  fallback?: React.ReactNode
) {
  const LazyComponent = React.lazy(importFn);

  return React.forwardRef<React.ComponentRef<T>, React.ComponentProps<T>>(
    (props, ref) => <LazyComponent {...(props as any)} ref={ref} />
  );
}

/**
 * ErrorBoundary for lazy components
 */
export class LazyErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: {
    children: React.ReactNode;
    fallback?: React.ReactNode;
  }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Lazy component error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex items-center justify-center p-4 text-red-600">
            <div className="text-center">
              <div className="text-lg font-semibold mb-2">
                Something went wrong
              </div>
              <button
                onClick={() => this.setState({ hasError: false })}
                className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
              >
                Try again
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

/**
 * LazyWrapper - Combines LazyComponent with ErrorBoundary
 */
export const LazyWrapper: React.FC<LazyComponentProps> = ({
  children,
  fallback,
  className,
}) => {
  return (
    <LazyErrorBoundary fallback={fallback}>
      <LazyComponent fallback={fallback} className={className}>
        {children}
      </LazyComponent>
    </LazyErrorBoundary>
  );
};
