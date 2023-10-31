import styles from "./IngredientFormField.module.css";
import IngredientField from "../IngredientField";
import UnitField from "../UnitField";

interface IngredientFormFieldProps {
  ingredients: ListItem[];
  units: ListItem[];
  selectedIngredient: string;
  onUpdate: (key: keyof Form.RecipeIngredient, value: string) => void;
}
export default function IngredientFormField({
  ingredients,
  units,
  selectedIngredient,
  onUpdate,
}: IngredientFormFieldProps) {
  console.log(selectedIngredient);
  return (
    <div className={styles.container}>
      <IngredientField
        ingredients={ingredients}
        text={selectedIngredient}
        onSelect={(newIngredient) => onUpdate("name", newIngredient)}
      />
      <div className={styles.spacer} />
      <input
        size={1}
        placeholder="Amount"
        className={styles.amountInput}
      ></input>
      <div className={styles.spacer} />
      <UnitField units={units} />
    </div>
  );
}
