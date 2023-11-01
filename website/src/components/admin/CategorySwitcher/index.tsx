import { useState } from "react";
import CategoryButton from "./CategoryButton";
import styles from "./CategorySwitcher.module.css";

interface CategorySwitcherProps {
  defaultTab?: Category;
  onSelect: (id: Category) => void;
}

export default function CategorySwitcher({
  defaultTab = "recipes",
  onSelect,
}: CategorySwitcherProps) {
  const categories: { id: Category; name: string }[] = [
    { id: "recipes", name: "Recipes" },
    { id: "ingredients", name: "Ingredients" },
    { id: "glassware", name: "Glassware" },
  ];

  const [selectedId, setSelectedId] = useState(defaultTab);

  return (
    <span className={styles.categories}>
      {categories.map(({ id, name }, i) => (
        <CategoryButton
          key={i}
          title={name}
          selected={id === selectedId}
          onClick={() => {
            setSelectedId(id);
            onSelect(id);
          }}
        />
      ))}
    </span>
  );
}
