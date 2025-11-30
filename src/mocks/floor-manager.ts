import { loadDb, storeDb, db as mswDb } from './db';

interface Floor {
  id: string;
  floorNum: number;
  name: string;
  enabled: boolean;
  currentCount: number;
  maxCapacity: number;
}

interface GameProgress {
  teamId: string;
  currentFloor: number;
  clearedFloors: number[];
  timestamp: number;
}

interface MockDb {
  teams: any[];
  floors: Floor[];
  gameProgress: GameProgress[];
}

/**
 * 利用可能なフロア番号を取得（enabled: trueのフロアのみ、1階を除く）
 * db.floor（handlers/floor.tsで使用）からEnabledフロアを取得
 */
const getAvailableFloors = (gameId: string = 'default-game'): number[] => {
  const floors = mswDb.floor.findMany({
    where: {
      GameID: {
        equals: gameId,
      },
    },
  });

  if (floors.length === 0) {
    // フォールバック: デフォルト値
    return [2, 3, 5, 6];
  }

  return floors
    .filter((floor) => floor.Enabled && floor.FloorNum !== 1)
    .map((floor) => floor.FloorNum)
    .sort((a, b) => a - b);
};

/**
 * データベースの初期化（初回のみ）
 */
export const initializeFloorDb = async (): Promise<MockDb> => {
  let db = (await loadDb()) as MockDb;

  // floors が存在しない場合、初期データで初期化
  if (!db.floors || !Array.isArray(db.floors)) {
    db = {
      teams: db.teams || [],
      floors: [
        {
          id: 'floor-1',
          floorNum: 1,
          name: '1F - エントランス',
          enabled: true,
          currentCount: 0,
          maxCapacity: 5,
        },
        {
          id: 'floor-2',
          floorNum: 2,
          name: '2F - 謎の部屋',
          enabled: true,
          currentCount: 0,
          maxCapacity: 5,
        },
        {
          id: 'floor-3',
          floorNum: 3,
          name: '3F - 休憩所',
          enabled: false,
          currentCount: 0,
          maxCapacity: 5,
        },
        {
          id: 'floor-4',
          floorNum: 4,
          name: '4F - 図書室',
          enabled: false,
          currentCount: 0,
          maxCapacity: 5,
        },
        {
          id: 'floor-5',
          floorNum: 5,
          name: '5F - 宝物庫',
          enabled: true,
          currentCount: 0,
          maxCapacity: 5,
        },
        {
          id: 'floor-6',
          floorNum: 6,
          name: '6F - ボス部屋',
          enabled: true,
          currentCount: 0,
          maxCapacity: 5,
        },
      ],
      gameProgress: [],
    };
    await storeDb(JSON.stringify(db, null, 2));
  }

  // gameProgressが存在しない場合、初期化
  if (!db.gameProgress || !Array.isArray(db.gameProgress)) {
    db.gameProgress = [];
    await storeDb(JSON.stringify(db, null, 2));
  }
  return db;
};

/**
 * ランダムにフロアを選択（初回）
 * 注意: この関数を呼ぶ前に initializeFloorDb() を呼ぶこと
 */
export const getRandomFloor = (gameId: string = 'default-game'): number => {
  const availableFloors = getAvailableFloors(gameId);

  // 利用可能なフロアがない場合
  if (availableFloors.length === 0) {
    return 1; // デフォルト
  }

  // Crypto APIを使用してより確実な乱数を生成
  const randomBytes = new Uint32Array(1);
  crypto.getRandomValues(randomBytes);

  // ランダムインデックスを取得
  const randomIndex = randomBytes[0] % availableFloors.length;
  const selectedFloor = availableFloors[randomIndex];

  return selectedFloor;
};

/**
 * 現在のゲーム進捗を取得
 */
export const getGameProgress = async (
  teamId: string,
  gameId: string = 'default-game',
): Promise<{
  currentFloor: number;
  clearedFloors: number[];
  allClear: boolean;
}> => {
  const db = await initializeFloorDb();
  const availableFloors = getAvailableFloors(gameId);

  // チームの進捗を取得
  const progress = db.gameProgress.find((p) => p.teamId === teamId);

  if (!progress) {
    // 初回: ランダムにフロアを割り当て
    const randomFloor = getRandomFloor(gameId);
    const newProgress = {
      teamId,
      currentFloor: randomFloor,
      clearedFloors: [],
      timestamp: Date.now(),
    };
    db.gameProgress.push(newProgress);

    // 初回のフロアのカウントを増やす
    const initialFloorData = db.floors.find((f) => f.floorNum === randomFloor);
    if (initialFloorData) {
      initialFloorData.currentCount++;
    }

    // データベースに保存
    await storeDb(JSON.stringify(db, null, 2));

    console.log('Initial floor assignment:', {
      teamId,
      randomFloor,
      message: '初回はランダムフロアをそのまま返す',
    });

    return {
      currentFloor: randomFloor,
      clearedFloors: [],
      allClear: false,
    };
  }

  // まだクリアしていないフロアを取得
  const unclearedFloors = availableFloors.filter(
    (num: number) => !progress.clearedFloors.includes(num),
  );

  // 全フロアクリア済みの場合
  const allClear = unclearedFloors.length === 0;

  return {
    currentFloor: progress.currentFloor,
    clearedFloors: progress.clearedFloors,
    allClear,
  };
};

/**
 * 混雑状況に基づいて最も空いているフロアを返す
 */
export const getLeastCongestedFloor = async (
  teamId: string,
  clearedFloor: number,
  gameId: string = 'default-game',
): Promise<{
  nextFloor: number;
  clearedFloors: number[];
  allClear: boolean;
}> => {
  const db = await initializeFloorDb();
  const availableFloors = getAvailableFloors(gameId);

  // チームの進捗を取得または作成
  let progress = db.gameProgress.find((p) => p.teamId === teamId);

  if (!progress) {
    // 初回: ランダムにフロアを割り当て
    const randomFloor = getRandomFloor(gameId);
    progress = {
      teamId,
      currentFloor: randomFloor,
      clearedFloors: [],
      timestamp: Date.now(),
    };
    db.gameProgress.push(progress);

    // 初回のフロアのカウントを増やす
    const initialFloorData = db.floors.find((f) => f.floorNum === randomFloor);
    if (initialFloorData) {
      initialFloorData.currentCount++;
    }

    // データベースに保存
    await storeDb(JSON.stringify(db, null, 2));

    console.log('Initial floor assignment:', {
      teamId,
      randomFloor,
      message: '初回はランダムフロアをそのまま返す',
    });

    // 初回はランダムフロアをそのまま返す
    return {
      nextFloor: randomFloor,
      clearedFloors: [],
      allClear: false,
    };
  } else {
    // 現在のフロアのカウントを減らす
    const currentFloorData = db.floors.find(
      (f) => f.floorNum === progress!.currentFloor,
    );
    if (currentFloorData && currentFloorData.currentCount > 0) {
      currentFloorData.currentCount--;
    }

    // クリアしたフロアを記録
    if (clearedFloor !== -1 && !progress.clearedFloors.includes(clearedFloor)) {
      progress.clearedFloors.push(clearedFloor);
    }
  }

  // まだクリアしていないフロアを取得
  const unclearedFloors = availableFloors.filter(
    (num: number) => !progress.clearedFloors.includes(num),
  );

  // 全フロアクリア済みの場合
  if (unclearedFloors.length === 0) {
    await storeDb(JSON.stringify(db, null, 2));
    return {
      nextFloor: progress.currentFloor,
      clearedFloors: progress.clearedFloors,
      allClear: true,
    };
  }

  // 最も空いているフロアを見つける
  const floorCongestion = unclearedFloors
    .map((floorNum: number) => {
      const floorData = db.floors.find((f) => f.floorNum === floorNum);
      return {
        floorNum,
        congestion: floorData
          ? floorData.currentCount / floorData.maxCapacity
          : 0,
        currentCount: floorData?.currentCount || 0,
      };
    })
    .sort((a: any, b: any) => a.congestion - b.congestion);

  const nextFloor = floorCongestion[0].floorNum;

  // 次のフロアのカウントを増やす
  const nextFloorData = db.floors.find((f) => f.floorNum === nextFloor);
  if (nextFloorData) {
    nextFloorData.currentCount++;
  }

  // 進捗を更新
  progress.currentFloor = nextFloor;
  progress.timestamp = Date.now();

  // データベースに保存
  await storeDb(JSON.stringify(db, null, 2));

  console.log('Floor assignment:', {
    teamId,
    nextFloor,
    clearedFloors: progress.clearedFloors,
    floorCongestion: floorCongestion.map((f: any) => ({
      floor: f.floorNum,
      count: f.currentCount,
    })),
  });

  return {
    nextFloor,
    clearedFloors: progress.clearedFloors,
    allClear: false,
  };
};

/**
 * デバッグ用: 現在のフロアの混雑状況を取得
 */
export const getFloorCongestionStatus = async () => {
  const db = await initializeFloorDb();
  return db.floors.map((f: any) => ({
    floorNum: f.floorNum,
    currentCount: f.currentCount,
    maxCapacity: f.maxCapacity,
    congestion: ((f.currentCount / f.maxCapacity) * 100).toFixed(1) + '%',
  }));
};
