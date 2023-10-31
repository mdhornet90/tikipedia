import { useState } from "react";
import EditingModal from "../EditingModal";
import IngredientFormSection from "../IngredientFormSection";
import { useMutation, useQuery } from "@apollo/client";
import { RecipeFormData } from "../../../api";

interface RecipeFormModalProps {
  open: boolean;
  onClose: () => void;
}

const INITIAL_STATE: Form.Recipe = {
  title: "",
  glasswareId: "",
  imageUrl: null,
  instructions: "",
  ingredients: [],
};

export default function RecipeFormModal({
  open,
  onClose,
}: RecipeFormModalProps) {
  const {
    data: { ingredients, allGlassware } = { ingredients: [], allGlassware: [] },
  } = useQuery<ApiData.RecipeFormData>(RecipeFormData);
  const [form, setForm] = useState<Form.Recipe>(INITIAL_STATE);

  return (
    <EditingModal
      open={open}
      onClose={() => {
        setForm(INITIAL_STATE);
        onClose();
      }}
      title="Add Ingredient"
      formValid={false}
      onSave={() => {
        setForm(INITIAL_STATE);
        onClose();
      }}
    >
      <IngredientFormSection
        allIngredients={ingredients}
        ingredientInputs={form.ingredients}
        valid={false}
        onAdd={() => {}}
        onRemove={() => {}}
      />
    </EditingModal>
  );
}
