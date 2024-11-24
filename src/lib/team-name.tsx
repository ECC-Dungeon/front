import Cookies from 'js-cookie';
import { TeamName } from '@/types/api';
import { z } from 'zod';
import { api } from './api-client';
import { TEAM_COOKIE } from '@/mocks/utils';
import { MutationConfig } from './query';
import { useMutation } from '@tanstack/react-query';

// チーム名を取得
export const getTeamName = (): string | undefined => {
  const teamName: string = Cookies.get(TEAM_COOKIE) || '';

  return teamName;
};

// チーム名のスキーマ
export const teamNameSchema = z.object({
  name: z.string().min(2, 'Required'),
});

// チーム名の入力値のスキーマ
export type TeamNameInput = z.infer<typeof teamNameSchema>;

export const createDiscussion = ({
  data,
}: {
  data: TeamNameInput;
}): Promise<TeamName> => {
  return api.post('/save/team-name', data);
};

type TeamNameOptions = {
  mutationConfig?: MutationConfig<typeof createDiscussion>;
};

export const useCreateTeamName = ({ mutationConfig }: TeamNameOptions = {}) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    ...restConfig,
    mutationFn: createDiscussion,
  });
};
