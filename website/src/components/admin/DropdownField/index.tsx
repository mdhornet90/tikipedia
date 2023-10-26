import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "./DropdownField.module.css";

interface DropdownItem {
  id: string;
  text: string;
}
interface DropdownFieldProps {
  list: DropdownItem[];
  onSelect: (id?: string) => void;
}
export default function DropdownField({ list, onSelect }: DropdownFieldProps) {
  return (
    <div className={styles.container}>
      <select
        className={styles.dropdown}
        onChange={(e) => onSelect(e.target.value)}
      >
        {[{ id: undefined, text: "" }, ...list].map(({ id, text }, i) => (
          <option key={i} value={id}>
            {text}
          </option>
        ))}
      </select>
      <ExpandMoreIcon className={styles.icon} fontSize="large" />
    </div>
  );
}
