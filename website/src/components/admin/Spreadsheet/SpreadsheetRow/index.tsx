import { PropsWithChildren } from "react";
import styles from "./SpreadsheetRow.module.css";

interface SpreadsheetRowProps extends PropsWithChildren {
  onClick?: () => void;
}

export default function SpreadsheetRow({
  children,
  onClick,
}: SpreadsheetRowProps) {
  return (
    <tr className={styles.spreadsheetRow} onClick={onClick}>
      {children}
    </tr>
  );
}
