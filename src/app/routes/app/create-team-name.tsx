import { InputTeam } from '@/feature/create-team-name/components/create-team';
import { useUser } from '@/lib/auth';
import { getTeamName } from '@/lib/team-name';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const CreateTeamNameRoute = () => {
  const user = useUser();
  if (!user.data) return null;

  const navigate = useNavigate();

  const teamName = getTeamName();
  // チーム名が登録されている場合は説明画面へ遷移
  useEffect(() => {
    if (teamName) {
      navigate('/app/explanation');
    }
  }, [teamName, navigate]);

  return (
    <section>
      <InputTeam />
    </section>
  );
};

/**
 * 後で消す
 * チーム名作成のファイル
 * ・チーム名入力フォーム
 */
