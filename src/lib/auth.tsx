import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { configureAuth } from 'react-query-auth';
import { z } from 'zod';
import { AuthResponse, User, UserResponse } from '@/types/api';
import { paths } from '@/config/paths';
import { api } from './api-client';

// 認証済みユーザーの情報を取得
const getUser = async (): Promise<User> => {
  const response = await api.get('/auth/user');

  return response.data;
};

// ログアウト
const logout = (): Promise<void> => {
  return api.post('/auth/logout');
};

// ログインフォームの入力値のスキーマ
export const loginInputSchema = z.object({
  email: z.string().min(1, 'Required').email('Invalid ID'),
  password: z.string().min(4, 'Required'),
});

// ログインフォームの入力値の型
export type LoginInput = z.infer<typeof loginInputSchema>;

const loginWithIdAndPassword = (data: LoginInput): Promise<AuthResponse> => {
  return api.post('/auth/login', data);
};

// 新規作成フォームの入力値のスキーマ
export const registerInputSchema = z.object({
  email: z.string().min(1, 'Required'),
  password: z.string().min(1, 'Required'),
});

export type RegisterInput = z.infer<typeof registerInputSchema>;

const registerWithEmailAndPassword = (
  data: RegisterInput,
): Promise<AuthResponse> => {
  return api.post('/auth/register', data);
};

// 認証ロジックを統一
const authConfig = {
  userFn: getUser,
  loginFn: async (data: LoginInput) => {
    const response = await loginWithIdAndPassword(data);
    return response.user;
  },
  registerFn: async (data: RegisterInput) => {
    const response = await registerWithEmailAndPassword(data);
    return response.user;
  },
  logoutFn: logout,
};

export const { useUser, useRegister, useLogin, useLogout, AuthLoader } =
  configureAuth(authConfig);

// 認証が必要なページを保護するコンポーネント
export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const user = useUser();
  const location = useLocation();

  if (!user.data) {
    console.log({
      pathname: location.pathname,
      redirectTo: paths.auth.login.getHref(location.pathname),
    });
    return (
      <Navigate to={paths.auth.login.getHref(location.pathname)} replace />
    );
  }

  return children;
};
