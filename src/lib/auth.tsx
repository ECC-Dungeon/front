import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { paths } from '@/config/paths';
import { env } from '@/config/env';

// 認証が必要なページを保護するコンポーネント
export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  // 開発環境で認証をスキップする
  if (env.SKIP_AUTH) {
    return children;
  }

  try {
    const gameToken = localStorage.getItem('token');
    if (!gameToken) {
      console.log({
        pathname: location.pathname,
        redirect: paths.auth.login.getHref(location.pathname),
      });
      return (
        <Navigate to={paths.auth.login.getHref(location.pathname)} replace />
      );
    }
    return children;
  } catch (e) {
    console.log(e);
  }
};
