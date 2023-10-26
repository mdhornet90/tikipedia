import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "./DropdownField.module.css";
import Title from "../../common/Title";

interface DropdownItem {
  id: string;
  text: string;
}
interface DropdownFieldProps {
  title: string;
  list: DropdownItem[];
  onSelect: (id?: string) => void;
}
export default function DropdownField({
  title,
  list,
  onSelect,
}: DropdownFieldProps) {
  return (
    <div className={styles.outerContainer}>
      <Title size="medium" title={title} />
      <div className={styles.inputContainer}>
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
    </div>
  );
}
