import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';

import {
  getTeamNameQueryOptions,
  useTeam,
} from '@/feature/create-team-name/api/get-team-name';
import { InputTeam } from '@/feature/create-team-name/components/create-team';
import Loading from '@/components/ui/loading/loading';

export const teamNameLoader = (queryClient: QueryClient) => async () => {
  const query = getTeamNameQueryOptions();

  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  );
};

export const CreateTeamNameRoute = () => {
  const navigate = useNavigate();
  const teamName = useTeam();

  // 副作用としてナビゲーションを実行
  useEffect(() => {
    if (!teamName.isLoading && teamName.data) {
      navigate('/app/explanation'); // データが存在する場合にリダイレクト
    }
  }, [teamName.isLoading, teamName.data, navigate]);

  if (teamName.isLoading) {
    return <Loading />;
  }

  return (
    <section className="flex h-svh flex-col items-center justify-center space-y-24 bg-main">
      <img src="/ecc-dungeon-logo.webp" alt="ECCダンジョンメインロゴ" />
      <InputTeam />
    </section>
  );
};

/**
 * 後で消す
 * チーム名作成のファイル
 * ・チーム名入力フォーム
 */
