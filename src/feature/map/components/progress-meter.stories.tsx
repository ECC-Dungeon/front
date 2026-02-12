import type { Meta, StoryObj } from '@storybook/react';
import { ProgressMeter } from './progress-meter';

const meta: Meta<typeof ProgressMeter> = {
  title: 'Feature/Map/ProgressMeter',
  component: ProgressMeter,
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
type Story = StoryObj<typeof ProgressMeter>;

// 1階層
export const OneFloor_Progress0: Story = {
  args: { current: 0, total: 1 },
};

export const OneFloor_Progress1: Story = {
  args: { current: 1, total: 1 },
};

// 2階層
export const TwoFloors_Progress0: Story = {
  args: { current: 0, total: 2 },
};

export const TwoFloors_Progress1: Story = {
  args: { current: 1, total: 2 },
};

export const TwoFloors_Progress2: Story = {
  args: { current: 2, total: 2 },
};

// 3階層
export const ThreeFloors_Progress0: Story = {
  args: { current: 0, total: 3 },
};

export const ThreeFloors_Progress1: Story = {
  args: { current: 1, total: 3 },
};

export const ThreeFloors_Progress2: Story = {
  args: { current: 2, total: 3 },
};

export const ThreeFloors_Progress3: Story = {
  args: { current: 3, total: 3 },
};

// 4階層
export const FourFloors_Progress0: Story = {
  args: { current: 0, total: 4 },
};

export const FourFloors_Progress2: Story = {
  args: { current: 2, total: 4 },
};

export const FourFloors_Progress4: Story = {
  args: { current: 4, total: 4 },
};

// 5階層
export const FiveFloors_Progress0: Story = {
  args: { current: 0, total: 5 },
};

export const FiveFloors_Progress3: Story = {
  args: { current: 3, total: 5 },
};

export const FiveFloors_Progress5: Story = {
  args: { current: 5, total: 5 },
};

// 6階層
export const SixFloors_Progress0: Story = {
  args: { current: 0, total: 6 },
};

export const SixFloors_Progress3: Story = {
  args: { current: 3, total: 6 },
};

export const SixFloors_Progress6: Story = {
  args: { current: 6, total: 6 },
};
