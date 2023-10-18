import styles from "./SpreadsheetItem.module.css";

export default function SpreadsheetItem({ text }: { text: String }) {
  return <td className={styles.spreadsheetItem}>{text}</td>;
}
