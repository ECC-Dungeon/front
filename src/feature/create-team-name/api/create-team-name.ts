import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { TeamName } from '@/types/api';
import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/query';

// チーム名のスキーマ
export const createTeamNameSchema = z.object({
  NickName: z.string().min(2, 'Required'),
});

// チーム名の入力値のスキーマ
export type TeamNameInput = z.infer<typeof createTeamNameSchema>;

export const createDiscussion = ({
  data,
}: {
  data: TeamNameInput;
}): Promise<TeamName> => {
  return api.put('/admin/game/tname', data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token'),
    },
  });
};

type TeamNameOptions = {
  mutationConfig?: MutationConfig<typeof createDiscussion>;
};

export const useCreateTeamName = ({ mutationConfig }: TeamNameOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: ['team'],
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createDiscussion,
  });
};
