import { inCart } from '@/utils/inCart';

import { CartBun, type TCartBun } from './cart-bun';

import type { Meta, StoryObj } from '@storybook/react';

// Метаданные истории с типами
export default {
  title: 'components/cart-bun',
  component: CartBun,
  tags: ['autodocs'],
} as Meta<TCartBun>;

// Типы для историй
type Story = StoryObj<TCartBun>;

// Вверх
export const Up: Story = {
  args: {
    ingredient: inCart[0],
    direction: 'top',
  },
};

// Низ
export const Bottom: Story = {
  args: {
    ingredient: inCart[0],
    direction: 'bottom',
  },
};
