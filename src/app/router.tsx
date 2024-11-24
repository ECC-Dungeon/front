import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { paths } from '@/config/paths';
import { ProtectedRoute } from '@/lib/auth';
import { AppRoot, AppRootErrorBoundary } from './routes/app/root';

export const createAppRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    // home
    {
      path: paths.home.path,
      lazy: async () => {
        const { LoginRoute } = await import('./routes/auth/login');
        return { Component: LoginRoute };
      },
    },
    // login
    {
      path: paths.auth.login.path,
      lazy: async () => {
        const { LoginRoute } = await import('./routes/auth/login');
        return { Component: LoginRoute };
      },
    },
    {
      path: paths.app.root.path,
      element: (
        <ProtectedRoute>
          <AppRoot />
        </ProtectedRoute>
      ),
      ErrorBoundary: AppRootErrorBoundary,
      children: [
        {
          path: paths.app.team.path,
          lazy: async () => {
            const { CreateTeamNameRoute } = await import(
              './routes/app/create-team-name'
            );
            return {
              Component: CreateTeamNameRoute,
            };
          },
        },
        {
          path: paths.app.explanation.path,
          lazy: async () => {
            const { ExplanationRoute } = await import(
              './routes/app/explanation'
            );
            return {
              Component: ExplanationRoute,
            };
          },
          ErrorBoundary: AppRootErrorBoundary,
        },
        {
          path: paths.app.map.path,
          lazy: async () => {
            const { MapRoute } = await import('./routes/app/map');
            return {
              Component: MapRoute,
            };
          },
        },
        {
          path: paths.app.floor.path,
          lazy: async () => {
            const { FloorRoute } = await import('./routes/app/floor');
            return {
              Component: FloorRoute,
            };
          },
        },
        {
          path: paths.app.completedQr.path,
          lazy: async () => {
            const { CompletedQrRoute } = await import('./routes/app/completed-qr');
            return {
              Component: CompletedQrRoute,
            };
          },
        },
      ],
    },
    // not found
    {
      path: '*',
      lazy: async () => {
        const { NotFoundRoute } = await import('./routes/not-found');
        return {
          Component: NotFoundRoute,
        };
      },
      // ErrorBoundary: AppRootErrorBoundary,
    },
  ]);

export const Router = () => {
  const queryClient = useQueryClient();

  const router = useMemo(() => createAppRouter(queryClient), [queryClient]);

  return <RouterProvider router={router} />;
};
