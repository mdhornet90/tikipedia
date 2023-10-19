import styles from "./Spreadsheet.module.css";
import AddIcon from "@mui/icons-material/Add";
import SpreadsheetItem from "./SpreadsheetItem";
import SpreadsheetRow from "./SpreadsheetRow";
import SpreadsheetTitle from "./SpreadsheetTitle";

interface SpreadsheetProps {
  onAdd: () => void;
}

export default function Spreadsheet({ onAdd }: SpreadsheetProps) {
  return (
    <div className={styles.spreadsheet}>
      <table className={styles.spreadsheetGrid}>
        <thead>
          <SpreadsheetRow>
            <SpreadsheetTitle title="Title" />
            <SpreadsheetTitle title="Ingredients" />
            <SpreadsheetTitle title="Glassware" />
            <SpreadsheetTitle title="Garnishes" />
          </SpreadsheetRow>
        </thead>
        <tbody className={styles.spreadsheetBody}>
          {[...Array(20).keys()].map((i) => (
            <SpreadsheetRow key={i}>
              <SpreadsheetItem text="The Daiquiri" />
              <SpreadsheetItem text="Demerara syrup, lime juice, rum" />
              <SpreadsheetItem text="Coupe" />
              <SpreadsheetItem text="dehydrated lime wheel" />
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
