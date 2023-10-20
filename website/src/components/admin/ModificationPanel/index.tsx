import { useState } from "react";
import Title from "../../common/Title";
import styles from "./ModificationPanel.module.css";
import { FormFieldConfiguration } from "../../../data/formConfiguration";

interface SingleFieldModificationPanelProps {
  panelTitle: string;
  fields: FormFieldConfiguration[];
  onSave: (updatedValue: string) => void;
}

export function SingleFieldModificationPanel({
  panelTitle,
  fields,
  onSave,
}: SingleFieldModificationPanelProps) {
  const [fieldValue, setFieldValue] = useState("");
  const [formValid, setFormValid] = useState(false);

  return (
    <div className={styles.content}>
      <Title title={panelTitle} size="large" />
      <div className={styles.inputArea}>
        {fields.map(({ name, initialValue }, i) => (
          <FormField
            key={i}
            name={name}
            initialValue={initialValue}
            onUpdate={() => {}}
          />
        ))}
      </div>
      <button className={styles.saveButton} disabled={!formValid}>
        Save
      </button>
    </div>
  );
}

interface FormFieldProps {
  name: string;
  initialValue: any;
  onUpdate: (value: any) => void;
}

function FormField({ name, initialValue, onUpdate }: FormFieldProps) {
  const [fieldValue, setFieldValue] = useState(initialValue);

  return (
    <div className={styles.formField}>
      <Title title={name} size="medium" />
      <input
        type="text"
        className={styles.input}
        defaultValue={fieldValue}
        onChange={(e) => {
          let updatedValue = e.target.value;
          onUpdate(updatedValue);
          setFieldValue(updatedValue);
        }}
      />
    </div>
  );
}
