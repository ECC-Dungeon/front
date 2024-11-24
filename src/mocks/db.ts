import { factory, primaryKey } from '@mswjs/data';
import { nanoid } from 'nanoid';

// モデルの定義
const models = {
  user: {
    id: primaryKey(nanoid),
    email: String,
    password: String,
    createdAt: () => Date.now(),
  },
  team: {
    id: primaryKey(nanoid),
    name: String,
    createdAt: () => Date.now(),
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

  return Object.assign(
    JSON.parse(window.localStorage.getItem('msw-db') || '{}'),
  );
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
