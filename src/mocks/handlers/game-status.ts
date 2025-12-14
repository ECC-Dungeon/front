import { http, HttpResponse } from 'msw';
import { networkDelay } from '../utils';
import { env } from '@/config/env';
import { initializeFloorDb } from '../floor-manager';

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
      }

      // DBから現在の進捗を確認（新規フロア割り当ては行わない）
      const db = await initializeFloorDb();
      const progress = db.gameProgress.find((p) => p.teamId === teamId);

      const status = {
        result: 'success',
        msg: {
          NextNum: progress?.currentFloor || -1, // 進捗がない場合は-1
          AllClear: false,
          CleardFloor: progress?.clearedFloors || [],
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
