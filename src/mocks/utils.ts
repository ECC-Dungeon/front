import { delay } from 'msw';
import { db } from './db';
import Cookies from 'js-cookie';

// 認証トークンを保存するためのCookie名
export const AUTH_COOKIE = `ecc_dungeon_app_token`;

/**
 * 文字列をDJB2でハッシュ化
 * @param str
 *
 * @returns { string }
 */
export const hash = (str: string) => {
  let acc = 5381;
  for (let i = 0; i < str.length; i++) {
    acc = (acc << 5) + acc + str.charCodeAt(i);
  }
  return acc.toString();
};

/**
 * オブジェクトをBase64エンコード
 * @param obj
 *
 * @return { string }
 */
export const encode = (obj: any) => {
  const btoa =
    typeof window === 'undefined'
      ? (str: string) => Buffer.from(str, 'binary').toString('base64')
      : window.btoa;
  return btoa(JSON.stringify(obj));
};

/**
 * Base64エンコードされた文字列をデコード
 * @param str
 *
 * @return { any }
 */
export const decode = (str: string) => {
  const atob =
    typeof window === 'undefined'
      ? (str: string) => Buffer.from(str, 'base64').toString('binary')
      : window.atob;
  return JSON.parse(atob(str));
};

/**
 * オブジェクトから指定したキーを除外
 * @param obj
 * @param keys
 *
 * @return { T }
 */
const omit = <T extends object>(obj: T, keys: string[]): T => {
  const result = {} as T;
  for (const key in obj) {
    if (!keys.includes(key)) {
      result[key] = obj[key];
    }
  }

  return result;
};

/**
 * ユーザー情報からパスワードとiatを除外
 * @param user
 *
 * @return { O }
 */
export const sanitizeUser = <O extends object>(user: O) => {
  return omit<O>(user, ['password', 'iat']);
};

/**
 * ユーザー認証
 * @param email
 * @param password
 *
 * @returns { User, jwt }
 * @throws { Error }
 */
export function authenticate({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = db.user.findFirst({
    where: {
      email: {
        equals: email,
      },
    },
  });

  // パスワードが一致するか確認
  if (user?.password === hash(password)) {
    const sanitizedUser = sanitizeUser(user);
    const encodedToken = encode(sanitizedUser);
    return { user: sanitizedUser, jwt: encodedToken };
  }

  const error = new Error('Invalid email or password');
  throw error;
}

/**
 * ネットワーク遅延
 *
 * @return { Promise<void> }
 */
export const networkDelay = () => {
  const delayTime = import.meta.env.TEST
    ? 200
    : Math.floor(Math.random() * 700) + 300;
  return delay(delayTime);
};

/**
 * 認証トークンから認証されているかを確認
 * @param cookies
 *
 * @return { user, error }
 */
export function requireAuth(cookies: Record<string, string>) {
  try {
    // リクエスト or クッキーからトークンを取得
    const encodedToken = cookies[AUTH_COOKIE] || Cookies.get(AUTH_COOKIE);
    if (!encodedToken) {
      return { error: 'Unauthorized', user: null };
    }
    // トークンをデコード
    const decodedToken = decode(encodedToken) as { id: string };
    // ユーザー情報を取得
    const user = db.user.findFirst({
      where: {
        id: {
          equals: decodedToken.id,
        },
      },
    });
    if (!user) {
      return { error: 'Unauthorized', user: null };
    }
    // ユーザー情報を返却
    return { user: sanitizeUser(user) };
  } catch (err: any) {
    return { error: 'Unauthorized', user: null };
  }
}
