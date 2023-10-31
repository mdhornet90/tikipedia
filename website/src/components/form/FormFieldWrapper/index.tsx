import { PropsWithChildren } from "react";
import styles from "./FormFieldWrapper.module.css";
import Title from "../../common/Title";

interface FormFieldWrapperProps extends PropsWithChildren {
  title?: string;
}
export default function FormFieldWrapper({
  title,
  children,
}: FormFieldWrapperProps) {
  return (
    <div className={styles.formField}>
      {title && <Title title={title} size="medium" />}
      <div className={styles.input}>{children}</div>
    </div>
  );
}
