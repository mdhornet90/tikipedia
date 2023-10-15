import { PropsWithChildren } from "react";
import styles from "./index.module.css";

export default function TikiHeader({ children }: PropsWithChildren) {
  return <div className={styles.index}>{children}</div>;
}
