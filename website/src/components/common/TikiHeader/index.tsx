import { PropsWithChildren } from "react";
import styles from "./TikiHeader.module.css";
import Title from "../Title";

export default function TikiHeader({ children }: PropsWithChildren) {
  return (
    <div className={styles.index}>
      <Title title="Tikipedia" size="extraLarge" />
      {children}
    </div>
  );
}
