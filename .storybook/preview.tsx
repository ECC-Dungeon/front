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
  // 3階層用のハンドラー
  http.get(`${env.API_URL}/admin/game/floor`, ({ request }) => {
    const gameId = request.headers.get('gameid');

    if (gameId === 'three-floors-game') {
      return HttpResponse.json({
        result: 'success',
        msg: [
          { GameID: gameId, FloorNum: 1, Name: 'Floor 1', Enabled: true },
          { GameID: gameId, FloorNum: 2, Name: 'Floor 2', Enabled: true },
          { GameID: gameId, FloorNum: 3, Name: 'Floor 3', Enabled: true },
        ],
      });
    }

    if (gameId === 'four-floors-game') {
      return HttpResponse.json({
        result: 'success',
        msg: [
          { GameID: gameId, FloorNum: 1, Name: 'Floor 1', Enabled: true },
          { GameID: gameId, FloorNum: 2, Name: 'Floor 2', Enabled: true },
          { GameID: gameId, FloorNum: 3, Name: 'Floor 3', Enabled: true },
          { GameID: gameId, FloorNum: 4, Name: 'Floor 4', Enabled: true },
        ],
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
