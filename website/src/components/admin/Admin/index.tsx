import { useState } from "react";
import styles from "./Admin.module.css";

import TikiHeader from "../../common/TikiHeader";
import Title from "../../common/Title";
import CategorySwitcher from "../CategorySwitcher";
import Spreadsheet from "../Spreadsheet";
import EditingModal from "../EditingModal";
import { SingleFieldModificationPanel } from "../ModificationPanel";
import { useQuery } from "@apollo/client";
import { GetAllIngredients } from "../../../api";
import { GenericFormFieldConfiguration } from "../../../data/formConfiguration";
export default function Admin() {
  const categoryNames = [
    // "Recipes",
    "Ingredients",
    // "Glassware",
    // "Garnishes",
    // "Tags",
  ];
  const { data: ingredientsData } =
    useQuery<ApiData.AllIngredients>(GetAllIngredients);
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className={styles.content}>
      <TikiHeader />
      <div className={styles.adminArea}>
        <div className={styles.adminAreaHeader}>
          <Title title="Content Management" size="large" />
        </div>
        <CategorySwitcher categoryNames={categoryNames} onSelect={() => {}} />
        <Spreadsheet
          data={ingredientsData?.ingredients ?? []}
          onAdd={() => setModalOpen(true)}
        />
      </div>
      <EditingModal open={modalOpen} onClose={() => setModalOpen(false)}>
        {modalOpen && (
          <SingleFieldModificationPanel
            panelTitle="Add Ingredient"
            fields={[
              {
                name: "Name",
                initialValue: "",
                validationRule: (value) => value.length > 0,
              } as GenericFormFieldConfiguration<string>,
              {
                name: "ABV",
              } as GenericFormFieldConfiguration<number>,
            ]}
            onSave={() => {}}
          />
        )}
      </EditingModal>
    </div>
  );
}
