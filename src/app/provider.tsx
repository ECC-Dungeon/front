import React, { Suspense, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

import { MainError } from '@/components/errors/main';
import { queryConfig } from '@/lib/query';
import { AuthLoader } from '@/lib/auth';

type ProviderProps = {
  children: React.ReactNode;
};

export const Provider = ({ children }: ProviderProps) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: queryConfig,
      }),
  );

  return (
    <Suspense fallback={<div></div>}>
      {/* sスピナーを表示する */}
      {/* エラー画面を作成する */}
      <ErrorBoundary FallbackComponent={MainError}>
        <QueryClientProvider client={queryClient}>
          <AuthLoader
            renderLoading={() => (
              <div className="flex h-screen w-screen items-center justify-center">
                {/* スピナーを表示する */}
              </div>
            )}
          >
            {children}
          </AuthLoader>
        </QueryClientProvider>
      </ErrorBoundary>
    </Suspense>
  );
};
