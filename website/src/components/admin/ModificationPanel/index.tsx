import { useState } from "react";
import Title from "../../common/Title";
import styles from "./ModificationPanel.module.css";

interface SingleFieldModificationPanelProps {
  panelTitle: string;
  fieldName: string;
  validationRule: (value: string) => boolean;
  onSave: (updatedValue: string) => void;
}

export function SingleFieldModificationPanel({
  panelTitle,
  fieldName,
  validationRule,
}: SingleFieldModificationPanelProps) {
  const [fieldValue, setFieldValue] = useState("");
  const [formValid, setFormValid] = useState(false);

  return (
    <div className={styles.content}>
      <Title title={panelTitle} size="large" />
      <div className={styles.inputArea}>
        <Title title={fieldName} size="medium" />
        <input
          type="text"
          className={styles.input}
          defaultValue={fieldValue}
          onChange={(e) => {
            let updatedValue = e.target.value;
            setFieldValue(updatedValue);
            setFormValid(validationRule(updatedValue));
          }}
        />
      </div>
      <button className={styles.saveButton} disabled={!formValid}>
        Save
      </button>
    </div>
  );
}
