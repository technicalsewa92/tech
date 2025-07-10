'use client';

// ✅ Updated to use @tanstack/react-query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
import { logger } from '@/lib/logger';

// ✅ Modern React Query configuration
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // ✅ Stale time to reduce unnecessary refetches
        staleTime: 60 * 1000, // 1 minute
        // ✅ Cache time for offline experience (renamed from cacheTime)
        gcTime: 1000 * 60 * 60 * 24, // 24 hours
        // ✅ Retry configuration
        retry: (failureCount: number, error: any) => {
          // Don't retry on 4xx errors
          if (error?.response?.status >= 400 && error?.response?.status < 500) {
            return false;
          }
          return failureCount < 3;
        },
        // ✅ Refetch on window focus for better UX
        refetchOnWindowFocus: false,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (typeof window === 'undefined') {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export default function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}

// ✅ Re-export hooks for convenience
export { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
