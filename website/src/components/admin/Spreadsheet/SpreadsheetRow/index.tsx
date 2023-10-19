import { PropsWithChildren } from "react";
import styles from "./SpreadsheetRow.module.css";

export default function SpreadsheetRow({ children }: PropsWithChildren) {
  return <tr className={styles.spreadsheetRow}>{children}</tr>;
}
