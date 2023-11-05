import ClearIcon from "@mui/icons-material/Clear";
import styles from "./GarnishFormSection.module.css";
import OptionSearchField from "../../form/OptionSearchField";
import FormFieldWrapper from "../../form/FormFieldWrapper";
import { useEffect, useMemo, useState } from "react";
import { recipeGarnishValid } from "../RecipeFormModal/utils";

interface GarnishFormSectionProps {
  garnishInputs: Input.RecipeGarnish[];
  garnishLookup: Record<string, Input.Data.Garnish>;
  onAdd: () => void;
  onRemove: (index: number) => void;
  onUpdate: (index: number, updatedValue: Input.RecipeGarnish) => void;
}

export default function GarnishFormSection({
  garnishInputs,
  garnishLookup,
  onAdd,
  onRemove,
  onUpdate,
}: GarnishFormSectionProps) {
  const allGarnishes = useMemo(
    () => Object.keys(garnishLookup),
    [garnishLookup]
  );

  const [addEnabled, setAddEnabled] = useState(false);
  useEffect(() => {
    setAddEnabled(
      garnishInputs.every((garnish) =>
        recipeGarnishValid(garnishLookup, garnish)
      )
    );
  }, [garnishInputs, garnishLookup]);

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
        <button
          className={styles.addButton}
          disabled={!addEnabled}
          onClick={onAdd}
        >
          Add Garnish
        </button>
      </div>
    </FormFieldWrapper>
  );
}
