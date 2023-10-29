import styles from "./IngredientFormField.module.css";
import IngredientField from "../IngredientField";

interface IngredientFormFieldProps {
  ingredients: ListItem[];
  units: ListItem[];
}
export default function IngredientFormField({
  ingredients,
  units,
}: IngredientFormFieldProps) {
  return (
    <div className={styles.container}>
      <IngredientField ingredients={ingredients} />
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
