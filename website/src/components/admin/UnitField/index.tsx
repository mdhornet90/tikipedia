import { useState } from "react";
import styles from "./UnitField.module.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface UnitFieldProps {
  units: ListItem[];
  text: string;
  onSelect: (value: string) => void;
}

export default function UnitField({ units, text, onSelect }: UnitFieldProps) {
  const [disabled, setDisabled] = useState(true);
  return (
    <div className={styles.inputContainer}>
      <select
        placeholder="Unit"
        className={`${styles.dropdown} ${disabled ? styles.disabled : ""}`}
        onChange={(e) => onSelect(e.target.value)}
        value={text}
      >
        <option disabled className={styles.placeholder}>
          Unit
        </option>
        {units.map(({ text }, i) => (
          <option key={i} value={text} onClick={() => setDisabled(false)}>
            {text}
          </option>
        ))}
      </select>
      <ExpandMoreIcon className={styles.icon} fontSize="large" />
    </div>
  );
}
