import styles from "./Spreadsheet.module.css";
import AddIcon from "@mui/icons-material/Add";
import SpreadsheetItem from "./SpreadsheetItem";
import SpreadsheetRow from "./SpreadsheetRow";
import SpreadsheetTitle from "./SpreadsheetTitle";

interface SpreadsheetProps {
  headers: string[];
  data: Spreadsheet.RowData[];
  onAdd: () => void;
  onSelectItem: (id: string) => void;
}

export default function Spreadsheet({
  headers,
  data,
  onAdd,
  onSelectItem,
}: SpreadsheetProps) {
  return (
    <div className={styles.spreadsheet}>
      <table className={styles.spreadsheetGrid}>
        <thead>
          <SpreadsheetRow>
            {headers.map((header, i) => (
              <SpreadsheetTitle key={i} title={header} />
            ))}
          </SpreadsheetRow>
        </thead>
        <tbody className={styles.spreadsheetBody}>
          {data.map((item, i) => (
            <SpreadsheetRow key={i} onClick={() => onSelectItem(item.id)}>
              {item.data.map((name, i) => (
                <SpreadsheetItem key={i} text={name?.toString() ?? ""} />
              ))}
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
