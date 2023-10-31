import styles from "./IngredientFormField.module.css";
import IngredientNameField from "../IngredientNameField";
import DropdownField from "../DropdownField";

interface IngredientFormFieldProps {
  ingredients: ListItem[];
  units: string[];
  selectedIngredient: string;
  selectedAmount: string;
  selectedUnit: string;
  onUpdate: (key: keyof Form.RecipeIngredient, value: string) => void;
}
export default function IngredientFormField({
  ingredients,
  units,
  selectedIngredient,
  selectedAmount,
  selectedUnit,
  onUpdate,
}: IngredientFormFieldProps) {
  return (
    <div className={styles.container}>
      <IngredientNameField
        ingredients={ingredients}
        text={selectedIngredient}
        onSelect={(newIngredient) => onUpdate("name", newIngredient)}
      />
      <div className={styles.spacer} />
      <input
        size={1}
        placeholder="Amount"
        className={styles.amountInput}
        value={selectedAmount}
        onChange={(e) => onUpdate("quantity", e.target.value)}
      ></input>
      <div className={styles.spacer} />
      <DropdownField
        defaultValue="Unit"
        values={units}
        text={selectedUnit}
        onSelect={(value) => onUpdate("unit", value)}
      />
    </div>
  );
}