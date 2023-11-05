import ClearIcon from "@mui/icons-material/Clear";
import styles from "./GarnishFormSection.module.css";
import OptionSearchField from "../../form/OptionSearchField";
import FormFieldWrapper from "../../form/FormFieldWrapper";

interface GarnishFormSectionProps {
  garnishInputs: Input.RecipeGarnish[];
  allGarnishes: string[];
  valid: boolean;
  onAdd: () => void;
  onRemove: (index: number) => void;
  onUpdate: (index: number, updatedValue: Input.RecipeGarnish) => void;
}

export default function GarnishFormSection({
  garnishInputs,
  allGarnishes,
  valid,
  onAdd,
  onRemove,
  onUpdate,
}: GarnishFormSectionProps) {
  return (
    <FormFieldWrapper title="Garnishes">
      <div className={styles.inputContainer}>
        {garnishInputs.map((garnish, i) => (
          <div key={i} className={styles.rows}>
            <div className={styles.fields}>
              <input
                size={1}
                placeholder="Amount"
                className={styles.amountInput}
                value={garnish.quantity}
                onChange={(e) =>
                  onUpdate(i, { ...garnish, quantity: e.target.value })
                }
              />
              <div className={styles.spacer} />
              <OptionSearchField
                placeholder="Garnish"
                options={allGarnishes}
                text={garnish.name}
                onSelect={(newGarnish) =>
                  onUpdate(i, { ...garnish, name: newGarnish })
                }
              />
            </div>
            <div onClick={() => onRemove(i)}>
              <ClearIcon className={styles.deleteButton} />
            </div>
          </div>
        ))}
        <button className={styles.addButton} disabled={!valid} onClick={onAdd}>
          Add Garnish
        </button>
      </div>
    </FormFieldWrapper>
  );
}
