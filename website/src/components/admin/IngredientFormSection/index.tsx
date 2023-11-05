import ClearIcon from "@mui/icons-material/Clear";
import IngredientFormField from "../../form/IngredientFormField";
import styles from "./IngredientFormSection.module.css";
import FormFieldWrapper from "../../form/FormFieldWrapper";
import { useEffect, useMemo, useState } from "react";
import { recipeIngredientValid } from "../RecipeFormModal/utils";

interface IngredientFormSectionProps {
  allIngredients: string[];
  allUnits: string[];
  ingredientInputs: Input.RecipeIngredient[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onUpdate: (index: number, updatedValue: Input.RecipeIngredient) => void;
}

export default function IngredientFormSection({
  allIngredients,
  allUnits,
  ingredientInputs,
  onAdd,
  onRemove,
  onUpdate,
}: IngredientFormSectionProps) {
  const units = useMemo(() => new Set(allUnits), [allUnits]);
  const [addEnabled, setAddEnabled] = useState(false);
  useEffect(() => {
    setAddEnabled(
      ingredientInputs.every((ingredient) =>
        recipeIngredientValid(units, ingredient)
      )
    );
  }, [ingredientInputs, units]);

  return (
    <FormFieldWrapper title="Ingredients">
      <div className={styles.inputContainer}>
        {ingredientInputs.map((ingredient, i) => (
          <div key={i} className={styles.ingredientContainer}>
            <IngredientFormField
              selectedIngredient={ingredient.name}
              selectedAmount={ingredient.quantity}
              selectedUnit={ingredient.unit}
              onUpdate={(key, value) => {
                onUpdate(i, { ...ingredient, [key]: value });
              }}
              ingredients={allIngredients}
              units={allUnits}
            />
            <div onClick={() => onRemove(i)}>
              <ClearIcon className={styles.deleteButton} />
            </div>
          </div>
        ))}
        <button
          className={styles.addButton}
          disabled={!addEnabled}
          onClick={onAdd}
        >
          Add Ingredient
        </button>
      </div>
    </FormFieldWrapper>
  );
}
