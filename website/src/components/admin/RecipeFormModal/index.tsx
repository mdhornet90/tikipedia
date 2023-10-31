import { useEffect, useState } from "react";
import EditingModal from "../EditingModal";
import IngredientFormSection from "../IngredientFormSection";
import { useMutation, useQuery } from "@apollo/client";
import { RecipeFormData } from "../../../api";

interface RecipeFormModalProps {
  open: boolean;
  onClose: () => void;
}

const allUnits = ["dash", "drop", "each", "oz", "tbsp", "tsp"];
const INITIAL_STATE: Form.Recipe = {
  title: "",
  glasswareId: "",
  imageUrl: null,
  instructions: "",
  ingredients: [{ name: "", quantity: "", unit: "Unit" }],
};

export default function RecipeFormModal({
  open,
  onClose,
}: RecipeFormModalProps) {
  const {
    data: { ingredients, allGlassware } = { ingredients: [], allGlassware: [] },
  } = useQuery<ApiData.RecipeFormData>(RecipeFormData);
  const [ingredientList, setIngredientList] = useState<ListItem[]>([]);
  const [form, setForm] = useState<Form.Recipe>(INITIAL_STATE);
  const [ingredientsValid, setIngredientsValid] = useState(true);

  useEffect(() => {
    setIngredientList(
      ingredients
        .sort(({ name: aName }, { name: bName }) => aName.localeCompare(bName))
        .map(({ id, name }) => ({ id, text: name }))
    );
  }, [ingredients]);

  useEffect(() => {
    setIngredientsValid(
      form.ingredients.every(({ name, quantity, unit }) => {
        if (name.length <= 0 || !allUnits.includes(unit)) {
          return false;
        }

        try {
          const normalizedNumber = Number(quantity);
          return !isNaN(normalizedNumber) && normalizedNumber > 0;
        } catch {
          return false;
        }
      })
    );
  }, [form]);
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
        allIngredients={ingredientList}
        allUnits={allUnits}
        ingredientInputs={form.ingredients}
        valid={ingredientsValid}
        onAdd={() => {
          setForm({
            ...form,
            ingredients: [
              ...form.ingredients,
              { name: "", quantity: "", unit: "Unit" },
            ],
          });
        }}
        onUpdate={(i, updatedIngredient) => {
          const updatedIngredients = [...form.ingredients];
          updatedIngredients[i] = updatedIngredient;
          setForm({ ...form, ingredients: updatedIngredients });
        }}
        onRemove={(i) => {
          const updatedIngredients = [...form.ingredients];
          updatedIngredients.splice(i, 1);
          setForm({ ...form, ingredients: updatedIngredients });
        }}
      />
    </EditingModal>
  );
}
