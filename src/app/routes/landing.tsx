/**
 * 初期画面
 */

import { paths } from '@/config/paths';
import { useNavigate } from 'react-router-dom';

export const LandingRoute = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    if (localStorage.getItem('token')) {
      navigate(paths.app.team.getHref());
    } else {
      navigate(paths.auth.login.getHref());
    }
  };
  return <button onClick={handleStart}>ゲームを始める</button>;
};
