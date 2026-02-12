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

// 1階層
export const OneFloor_Progress0: Story = {
  args: { progress: 0, gameId: 'one-floor-game' },
};

export const OneFloor_Progress1: Story = {
  args: { progress: 1, gameId: 'one-floor-game' },
};

// 2階層
export const TwoFloors_Progress0: Story = {
  args: { progress: 0, gameId: 'two-floors-game' },
};

export const TwoFloors_Progress2: Story = {
  args: { progress: 2, gameId: 'two-floors-game' },
};

// 3階層
export const ThreeFloors_Progress0: Story = {
  args: { progress: 0, gameId: 'three-floors-game' },
};

export const ThreeFloors_Progress3: Story = {
  args: { progress: 3, gameId: 'three-floors-game' },
};

// 4階層
export const FourFloors_Progress0: Story = {
  args: { progress: 0, gameId: 'four-floors-game' },
};

export const FourFloors_Progress4: Story = {
  args: { progress: 4, gameId: 'four-floors-game' },
};

// 5階層
export const FiveFloors_Progress0: Story = {
  args: { progress: 0, gameId: 'five-floors-game' },
};

export const FiveFloors_Progress5: Story = {
  args: { progress: 5, gameId: 'five-floors-game' },
};

// 6階層
export const SixFloors_Progress0: Story = {
  args: { progress: 0, gameId: 'six-floors-game' },
};

export const SixFloors_Progress6: Story = {
  args: { progress: 6, gameId: 'six-floors-game' },
};
