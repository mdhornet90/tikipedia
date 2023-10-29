import styles from "./IngredientFormField.module.css";
import IngredientField from "../IngredientField";

interface IngredientFormFieldProps {
  ingredients: ListItem[];
  units: ListItem[];
}
export default function IngredientFormField({
  ingredients,
}: IngredientFormFieldProps) {
  return (
    <div className={styles.container}>
      <IngredientField ingredients={ingredients} />
      <div className={styles.spacer} />
      <input size={1} placeholder="Amount"></input>
      <div className={styles.spacer} />
      <input size={1} placeholder="Unit"></input>
    </div>
  );
}
