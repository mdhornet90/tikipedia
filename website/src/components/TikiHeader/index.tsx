import { PropsWithChildren } from "react";
import styles from "./TikiHeader.module.css";

export default function TikiHeader({ children }: PropsWithChildren) {
  return <div className={styles.index}>{children}</div>;
}
