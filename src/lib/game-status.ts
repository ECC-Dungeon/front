import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from './query';
import { GameStatus } from '@/types/api';

export const getGameStatus = (): Promise<GameStatus> => {
  const token = localStorage.getItem('token') || '';
  return api.post(
    '/admin/game/start2',
    {},
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    },
  );
};

export const getGameStatusQueryOptions = () => {
  return queryOptions({
    queryKey: ['game-status'],
    queryFn: getGameStatus,
    staleTime: 1000 * 60 * 5, // 5分間キャッシュ
  });
};

type UseGameStatusOptions = {
  queryConfig?: QueryConfig<typeof getGameStatus>;
};

export const useGameStatus = ({ queryConfig }: UseGameStatusOptions = {}) => {
  return useQuery({
    ...getGameStatusQueryOptions(),
    ...queryConfig,
  });
};
