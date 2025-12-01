import { useNavigate } from 'react-router-dom';

import Button from '@/components/ui/button/button';
import { Form, Input } from '@/components/ui/form';
import {
  createTeamNameSchema,
  useCreateTeamName,
} from '../api/create-team-name';
import { paths } from '@/config/paths';

export const InputTeam = () => {
  const navigate = useNavigate();

  const createTeamName = useCreateTeamName({
    mutationConfig: {
      onSuccess: () => {
        navigate(paths.app.explanation.getHref());
      },
    },
  });

  return (
    <div className="w-full p-4">
      <Form
        onSubmit={(values) => {
          createTeamName.mutate({ data: values });
        }}
        schema={createTeamNameSchema}
        className="space-y-32"
      >
        {({ register, formState }) => (
          <>
            <Input
              type="text"
              label="チーム名を入力してください"
              error={formState.errors['NickName']}
              registration={register('NickName')}
              className="bg-[#FAFAFA] bg-opacity-25 shadow-inner text-black"
            />
            <div className="flex w-full justify-end">
              <Button children="次へ" />
            </div>
          </>
        )}
      </Form>
    </div>
  );
};
