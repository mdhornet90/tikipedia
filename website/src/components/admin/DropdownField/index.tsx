import { useState } from "react";
import styles from "./DropdownField.module.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface DropdownFieldProps {
  defaultValue: string;
  values: string[];
  text: string;
  onSelect: (value: string) => void;
}

export default function DropdownField({
  defaultValue,
  values,
  text,
  onSelect,
}: DropdownFieldProps) {
  const [disabled, setDisabled] = useState(true);
  return (
    <div className={styles.inputContainer}>
      <select
        className={`${styles.dropdown} ${disabled ? styles.disabled : ""}`}
        onChange={(e) => onSelect(e.target.value)}
        value={text}
      >
        <option disabled className={styles.placeholder}>
          {defaultValue}
        </option>
        {values.map((text, i) => (
          <option key={i} onClick={() => setDisabled(false)}>
            {text}
          </option>
        ))}
      </select>
      <ExpandMoreIcon className={styles.icon} fontSize="large" />
    </div>
  );
}
