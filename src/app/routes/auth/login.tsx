import { useNavigate, useSearchParams } from 'react-router-dom';

import { paths } from '@/config/paths';
import { LoginForm } from '@/feature/login/components/login-form';
import { useUser } from '@/lib/auth';
import { useEffect } from 'react';

export const LoginRoute = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');
  const user = useUser();

  useEffect(() => {
    if (user.data) {
      console.log('user.data', user.data);
      navigate(redirectTo ? redirectTo : paths.app.explanation.getHref(), {
        replace: true,
      });
    }
  }, [user.data, navigate, redirectTo]);
  return (
    <LoginForm
      onSuccess={() => {
        navigate(
          `${redirectTo ? `${redirectTo}` : paths.app.explanation.getHref()}`,
          {
            replace: true,
          },
        );
      }}
    />
  );
};
