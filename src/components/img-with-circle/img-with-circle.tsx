import styles from './img-with-circle.module.css';

type TImgWithCircle = {
  img: string;
  alt?: string;
  last: boolean;
  remaining?: number;
};

export const ImgWithCircle = ({
  img,
  alt,
  last,
  remaining,
}: TImgWithCircle): React.JSX.Element => {
  return (
    <div className={styles.ingredient_circle}>
      <div
        className={last ? styles.ingredient_overlay : styles.ingredient_withoutoverlay}
      >
        <img src={img} alt={last ? 'Еще ингредиенты' : alt} />
        {last && <span className={styles.remaining_count}>+{remaining}</span>}
      </div>
    </div>
  );
};
