import { get } from 'react-hook-form';

export const paths = {
  home: {
    path: '/',
    getHref: () => '/auth/login',
  },

  auth: {
    login: {
      path: '/auth/login',
      getHref: (redirectTo?: string | null | undefined) =>
        `/auth/login${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
    },
  },

  app: {
    root: {
      path: '/app',
      getHref: () => '/app',
    },
    team: {
      path: 'create-team-name',
      getHref: () => '/app/create-team-name',
    },
    explanation: {
      path: 'explanation',
      getHref: () => '/app/explanation',
    },
    map: {
      path: 'map',
      getHref: () => '/app/map',
    },
    floor: {
      path: 'floor',
      getHref: () => '/app/floor',
    },
    completedQr: {
      path: 'completed-qr',
      getHref: () => '/app/completed-qr',
    },
    getQr: {
      path: 'get-qr',
      getHref: () => '/app/get-qr',
    },
  },
} as const;
