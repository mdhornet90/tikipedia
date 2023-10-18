import styles from "./CategoryButton.module.css";

interface CategoryButtonProps {
  title: string;
  selected: boolean;
  onClick?: () => void;
}

export default function CategoryButton({
  title,
  selected,
  onClick = () => {},
}: CategoryButtonProps) {
  const classNames = [styles.categoryButton, selected ? styles.selected : null]
    .filter((e) => !!e)
    .join(" ");
  return (
    <div className={classNames} onClick={onClick}>
      {title}
    </div>
  );
}
