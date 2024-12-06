import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { paths } from '@/config/paths';

// 認証が必要なページを保護するコンポーネント
export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  try {
    const gameToken = localStorage.getItem('gameToken');
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
