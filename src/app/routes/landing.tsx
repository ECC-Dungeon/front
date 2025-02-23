/**
 * 初期画面
 */

import { paths } from '@/config/paths';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/ui/button/button';

export const LandingRoute = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    if (localStorage.getItem('token')) {
      navigate(paths.app.team.getHref());
    } else {
      navigate(paths.auth.login.getHref());
    }
  };

  return (
    <section className="flex h-screen flex-col items-center justify-center">
      <img
        src={`${import.meta.env.VITE_APP_URL}/user/ecc-dungeon-logo.webp`}
        alt="ECCダンジョンメインロゴ"
      />
      <Button onClick={handleStart} children={'ゲームを始める'} />
    </section>
  );
};
