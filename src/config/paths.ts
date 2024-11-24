export const paths = {
  home: {
    path: '/',
    getHref: () => '/',
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
  },
} as const;
