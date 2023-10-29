import { useState } from "react";
import styles from "./UnitField.module.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface UnitFieldProps {
  units: ListItem[];
}

export default function UnitField({ units }: UnitFieldProps) {
  const [disabled, setDisabled] = useState(true);
  return (
    <div className={styles.inputContainer}>
      <select
        placeholder="Unit"
        className={`${styles.dropdown} ${disabled ? styles.disabled : ""}`}
        // onChange={(e) => onSelect(e.target.value)}
      >
        <option disabled selected className={styles.placeholder}>
          Unit
        </option>
        {units.map(({ id, text }, i) => (
          <option key={i} value={id} onClick={() => setDisabled(false)}>
            {text}
          </option>
        ))}
      </select>
      <ExpandMoreIcon className={styles.icon} fontSize="large" />
    </div>
  );
}
