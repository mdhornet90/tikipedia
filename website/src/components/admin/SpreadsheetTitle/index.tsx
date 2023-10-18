import Title from "../../common/Title";
import styles from "./SpreadsheetTitle.module.css";

export default function SpreadsheetTitle({ title }: { title: string }) {
  return (
    <th className={styles.categoryTitle}>
      <Title title={title} size="medium" />
    </th>
  );
}
