import { useState } from "react";
import styles from "./Admin.module.css";

import TikiHeader from "../../common/TikiHeader";
import Title from "../../common/Title";
import CategorySwitcher from "../CategorySwitcher";
import Spreadsheet from "../Spreadsheet";
import EditingModal from "../EditingModal";
import { useQuery } from "@apollo/client";
import { GetAllIngredients } from "../../../api";
import { FormField } from "../FormField";
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
  const [formValid, setFormValid] = useState(false);
  const [formData, setFormData] = useState({ name: "", abv: 0 });

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
      <EditingModal
        open={modalOpen}
        title="Add Ingredient"
        formValid={formValid}
        onClose={() => setModalOpen(false)}
        onSave={() => {}}
      >
        <FormField name="Name" value={formData.name} onUpdate={() => {}} />
        <FormField name="Abv (%)" value={formData.abv} onUpdate={() => {}} />
      </EditingModal>
    </div>
  );
}
