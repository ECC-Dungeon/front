import Cookies from 'js-cookie';
import { env } from '@/config/env';
import { http, HttpResponse } from 'msw';
import { db, persistDb } from '../db';
import {
  AUTH_COOKIE,
  authenticate,
  hash,
  networkDelay,
  requireAuth,
} from '../utils';

type LinkTokenBody = {
  qrCode: string;
};

export const authHandlers = [
  // ユーザー登録
  // http.post(`${env.API_URL}/auth/register`, async ({ request }) => {
  //   // ネットワーク遅延をシミュレート
  //   await networkDelay();

  //   try {
  //     // リクエストボディを取得
  //     const userObject = (await request.json()) as RegisterBody;
  //     // 既存ユーザーを取得
  //     const existingUser = db.user.findFirst({
  //       where: {
  //         email: {
  //           equals: userObject.email,
  //         },
  //       },
  //     });
  //     // 既存ユーザーが存在する場合はエラーを返す
  //     if (existingUser) {
  //       return HttpResponse.json(
  //         { message: 'すでに存在します' },
  //         { status: 400 },
  //       );
  //     }
  //     // ユーザーを作成
  //     db.user.create({
  //       ...userObject,
  //       password: hash(userObject.password),
  //     });
  //     // ユーザーをmockDBに保存
  //     await persistDb('user');

  //     // ユーザー認証・認証トークンを取得
  //     const result = authenticate({
  //       email: userObject.email,
  //       password: userObject.password,
  //     });

  //     // 認証トークンをCookieに保存
  //     Cookies.set(AUTH_COOKIE, result.jwt, { path: '/' });

  //     // レスポンスを返す
  //     return HttpResponse.json(result, {
  //       headers: {
  //         'Set-Cookie': `${AUTH_COOKIE}=${result.jwt}; Path=/;`,
  //       },
  //     });
  //   } catch (error: any) {
  //     return HttpResponse.json(
  //       { message: error?.message || 'Server Error' },
  //       { status: 500 },
  //     );
  //   }
  // }),

  // // リンク用のトークンからゲーム用のトークンを取得するエンドポイント
  // http.post(`${env.API_URL}/admin/initlink`, async ({ request }) => {
  //   await networkDelay();

  //   try {
  //     const linkToken = (await request.json()) as LinkTokenBody;

  //     return HttpResponse.json({
  //       msg: 'res game token' + linkToken.qrCode,
  //       result: 'success',
  //     });
  //   } catch (error: any) {
  //     return HttpResponse.json(
  //       { message: error?.message || 'Server Error' },
  //       { status: 500 },
  //     );
  //   }
  // }),

  // http.get(`${env.API_URL}/auth/user`, async ({ cookies }) => {
  //   // ネットワーク遅延をシミュレート
  //   await networkDelay();

  //   try {
  //     // クッキーの認証トークンからユーザーを取得
  //     const { user } = requireAuth(cookies);
  //     // ユーザー情報を返却
  //     return HttpResponse.json({ data: user });
  //   } catch (error: any) {
  //     return HttpResponse.json(
  //       { message: error?.message || 'Server Error' },
  //       { status: 500 },
  //     );
  //   }
  // }),
];
