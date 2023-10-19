import { useState } from "react";
import CategoryButton from "./CategoryButton";
import styles from "./CategorySwitcher.module.css";

interface CategorySwitcherProps {
  categoryNames: string[];
  onSelect: (id: number) => void;
}

export default function CategorySwitcher({
  categoryNames,
  onSelect,
}: CategorySwitcherProps) {
  const [selectedId, setSelectedId] = useState(0);

  return (
    <span className={styles.categories}>
      {categoryNames.map((title, i) => (
        <CategoryButton
          key={i}
          title={title}
          selected={i === selectedId}
          onClick={() => {
            setSelectedId(i);
            onSelect(i);
          }}
        />
      ))}
    </span>
  );
}
