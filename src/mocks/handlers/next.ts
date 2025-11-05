import { http, HttpResponse } from 'msw';
import { networkDelay } from '../utils';
import { env } from '@/config/env';
import { getLeastCongestedFloor } from '../floor-manager';

export const progressHandler = [
  http.post(`${env.API_URL}/game/next`, async ({ request }) => {
    // ネットワーク遅延をシミュレート
    await networkDelay();

    try {
      // リクエストボディを取得
      const body = (await request.json()) as { clear_floor: number };
      const clearedFloor = body.clear_floor || -1;

      // チームIDを取得（本番ではAuthorizationヘッダーから取得）
      let teamId = request.headers.get('Authorization') || '';

      // トークンがない場合は、デフォルトのチームIDを使用
      if (!teamId) {
        teamId = 'default-team';
        console.warn('No token provided in /game/next, using default team ID');
      }

      // 混雑状況に基づいてフロアを割り当て
      const result = await getLeastCongestedFloor(teamId, clearedFloor);

      const response = {
        msg: {
          NextNum: result.nextFloor,
          AllClear: result.allClear,
          CleardFloor: result.clearedFloors,
        },
        result: 'success',
      };

      return HttpResponse.json(response);
    } catch (error) {
      console.error('Error in next handler:', error);
      return HttpResponse.json(
        { message: 'Internal server error' },
        { status: 500 },
      );
    }
  }),
];
