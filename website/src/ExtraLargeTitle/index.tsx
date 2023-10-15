import styles from "./index.module.css";

interface ExtraLargeTitleProps {
  title: string;
}

export default function ExtraLargeTitle({ title }: ExtraLargeTitleProps) {
  return <div className={styles.extraLargeTitle}>{title}</div>;
}
