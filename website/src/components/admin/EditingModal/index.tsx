import { PropsWithChildren } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./EditingModal.module.css";
import Title from "../../common/Title";

interface EditingModalProps extends PropsWithChildren {
  open: boolean;
  title: string;
  formValid: boolean;
  onClose: () => void;
  onSave: () => void;
}

export default function EditingModal({
  open,
  title,
  children,
  formValid,
  onClose,
  onSave,
}: EditingModalProps) {
  return (
    <div className={`${styles.editingModal} ${open ? styles.show : ""}`}>
      <CloseIcon
        className={styles.closeButton}
        fontSize="large"
        onClick={onClose}
      />
      <form
        className={styles.content}
        onSubmit={(e) => {
          e.preventDefault();
          onSave();
        }}
      >
        <Title title={title} size="large" />
        <div className={styles.inputArea}>{children}</div>
        <button className={styles.saveButton} disabled={!formValid}>
          Save
        </button>
      </form>
    </div>
  );
}
