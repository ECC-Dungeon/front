import { http, HttpResponse } from 'msw';
import { networkDelay } from '../utils';
import { env } from '@/config/env';
import { db, persistDb } from '../db';

export const floorHandler = [
  http.get(`${env.API_URL}/admin/game/floor`, async ({ request }) => {
    // ネットワーク遅延をシミュレート
    await networkDelay();

    // ヘッダーからgameidを取得
    const gameId = request.headers.get('gameid');
    if (gameId === null) {
      return HttpResponse.json(
        { result: 'error', msg: 'gameid is required' },
        { status: 400 },
      );
    }

    // ゲームIDからフロア情報を取得
    let floor = db.floor.findMany({
      where: {
        GameID: {
          equals: gameId,
        },
      },
    });

    // データがない場合は初期データを作成
    if (floor.length === 0) {
      const initialFloors = [
        { GameID: gameId, FloorNum: 1, Name: 'エントランス', Enabled: true },
        { GameID: gameId, FloorNum: 2, Name: '謎の部屋', Enabled: true },
        { GameID: gameId, FloorNum: 3, Name: '休憩所', Enabled: true },
        { GameID: gameId, FloorNum: 4, Name: '図書室', Enabled: false },
        { GameID: gameId, FloorNum: 5, Name: '宝物庫', Enabled: true },
        { GameID: gameId, FloorNum: 6, Name: 'ボス部屋', Enabled: true },
        { GameID: gameId, FloorNum: 7, Name: '秘密の部屋', Enabled: false },
      ];

      initialFloors.forEach((data) => {
        db.floor.create(data);
      });

      await persistDb('floor');

      floor = db.floor.findMany({
        where: {
          GameID: {
            equals: gameId,
          },
        },
      });
    }

    return HttpResponse.json({ result: 'success', msg: floor });
  }),

  http.post(`${env.API_URL}/admin/game/floor`, async ({ request }) => {
    await networkDelay();

    // ヘッダーからgameidを取得
    const gameId = request.headers.get('gameid');
    if (gameId === null) {
      return HttpResponse.json(
        { result: 'error', msg: 'gameid is required' },
        { status: 400 },
      );
    }

    const test = [
      {
        GameID: gameId,
        FloorNum: 1,
        Name: 'test',
        Enabled: true,
      },
      {
        GameID: gameId,
        FloorNum: 2,
        Name: 'test',
        Enabled: true,
      },
      {
        GameID: gameId,
        FloorNum: 3,
        Name: 'test',
        Enabled: false,
      },
      {
        GameID: gameId,
        FloorNum: 4,
        Name: 'test',
        Enabled: false,
      },
      {
        GameID: gameId,
        FloorNum: 5,
        Name: 'test',
        Enabled: true,
      },
      {
        GameID: gameId,
        FloorNum: 6,
        Name: 'test',
        Enabled: true,
      },
      {
        GameID: gameId,
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

    return HttpResponse.json({ result: 'success' });
  }),
];
