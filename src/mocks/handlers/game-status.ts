import { http, HttpResponse } from 'msw';
import { networkDelay } from '../utils';
import { env } from '@/config/env';


export const gameStatusHandler = [
  // チーム名保存
  http.post(`${env.API_URL}/admin/admin/start2`, async () => {
    // ネットワーク遅延をシミュレート
    await networkDelay();

    try {
      const status = {
        result: 'success',
      };

      return HttpResponse.json({ data: status });
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || 'Server Error' },
        { status: 500 },
      );
    }
  }),
];
