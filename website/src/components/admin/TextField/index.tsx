import { HTMLInputTypeAttribute } from "react";
import Title from "../../common/Title";
import styles from "./TextField.module.css";

interface TextFieldProps {
  name?: string;
  type?: HTMLInputTypeAttribute;
  inputMode?: "text" | "numeric" | "decimal";
  value: string | number | string[] | undefined;
  onUpdate: (value: any) => void;
}

export default function TextField({
  name,
  type = "text",
  inputMode = "text",
  value,
  onUpdate,
}: TextFieldProps) {
  return (
    <div className={styles.formField}>
      {name && <Title title={name} size="medium" />}
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
