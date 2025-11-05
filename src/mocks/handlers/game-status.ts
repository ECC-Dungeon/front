import { http, HttpResponse } from 'msw';
import { networkDelay } from '../utils';
import { env } from '@/config/env';
import { getGameProgress } from '../floor-manager';

export const gameStatusHandler = [
  // ゲームステータス取得
  http.post(`${env.API_URL}/admin/game/start2`, async ({ request }) => {
    // ネットワーク遅延をシミュレート
    await networkDelay();

    try {
      // チームIDを取得（本番ではAuthorizationヘッダーから取得）
      let teamId =
        request.headers.get('Authorization') ||
        request.headers.get('GameID') ||
        '';

      // トークンがない場合は、デフォルトのチームIDを使用
      if (!teamId) {
        teamId = 'default-team';
        console.warn('No token provided, using default team ID');
      }

      // 現在のゲーム進捗を取得（クリア済みフロアを除外）
      const result = await getGameProgress(teamId);

      const status = {
        result: 'success',
        msg: {
          NextNum: result.currentFloor,
          AllClear: result.allClear,
          CleardFloor: result.clearedFloors,
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
