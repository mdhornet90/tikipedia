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
    <div className={`${styles.modalBackground} ${open ? styles.show : ""}`}>
      <div className={`${styles.editingModal} ${open ? styles.show : ""}`}>
        <CloseIcon
          className={styles.closeButton}
          fontSize="large"
          onClick={onClose}
        />
        <div className={styles.content}>
          <Title title={title} size="large" />
          <div className={styles.inputArea}>{children}</div>
          <button
            className={styles.saveButton}
            disabled={!formValid}
            onClick={onSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
