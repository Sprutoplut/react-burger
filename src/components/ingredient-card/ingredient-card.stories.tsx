import { inCart } from '@/utils/inCart';

import { IngredientCard, type TIngredientCard } from './ingredient-card';

import type { Meta, StoryObj } from '@storybook/react';

// Метаданные истории с типами
export default {
  title: 'components/ingredient-card',
  component: IngredientCard,
  tags: ['autodocs'],
} as Meta<TIngredientCard>;

// Типы для историй
type Story = StoryObj<TIngredientCard>;

// 0
export const Zero: Story = {
  args: {
    ingredient: inCart[0],
    count: 0,
    openModal: (ingredient) => console.log('Наименование:', ingredient!.name),
  },
};

// 10
export const Ten: Story = {
  args: {
    ingredient: inCart[0],
    count: 10,
    openModal: (ingredient) => console.log('Наименование:', ingredient!.name),
  },
};
