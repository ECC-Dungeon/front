import { queryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { QueryConfig, MutationConfig } from '@/lib/query';
import { Floor } from '@/types/api';

interface FloorResponse {
  result: string;
  msg: Floor[];
}

/**
 * Get floor configuration
 * @param gameId - Game ID (sent as gameid header)
 */
export const getFloor = async (gameId: string): Promise<FloorResponse> => {
  return api.get('/admin/game/floor', {
    headers: {
      gameid: gameId,
    },
  });
};

export const getFloorQueryOptions = (gameId: string) => {
  return queryOptions({
    queryKey: ['floor', gameId],
    queryFn: () => getFloor(gameId),
    enabled: !!gameId,
  });
};

type UseFloorOptions = {
  gameId: string;
  queryConfig?: QueryConfig<typeof getFloor>;
};

export const useFloor = ({ gameId, queryConfig }: UseFloorOptions) => {
  return useQuery({
    ...getFloorQueryOptions(gameId),
    ...queryConfig,
  });
};

/**
 * Post floor action (submit)
 * @param gameId - Game ID (sent as gameid header)
 */
export const postFloor = async (gameId: string): Promise<Floor[]> => {
  return api.post('/admin/game/floor', null, {
    headers: {
      gameid: gameId,
    },
  });
};

type PostFloorOptions = {
  mutationConfig?: MutationConfig<typeof postFloor>;
};

export const usePostFloor = ({ mutationConfig }: PostFloorOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, variables, ...args) => {
      queryClient.invalidateQueries({
        queryKey: ['floor'],
      });
      onSuccess?.(data, variables, ...args);
    },
    ...restConfig,
    mutationFn: postFloor,
  });
};
