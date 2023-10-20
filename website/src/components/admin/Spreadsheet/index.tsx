import styles from "./Spreadsheet.module.css";
import AddIcon from "@mui/icons-material/Add";
import SpreadsheetItem from "./SpreadsheetItem";
import SpreadsheetRow from "./SpreadsheetRow";
import SpreadsheetTitle from "./SpreadsheetTitle";

interface SpreadsheetProps {
  data: Ingredient[];
  onAdd: () => void;
}

export default function Spreadsheet({ data, onAdd }: SpreadsheetProps) {
  return (
    <div className={styles.spreadsheet}>
      <table className={styles.spreadsheetGrid}>
        <thead>
          <SpreadsheetRow>
            <SpreadsheetTitle title="Name" />
            <SpreadsheetTitle title="ABV" />
          </SpreadsheetRow>
        </thead>
        <tbody className={styles.spreadsheetBody}>
          {data.map((ingredient, i) => (
            <SpreadsheetRow key={i}>
              <SpreadsheetItem text={ingredient.name} />
              <SpreadsheetItem text={ingredient.abv?.toString() ?? ""} />
            </SpreadsheetRow>
          ))}
        </tbody>
      </table>
      <div className={styles.addButton} onClick={onAdd}>
        <AddIcon className={styles.addIcon} />
      </div>
    </div>
  );
}
