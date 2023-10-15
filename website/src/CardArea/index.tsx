import styles from "./index.module.css";

type CardAreaProps = React.PropsWithChildren;

export default function CardArea({ children }: CardAreaProps) {
  return <div className={styles.cardArea}>{children}</div>;
}
