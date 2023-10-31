import ClearIcon from "@mui/icons-material/Clear";
import Title from "../../common/Title";
import IngredientFormField from "../IngredientFormField";
import styles from "./IngredientFormSection.module.css";

interface IngredientFormSectionProps {
  allIngredients: Ingredient[];
  allUnits: string[];
  ingredientInputs: Form.RecipeIngredient[];
  valid: boolean;
  onAdd: () => void;
  onRemove: (index: number) => void;
  onUpdate: (index: number, updatedValue: Form.RecipeIngredient) => void;
}

export default function IngredientFormSection({
  allIngredients,
  allUnits,
  ingredientInputs,
  valid,
  onAdd,
  onRemove,
  onUpdate,
}: IngredientFormSectionProps) {
  const ingredientList: ListItem[] = allIngredients
    .sort(({ name: aName }, { name: bName }) => aName.localeCompare(bName))
    .map(({ id, name }) => ({ id, text: name }));
  return (
    <div className={styles.container}>
      <Title size="medium" title="Ingredients" alignment="left" />
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
              ingredients={ingredientList}
              units={allUnits.map((u, i) => ({ id: `${i}`, text: u }))}
            />
            <div onClick={() => onRemove(i)}>
              <ClearIcon className={styles.deleteButton} />
            </div>
          </div>
        ))}
        <button className={styles.addButton} disabled={!valid} onClick={onAdd}>
          Add Ingredient
        </button>
      </div>
    </div>
  );
}
