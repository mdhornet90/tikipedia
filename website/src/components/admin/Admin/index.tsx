import { useEffect, useState } from "react";
import styles from "./Admin.module.css";

import TikiHeader from "../../common/TikiHeader";
import Title from "../../common/Title";
import CategorySwitcher from "../CategorySwitcher";
import Spreadsheet from "../Spreadsheet";
import EditingModal from "../EditingModal";
import { useMutation, useQuery } from "@apollo/client";
import { CreateIngredient, GetAllIngredients } from "../../../api";
import { FormField } from "../FormField";

interface IngredientForm {
  name: string;
  abv: string | null;
}
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
  const [addIngredient] = useMutation(CreateIngredient);
  const [modalOpen, setModalOpen] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [formData, setFormData] = useState<IngredientForm>({
    name: "",
    abv: null,
  });

  useEffect(() => {
    setFormValid(validateForm(formData));
  }, [formData, setFormValid]);

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
        onSave={async () => {
          const input = {
            ...formData,
            abv: formData.abv && parseFloat(formData.abv) / 100,
          };
          addIngredient({ variables: { input } });
          setFormData({
            name: "",
            abv: null,
          });
          setModalOpen(false);
        }}
      >
        <FormField
          name="Name"
          value={formData.name}
          onUpdate={(newName) => {
            setFormData({ ...formData, name: newName });
          }}
        />
        <FormField
          name="Abv (%)"
          value={formData.abv ?? ""}
          onUpdate={(newAbv) => {
            setFormData({ ...formData, abv: newAbv });
          }}
        />
      </EditingModal>
    </div>
  );
}

function validateForm(form: IngredientForm): boolean {
  if (form.name.length <= 0) {
    return false;
  }

  try {
    const normalizedNumber = Number(form.abv);
    return (
      !isNaN(normalizedNumber) &&
      normalizedNumber >= 0 &&
      normalizedNumber <= 100
    );
  } catch {
    return false;
  }
}
