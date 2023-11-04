import { PropsWithChildren, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./EditingModal.module.css";
import Title from "../../common/Title";

interface EditingModalProps extends PropsWithChildren {
  open: boolean;
  title: string;
  formValid: boolean;
  showDelete: boolean;
  onClose: () => void;
  onSave: () => void;
  onDelete: () => void;
}

type DeleteState = "confirming" | "deleting";

export default function EditingModal({
  open,
  title,
  children,
  formValid,
  showDelete,
  onClose,
  onSave,
  onDelete,
}: EditingModalProps) {
  const [deleteState, setDeleteState] = useState<DeleteState | null>(null);

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
          <div className={styles.actionArea}>
            <button
              className={styles.saveButton}
              disabled={!formValid}
              onClick={onSave}
            >
              Save
            </button>
            {showDelete && (
              <button
                className={styles.deleteButton}
                onClick={() => setDeleteState("confirming")}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
