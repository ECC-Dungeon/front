import { Form, Input } from '@/components/ui/form';
import { useCreateTeamName, teamNameSchema } from '@/lib/team-name';

export const InputTeam = () => {
  const createTeamName = useCreateTeamName({
    mutationConfig: {
      onSuccess: (data) => {
        console.log('success', data);
      },
    },
  });
  return (
    <div>
      <Form
        onSubmit={(values) => {
          console.log('values', values);
          createTeamName.mutate({ data: values });
        }}
        schema={teamNameSchema}
      >
        {({ register, formState }) => (
          <>
            <Input
              type="text"
              label="Team Name"
              error={formState.errors['name']}
              registration={register('name')}
            />
          </>
        )}
      </Form>
    </div>
  );
};
