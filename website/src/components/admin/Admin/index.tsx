import { useState } from "react";
import TikiHeader from "../../common/TikiHeader";
import Title from "../../common/Title";
import CategoryButton from "../CategoryButton";
import styles from "./Admin.module.css";
import Spreadsheet from "../Spreadsheet";

export default function Admin() {
  const categoryNames = [
    "Recipes",
    "Ingredients",
    "Glassware",
    "Garnishes",
    "Tags",
  ];
  const [selectedId, setSelectedId] = useState("recipes");

  return (
    <div className={styles.content}>
      <TikiHeader />
      <div className={styles.adminArea}>
        <div className={styles.adminAreaHeader}>
          <Title title="Content Management" size="large" />
        </div>
        <span className={styles.categories}>
          {categoryNames.map((title) => (
            <CategoryButton
              key={title.toLowerCase()}
              title={title}
              selected={title.toLowerCase() === selectedId}
              onClick={() => setSelectedId(title.toLowerCase())}
            />
          ))}
        </span>
        <Spreadsheet />
      </div>
    </div>
  );
}
