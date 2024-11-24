import { InputTeam } from '@/feature/components/explanation/create-team';
import { useUser } from '@/lib/auth';
import { getTeamName } from '@/lib/team-name';

export const ExplanationRoute = () => {
  const user = useUser();
  if (!user.data) return null;

  const teamName = getTeamName();

  return (
    <section>{teamName ? <p>チーム名: {teamName}</p> : <InputTeam />}</section>
  );
};

/**
 * 後で消す
 * 説明用のファイル
 * ・初期状態はチーム名入力フォーム
 * ・チーム名が登録されている場合は説明を表示
 * ・サーバーから開始状況を取得
 */
