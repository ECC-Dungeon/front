import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http, HttpResponse } from 'msw';
import { queryConfig } from '../src/lib/query';
import { worker } from '../src/mocks/browser';
import { env } from '../src/config/env';
import '../src/index.css';

// Storybook用のカスタムハンドラー
const storybookHandlers = [
  http.get(`${env.API_URL}/admin/game/floor`, ({ request }) => {
    const gameId = request.headers.get('gameid');

    // 階層数のマッピング
    const floorCounts: Record<string, number> = {
      'one-floor-game': 1,
      'two-floors-game': 2,
      'three-floors-game': 3,
      'four-floors-game': 4,
      'five-floors-game': 5,
      'six-floors-game': 6,
    };

    const floorCount = gameId ? floorCounts[gameId] : undefined;

    if (floorCount) {
      const floors = Array.from({ length: floorCount }, (_, i) => ({
        GameID: gameId,
        FloorNum: i + 1,
        Name: `Floor ${i + 1}`,
        Enabled: true,
      }));

      return HttpResponse.json({
        result: 'success',
        msg: floors,
      });
    }

    return HttpResponse.json({ result: 'error', msg: 'Unknown gameId' }, { status: 400 });
  }),
];

// MSW workerを起動
if (typeof window !== 'undefined') {
  worker.start({
    onUnhandledRequest: 'bypass',
  });
  // Storybook用のハンドラーを追加
  worker.use(...storybookHandlers);
}

const queryClient = new QueryClient({
  defaultOptions: queryConfig,
});

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};

export const decorators = [
  (Story) => (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Story />
      </Router>
    </QueryClientProvider>
  ),
];
