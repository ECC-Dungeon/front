import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from './query';

interface ApiResponse {
  msg: string;
  result: string;
}

export const getGameStatus = (): Promise<ApiResponse> => {
  const token = localStorage.getItem('token');
  if (!token) {
    return Promise.reject(new Error('Authorization token is missing'));
  }
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
    queryKey: ['status'],
    queryFn: getGameStatus,
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
