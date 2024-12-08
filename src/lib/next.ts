import { z } from 'zod';
import { api } from './api-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MutationConfig } from '@/lib/query';

interface ApiResponse {
  msg: {
    NextNum: number;
    AllClear: boolean;
    ClearFloor: Array<number>;
  };
  result: string;
}

// スキーマ
export const nextFloorSchema = z.object({
  clear_floor: z.number().min(1, 'Required'),
});

// チーム名の入力値のスキーマ
export type NextFloorInput = z.infer<typeof nextFloorSchema>;

export const getNextFloor = async ({
  data,
}: {
  data: NextFloorInput;
}): Promise<ApiResponse> => {
  return await api.post(
    '/game/next',
    { clear_floor: data.clear_floor },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token') || '',
      },
    },
  );
};

type NextQueryOptions = {
  mutationConfig?: MutationConfig<typeof getNextFloor>;
};

export const useNextFloor = ({ mutationConfig }: NextQueryOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: ['next'],
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: getNextFloor,
  });
};
