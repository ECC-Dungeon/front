import { http, HttpResponse } from 'msw';
import { networkDelay } from '../utils';
import { env } from '@/config/env';
import { db, persistDb } from '../db';

export const floorHandler = [
  http.get(`${env.API_URL}/game/floor`, async ({ request }) => {
    // ネットワーク遅延をシミュレート
    await networkDelay();

    // ヘッダーからGameIDを取得
    const gameId = request.headers.get('GameID');
    if (gameId === null) {
      return HttpResponse.json(
        { message: 'GameID is required' },
        { status: 400 },
      );
    }

    // ゲームIDからフロア情報を取得
    const floor = db.floor.findMany({
      where: {
        GameID: {
          equals: gameId,
        },
      },
    });

    return HttpResponse.json({ name: floor });
  }),

  http.post(`${env.API_URL}/game/floor`, async ({}) => {
    await networkDelay();

    const test = [
      {
        GameID: 'test',
        FloorNum: 1,
        Name: 'test',
        Enabled: true,
      },
      {
        GameID: 'test',
        FloorNum: 2,
        Name: 'test',
        Enabled: false,
      },
      {
        GameID: 'test',
        FloorNum: 3,
        Name: 'test',
        Enabled: true,
      },
      {
        GameID: 'test',
        FloorNum: 4,
        Name: 'test',
        Enabled: false,
      },
      {
        GameID: 'test',
        FloorNum: 5,
        Name: 'test',
        Enable: false,
      },
      {
        GameID: 'test',
        FloorNum: 6,
        Name: 'test',
        Enabled: true,
      },
      {
        GameID: 'test',
        FloorNum: 7,
        Name: 'test',
        Enabled: false,
      },
    ];

    // データベースに保存
    for (const data of test) {
      db.floor.create(data);
    }

    await persistDb('floor');

    return HttpResponse.json({ message: 'success' });
  }),
];
