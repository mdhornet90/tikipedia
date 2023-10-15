import styles from "./index.module.css";

interface TagProps {
  title: string;
}

export default function Tag({ title }: TagProps) {
  return <div className={styles.tag}>{title}</div>;
}
