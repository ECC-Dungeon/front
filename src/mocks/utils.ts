import { delay } from 'msw';

// 認証トークンを保存するためのCookie名
export const AUTH_COOKIE = `token`;

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
