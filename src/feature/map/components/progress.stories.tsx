import type { Meta, StoryObj } from '@storybook/react';
import Progress from './progress';

const meta: Meta<typeof Progress> = {
  title: 'Feature/Map/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '200px', height: '200px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const ThreeFloors_Progress0: Story = {
  args: {
    progress: 0,
    gameId: 'three-floors-game',
  },
};

export const ThreeFloors_Progress1: Story = {
  args: {
    progress: 1,
    gameId: 'three-floors-game',
  },
};

export const ThreeFloors_Progress2: Story = {
  args: {
    progress: 2,
    gameId: 'three-floors-game',
  },
};

export const ThreeFloors_Progress3: Story = {
  args: {
    progress: 3,
    gameId: 'three-floors-game',
  },
};

export const FourFloors_Progress0: Story = {
  args: {
    progress: 0,
    gameId: 'four-floors-game',
  },
};

export const FourFloors_Progress2: Story = {
  args: {
    progress: 2,
    gameId: 'four-floors-game',
  },
};

export const FourFloors_Progress4: Story = {
  args: {
    progress: 4,
    gameId: 'four-floors-game',
  },
};
