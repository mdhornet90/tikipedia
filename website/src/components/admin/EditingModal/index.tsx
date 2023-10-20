import { PropsWithChildren } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./EditingModal.module.css";

interface EditingModalProps extends PropsWithChildren {
  open: boolean;
  onClose: () => void;
}

export default function EditingModal({
  open,
  onClose,
  children,
}: EditingModalProps) {
  return (
    <div className={`${styles.editingModal} ${open ? styles.show : ""}`}>
      <CloseIcon
        className={styles.closeButton}
        fontSize="large"
        onClick={onClose}
      />
      {children}
    </div>
  );
}
