import Cookies from 'js-cookie';
import { http, HttpResponse } from 'msw';
import { networkDelay, TEAM_COOKIE } from '../utils';
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
      // チーム名をcookieに保存
      Cookies.set(TEAM_COOKIE, teamName.name, { path: '/' });

      return HttpResponse.json(teamName, {
        headers: {
          'Set-Cookie': `${TEAM_COOKIE}=${teamName.name}; Path=/`,
        },
      });
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || 'Server Error' },
        { status: 500 },
      );
    }
  }),
];
