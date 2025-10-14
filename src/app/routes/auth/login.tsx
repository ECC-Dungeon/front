import { useNavigate, useSearchParams } from 'react-router-dom';

import { paths } from '@/config/paths';
import { LoginForm } from '@/feature/login/components/login-form';
import { useEffect } from 'react';

export const LoginRoute = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');
  const gameToken = localStorage.getItem('token');
  
  useEffect(() => {
    if (gameToken) {
      navigate(`${paths.app.team.getHref()}`, {
        replace: true,
      });
    }
  }, [gameToken, navigate]);

  return (
    <LoginForm
      onSuccess={() => {
        navigate(`${redirectTo ? `${redirectTo}` : paths.app.team.getHref()}`, {
          replace: true,
        });
      }}
    />
  );
};
