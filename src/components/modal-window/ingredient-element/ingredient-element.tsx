import styles from './ingredient-element.module.css';

type TIngredientElement = {
  text: string;
  value: number;
};

export const IngredientElement = ({
  text,
  value,
}: TIngredientElement): React.JSX.Element | null => {
  return (
    <div className={styles.info_element}>
      <p className="text text_type_main-default text_color_inactive">{text}</p>
      <p className="text text_type_digits-default text_color_inactive">{value}</p>
    </div>
  );
};
