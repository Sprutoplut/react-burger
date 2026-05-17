import { useAppSelector } from '@/hooks/useRedux';
import { useScroll } from '@/hooks/useScroll';
import { type_ingredients } from '@/utils/constants';
import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { useCallback, useEffect, useRef, useState } from 'react';

import { IngredientList } from '../ingredient-list/ingredient-list';

import type { Ttype_ingredients } from '@utils/types';

import styles from './burger-ingredients.module.css';

export const BurgerIngredients = (): React.JSX.Element => {
  const cart = useAppSelector((state) => state.cart);
  const [currentTab, setCurrentTab] = useState<Ttype_ingredients>(type_ingredients[0]);
  const [cartQuantities, setСartQuantities] = useState<Record<string, number>>({});

  const tabsRef = useRef<Record<string, HTMLElement | null>>({});

  const parentRef = useRef<HTMLUListElement>(null);

  const setBlockRef = useCallback(
    (type: string) =>
      (element: HTMLElement | null): void => {
        tabsRef.current[type] = element;
      },
    []
  );

  const ToBlock: (type_ingredient: Ttype_ingredients) => void = (
    type_ingredient: Ttype_ingredients
  ) => {
    setCurrentTab(type_ingredient);
    const targetId = `card_block_${type_ingredient.type}`;
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };
  useEffect(() => {
    const counts: Record<string, number> = {};

    if (cart.bun) {
      counts[cart.bun._id] = 2;
    }

    cart.main.forEach((item) => {
      counts[item._id] = (counts[item._id] || 0) + 1;
    });

    setСartQuantities(counts);
  }, [cart]);

  useScroll({
    typeIngredients: type_ingredients,
    currentTab,
    setCurrentTab,
    parentRef: parentRef,
    tabsRef: tabsRef,
  });

  return (
    <section className={styles.burger_ingredients}>
      <nav>
        <ul className={`${styles.menu} pb-10`}>
          {type_ingredients.map((tab) => (
            <Tab
              key={tab.type}
              value={tab.type}
              active={currentTab.type === tab.type}
              onClick={() => ToBlock(tab)}
            >
              {tab.title}
            </Tab>
          ))}
        </ul>
      </nav>
      <ul className={styles.type_list} ref={parentRef}>
        {type_ingredients.map((type_ing) => (
          <li
            key={type_ing.type}
            id={`card_block_${type_ing.type}`}
            className={styles.parent_ingredient_list}
            ref={setBlockRef(type_ing.type)}
          >
            <IngredientList type_ingredient={type_ing} cart={cartQuantities} />
          </li>
        ))}
      </ul>
    </section>
  );
};
