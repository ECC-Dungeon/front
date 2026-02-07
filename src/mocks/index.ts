import { env } from '@/config/env';

export const enableMocking = async () => {
  if (env.ENABLE_API_MOCKING) {
    const { worker } = await import('./browser');
    const { initializeDb } = await import('./db');
    await initializeDb();

    // mock用のデフォルトgameIdをlocalStorageにセット
    if (!localStorage.getItem('gameId')) {
      localStorage.setItem('gameId', 'f7f3ea7-562c-438c-837a-771688919149');
    }

    return worker.start({
      serviceWorker: {
        url: '/user/mockServiceWorker.js',
      },
      onUnhandledRequest: 'bypass',
      quiet: false,
    });
  }
};
