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
    result: {
      path: 'result',
      getHref: () => '/app/result',
    },
  },
} as const;
