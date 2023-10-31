import Title from "../../common/Title";
import IngredientFormField from "../IngredientFormField";
import styles from "./IngredientFormSection.module.css";

interface IngredientFormSectionProps {
  allIngredients: Ingredient[];
  ingredientInputs: Form.RecipeIngredient[];
  valid: boolean;
  onAdd: () => void;
  onUpdate: (index: number, updatedValue: Form.RecipeIngredient) => void;
  onRemove: (index: number) => void;
}

const allUnits = ["dash", "drop", "each", "oz", "tbsp", "tsp"];
export default function IngredientFormSection({
  allIngredients,
  ingredientInputs,
  valid,
  onAdd,
  onUpdate,
}: IngredientFormSectionProps) {
  const ingredientList: ListItem[] = allIngredients
    .sort(({ name: aName }, { name: bName }) => aName.localeCompare(bName))
    .map(({ id, name }) => ({ id, text: name }));
  return (
    <div className={styles.container}>
      <Title size="medium" title="Ingredients" alignment="left" />
      {ingredientInputs.map((ingredient, i) => (
        <IngredientFormField
          key={i}
          selectedIngredient={ingredient.name}
          onUpdate={(key, value) => {
            onUpdate(i, { ...ingredient, [key]: value });
          }}
          ingredients={ingredientList}
          units={allUnits.map((u, i) => ({ id: `${i}`, text: u }))}
        />
      ))}
      <button className={styles.addButton} disabled={!valid} onClick={onAdd}>
        Add Ingredient
      </button>
    </div>
  );
}
