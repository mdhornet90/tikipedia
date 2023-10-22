import { HTMLInputTypeAttribute } from "react";
import Title from "../../common/Title";
import styles from "./FormField.module.css";

interface FormFieldProps {
  name: string;
  type?: HTMLInputTypeAttribute;
  inputMode?: "text" | "numeric" | "decimal";
  value: string | number | string[] | undefined;
  onUpdate: (value: any) => void;
}

export function FormField({
  name,
  type = "text",
  inputMode = "text",
  value,
  onUpdate,
}: FormFieldProps) {
  return (
    <div className={styles.formField}>
      <Title title={name} size="medium" />
      <input
        type={type}
        inputMode={inputMode}
        className={styles.input}
        defaultValue={value}
        onChange={(e) => {
          onUpdate(e.target.value);
        }}
      />
    </div>
  );
}
