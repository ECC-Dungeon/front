import { http, HttpResponse } from 'msw';
import { networkDelay } from '../utils';
import { env } from '@/config/env';

export const gameStatusHandler = [
  // ゲームステータス取得
  http.post(`${env.API_URL}/admin/game/start2`, async () => {
    // ネットワーク遅延をシミュレート
    await networkDelay();

    try {
      const status = {
        result: 'success',
        msg: {
          Status: 'playing',
          NextNum: 2,
        },
      };

      return HttpResponse.json(status);
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || 'Server Error' },
        { status: 500 },
      );
    }
  }),
];
