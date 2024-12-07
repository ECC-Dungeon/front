import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
// import { TeamData } from '@/types/api';
import { QueryConfig } from '@/lib/query';
interface ApiResponse {
  msg: {
    TeamID: string;
    Name: string;
    GameID: string;
    Status: string;
    NickName: string;
    Creator: string;
    CreatedAt: number;
  };
  result: string;
}

export type TeamData = {
  TeamID: string;
  Name: string;
  GameID: string;
  Status: string;
  NickName: string;
  Creator: string;
  CreatedAt: number;
};

export const getTeamName = (): Promise<{ data: ApiResponse }> => {
  return api.get('/admin/game/team', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token'),
    },
  });
};

export const getTeamNameQueryOptions = () => {
  return queryOptions({
    queryKey: ['team'],
    queryFn: getTeamName,
  });
};

type UseTeamNameOptions = {
  queryConfig?: QueryConfig<typeof getTeamName>;
};

export const useTeam = ({ queryConfig }: UseTeamNameOptions = {}) => {
  return useQuery({
    ...getTeamNameQueryOptions(),
    ...queryConfig,
  });
};
