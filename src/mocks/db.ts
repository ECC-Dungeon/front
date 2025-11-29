import { factory, primaryKey } from '@mswjs/data';
import { nanoid } from 'nanoid';

// モデルの定義
const models = {
  team: {
    TeamID: primaryKey(nanoid),
    Name: String,
    GameID: String,
    Status: String,
    NickName: String,
    Creator: String,
    CreatedAt: Number,
  },
  floor: {
    id: primaryKey(nanoid),
    GameID: String,
    FloorNum: Number,
    Name: String,
    Enabled: Boolean,
  },
};

// モックでDBの作成
export const db = factory(models);

export type Model = keyof typeof models;

// モックデータの保管場所
const dbFilePath = 'mocked-db.json';

// データベースの初期化
export const initializeDb = async () => {
  const database = await loadDb();

  Object.entries(db).forEach(([key, model]) => {
    const dataEntre = database[key];
    if (dataEntre) {
      dataEntre?.forEach((entry: Record<string, any>) => {
        model.create(entry);
      });
    }
  });

  // 初期フロアデータがない場合は作成
  if (db.floor.count() === 0) {
    const defaultGameId = 'default-game';
    const initialFloors = [
      {
        GameID: defaultGameId,
        FloorNum: 1,
        Name: 'エントランス',
        Enabled: true,
      },
      {
        GameID: defaultGameId,
        FloorNum: 2,
        Name: '謎の部屋',
        Enabled: true,
      },
      {
        GameID: defaultGameId,
        FloorNum: 3,
        Name: '休憩所',
        Enabled: false,
      },
      {
        GameID: defaultGameId,
        FloorNum: 4,
        Name: '図書室',
        Enabled: false,
      },
      {
        GameID: defaultGameId,
        FloorNum: 5,
        Name: '宝物庫',
        Enabled: true,
      },
      {
        GameID: defaultGameId,
        FloorNum: 6,
        Name: 'ボス部屋',
        Enabled: true,
      },
      {
        GameID: defaultGameId,
        FloorNum: 7,
        Name: '秘密の部屋',
        Enabled: false,
      },
    ];

    initialFloors.forEach((floor) => {
      db.floor.create(floor);
    });

    await persistDb('floor');
  }
};

// jsonに保存されているモックデータの読みこみ
export const loadDb = async () => {
  // node環境の場合はファイルから、ブラウザ環境の場合はlocalStorageから
  if (typeof window === 'undefined') {
    const { readFile, writeFile } = await import('fs/promises');
    try {
      const data = await readFile(dbFilePath, 'utf8');
      return JSON.parse(data);
    } catch (error: any) {
      // ファイルがない時
      if (error?.code === 'ENOENT') {
        const emptyDb = {};
        await writeFile(dbFilePath, JSON.stringify(emptyDb, null, 2));
        return emptyDb;
      } else {
        return null;
      }
    }
  }

  const stored = window.localStorage.getItem('msw-db');
  const result = Object.assign(JSON.parse(stored || '{}'));
  return result;
};

// データの保存を行う
export const storeDb = async (data: string) => {
  if (typeof window === 'undefined') {
    const { writeFile } = await import('fs/promises');
    await writeFile(dbFilePath, data);
  } else {
    window.localStorage.setItem('msw-db', data);
  }
};

// データの永続化を行う
export const persistDb = async (model: Model) => {
  if (process.env.NODE_ENV === 'test') return;
  const data = await loadDb();
  data[model] = db[model].getAll();
  await storeDb(JSON.stringify(data));
};

// ローカルストレージのデータをリセット
export const resetDb = () => {
  window.localStorage.clear();
};
