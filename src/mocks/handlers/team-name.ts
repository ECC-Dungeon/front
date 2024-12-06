import { http, HttpResponse } from 'msw';
import { networkDelay } from '../utils';
import { env } from '@/config/env';
import { db, persistDb } from '../db';

type TeamNameBody = {
  name: string;
};

export const teamNameHandler = [
  // チーム名保存
  http.post(`${env.API_URL}/save/team-name`, async ({ request }) => {
    // ネットワーク遅延をシミュレート
    await networkDelay();

    try {
      // リクエストボディを取得
      const teamName = (await request.json()) as TeamNameBody;
      // チーム名を保存
      db.team.create({
        ...teamName,
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

  http.get(`${env.API_URL}/get/team-name`, async ({}) => {
    // ネットワーク遅延をシミュレート
    await networkDelay();

    const teamName = 'test return';

    return HttpResponse.json({ name: teamName });
  }),
];
