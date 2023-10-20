import { useState } from "react";
import styles from "./Admin.module.css";

import TikiHeader from "../../common/TikiHeader";
import Title from "../../common/Title";
import CategorySwitcher from "../CategorySwitcher";
import Spreadsheet from "../Spreadsheet";
import EditingModal from "../EditingModal";
import { SingleFieldModificationPanel } from "../ModificationPanel";

export default function Admin() {
  const categoryNames = [
    "Recipes",
    "Ingredients",
    "Glassware",
    "Garnishes",
    "Tags",
  ];
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className={styles.content}>
      <TikiHeader />
      <div className={styles.adminArea}>
        <div className={styles.adminAreaHeader}>
          <Title title="Content Management" size="large" />
        </div>
        <CategorySwitcher categoryNames={categoryNames} onSelect={() => {}} />
        <Spreadsheet onAdd={() => setModalOpen(true)} />
      </div>
      <EditingModal open={modalOpen} onClose={() => setModalOpen(false)}>
        <SingleFieldModificationPanel
          panelTitle="Add Ingredient"
          fieldName="Ingredient Name"
          validationRule={(value) => value.length > 0}
          onSave={() => {}}
        />
      </EditingModal>
    </div>
  );
}
