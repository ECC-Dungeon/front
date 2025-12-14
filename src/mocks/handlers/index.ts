import { HttpResponse, http } from 'msw';

import { env } from '@/config/env';

import { networkDelay } from '../utils';
import { getFloorCongestionStatus } from '../floor-manager';

import { teamNameHandler } from './team-name';
import { floorHandler } from './floor';
import { gameStatusHandler } from './game-status';
import { progressHandler } from './next';

export const handlers = [
  ...teamNameHandler,
  ...floorHandler,
  ...gameStatusHandler,
  ...progressHandler,
  http.get(`${env.API_URL}/healthcheck`, async () => {
    await networkDelay();
    return HttpResponse.json({ ok: true });
  }),
  // デバッグ用: フロアの混雑状況を取得
  http.get(`${env.API_URL}/debug/floor-status`, async () => {
    const status = await getFloorCongestionStatus();
    return HttpResponse.json({ floors: status });
  }),
  // デバッグ用: ゲーム進捗データを取得
  http.get(`${env.API_URL}/debug/game-progress`, async () => {
    const { loadDb } = await import('../db');
    const db = await loadDb();
    return HttpResponse.json({
      gameProgress: db.gameProgress || [],
      rawDb: db,
    });
  }),
];
