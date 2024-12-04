import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { TeamName } from '@/types/api';
import { QueryConfig } from '@/lib/query';

export const getTeamName = (): Promise<{ data: TeamName }> => {
  return api.get('/get/team-name');
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
