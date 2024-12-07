import { http, HttpResponse } from 'msw';
import { networkDelay } from '../utils';
import { env } from '@/config/env';
import { db, persistDb } from '../db';

type TeamNameBody = {
  name: string;
};

export const teamNameHandler = [
  // チーム名保存
  http.put(`${env.API_URL}/admin/game/tname`, async ({ request }) => {
    // ネットワーク遅延をシミュレート
    await networkDelay();

    try {
      // リクエストボディを取得
      // const body = JSON.parse(request)

      console.log('teamName', request);
      // チーム名を保存
      db.team.create({
        // TODO :なおす
        // ...,
      });
      // チーム名をmockDBに保存
      await persistDb('team');

      return HttpResponse.json(teamName, { status: 200 });
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || 'Server Error' },
        { status: 500 },
      );
    }
  }),

  // チーム情報取得
  http.get(`${env.API_URL}/admin/game/team`, async () => {
    // ネットワーク遅延をシミュレート
    await networkDelay();

    try {
      // モックデータ
      const teamData = {
        msg: {
          TeamID: '31442d20-eca4-481b-9565-cc0bd18eef30',
          Name: 'test',
          GameID: 'f7f3ea7-562c-438c-837a-771688919149',
          Status: 'used',
          NickName: 'test',
          Creator: 'cchp5x6dajt1adi',
          CreatedAt: 1733307694,
        },
        result: 'success',
      };

      // 正しいレスポンスを返却
      return HttpResponse.json({ data: teamData });
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || 'Failed to fetch team data' },
        { status: 500 },
      );
    }
  }),
];
