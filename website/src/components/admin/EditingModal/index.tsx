import { PropsWithChildren, useEffect, useState } from "react";
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
  useEffect(() => {
    if (deleteState === "deleting") {
      setDeleteState(null);
      onDelete();
    }
  }, [deleteState, onDelete]);

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
              className={`${styles.button} ${styles.save}`}
              disabled={!formValid}
              onClick={onSave}
            >
              Save
            </button>
            {showDelete && (
              <button
                className={`${styles.button} ${styles.delete}`}
                onClick={() => setDeleteState("confirming")}
              >
                Delete
              </button>
            )}
          </div>
        </div>
        <div
          className={`${styles.deletePopup} ${
            deleteState === "confirming" ? styles.show : ""
          }`}
        >
          <div
            className={`${styles.deleteModal} ${
              deleteState === "confirming" ? styles.show : ""
            }`}
          >
            <Title size="large" title="Confirm Deletion" />
            <div className={styles.actionArea}>
              <button
                className={`${styles.button} ${styles.cancel}`}
                onClick={() => setDeleteState(null)}
              >
                Cancel
              </button>
              <button
                className={`${styles.button} ${styles.destroy}`}
                onClick={() => setDeleteState("deleting")}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
