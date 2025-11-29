import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';

import {
  getTeamNameQueryOptions,
  useTeam,
} from '@/feature/create-team-name/api/get-team-name';
import { InputTeam } from '@/feature/create-team-name/components/create-team';
import Loading from '@/components/ui/loading/loading';
import { paths } from '@/config/paths';

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
  // ローカルストレージにゲームIDを保存
  useEffect(() => {
    const gameId: string | undefined = teamName.data?.msg?.GameID;
    if (gameId) {
      localStorage.setItem('gameId', gameId);
    }
  }, [teamName.data]);

  // 副作用としてナビゲーションを実行
  useEffect(() => {
    const name: string | undefined = teamName.data?.msg?.Name;
    const nickName: string | undefined = teamName.data?.msg?.NickName;

    if (!teamName.isLoading && name && nickName && name !== nickName) {
      navigate(paths.app.explanation.getHref()); // データが存在する場合にリダイレクト
    }
  }, [teamName.isLoading, teamName.data, navigate]);

  if (teamName.isLoading) {
    return <Loading />;
  }

  return (
    <section className="bg-main flex h-svh flex-col items-center justify-center space-y-24">
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
