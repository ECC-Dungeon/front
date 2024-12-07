import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { GameStatus } from '@/types/api';
import { QueryConfig } from './query';

export const getGameStatus = (): Promise<{ data: GameStatus }> => {
  return api.post('/admin/admin/start2', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token'),
    },
  });
};

export const getGameStatusQueryOptions = () => {
  return queryOptions({
    queryKey: ['status'],
    queryFn: getGameStatus,
  });
};

type UseGameStatusOptions = {
  queryConfig?: QueryConfig<typeof getGameStatusQueryOptions>;
};

export const useGameStatus = ({ queryConfig }: UseGameStatusOptions = {}) => {
  return useQuery({
    ...getGameStatusQueryOptions(),
    ...queryConfig,
  });
};
