import { useState } from "react";
import styles from "./Admin.module.css";

import TikiHeader from "../../common/TikiHeader";
import Title from "../../common/Title";
import CategorySwitcher from "../CategorySwitcher";
import Spreadsheet from "../Spreadsheet";

export default function Admin() {
  const categoryNames = [
    "Recipes",
    "Ingredients",
    "Glassware",
    "Garnishes",
    "Tags",
  ];

  return (
    <div className={styles.content}>
      <TikiHeader />
      <div className={styles.adminArea}>
        <div className={styles.adminAreaHeader}>
          <Title title="Content Management" size="large" />
        </div>
        <CategorySwitcher categoryNames={categoryNames} onSelect={() => {}} />
        <Spreadsheet />
      </div>
    </div>
  );
}
