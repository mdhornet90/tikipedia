import Title from "../../common/Title";
import styles from "./FormField.module.css";

interface FormFieldProps {
  name: string;
  value: string | number | string[] | undefined;
  onUpdate: (value: any) => void;
}

export function FormField({ name, value, onUpdate }: FormFieldProps) {
  return (
    <div className={styles.formField}>
      <Title title={name} size="medium" />
      <input
        type="text"
        className={styles.input}
        defaultValue={value}
        onChange={(e) => {
          let updatedValue = e.target.value;
          onUpdate(updatedValue);
        }}
      />
    </div>
  );
}
