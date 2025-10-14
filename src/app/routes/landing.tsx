/**
 * 初期画面
 */

import { ContentLayout } from '@/components/layouts/content-layout';
import { paths } from '@/config/paths';
import { useNavigate } from 'react-router-dom';

export const LandingRoute = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    if (localStorage.getItem('gameToken')) {
      navigate(paths.app.team.getHref());
    } else {
      navigate(paths.auth.login.getHref());
    }
  };
  return (
    <ContentLayout>
      <div className="h-screen bg-[radial-gradient(circle_at_center,_#323232cc_0%,_#323232ff_100%)]">
        <div className="flex h-full items-center justify-center">
          <button onClick={handleStart} className="text-2xl text-white">
            ゲームを始める
          </button>
        </div>
      </div>
    </ContentLayout>
  );
};
