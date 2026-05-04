type TSubMenuItemMobile = {
  text: string;
  href?: string;
  isClick: boolean;
  onClick: () => void;
};

export const SubMenuItemMobile = ({
  text,
  href,
  isClick,
  onClick,
}: TSubMenuItemMobile): React.JSX.Element => {
  return (
    <a
      href={href}
      className={`text ${!isClick && 'text_color_inactive'} text_type_main-default pr-2 pb-4 pt-4`}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      {text}
    </a>
  );
};
