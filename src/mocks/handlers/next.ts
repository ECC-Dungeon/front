import { http, HttpResponse } from 'msw';
import { networkDelay } from '../utils';
import { env } from '@/config/env';

export const progressHandler = [
  http.post(`${env.API_URL}/game/next`, async () => {
    // ネットワーク遅延をシミュレート
    await networkDelay();

    const test = [{
      msg: {
        NextNum: 1,
        AllClear: false,
        ClearFloor: [2,3],
      },
      result:"success"
    }]

    return HttpResponse.json({ data: test });
  }),
];
