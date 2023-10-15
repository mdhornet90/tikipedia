import styles from "./index.module.css";

interface LargeTitleProps {
  title: string;
}

export default function LargeTitle({ title }: LargeTitleProps) {
  return <div className={styles.largeTitle}>{title}</div>;
}
