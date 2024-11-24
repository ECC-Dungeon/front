import { Meta, StoryObj } from '@storybook/react';
import { z } from 'zod';

import { Form } from './form';
import { Input } from './input';

const MyForm = ({ hideSubmit = false }: { hideSubmit?: boolean }) => {
  return (
    <Form
      onSubmit={async (values) => {
        alert(JSON.stringify(values, null, 2));
      }}
      schema={z.object({
        title: z.string().min(1, 'Required'),
      })}
      id="my-form"
    >
      {({ register, formState }) => (
        <>
          <Input
            label="Title"
            error={formState.errors['title']}
            registration={register('title')}
          />

          {!hideSubmit && (
            <div>
              <button type="submit" className="w-full">
                Submit
              </button>
            </div>
          )}
        </>
      )}
    </Form>
  );
};

const meta: Meta = {
  component: MyForm,
};

export default meta;

type Story = StoryObj<typeof MyForm>;

export const Default: Story = {
  render: () => <MyForm />,
};
