import styles from "./EditingModal.module.css";

interface EditingModalProps {
  open: boolean;
  onClose: () => void;
}

export default function EditingModal({ open, onClose }: EditingModalProps) {
  return (
    <div
      className={`${styles.editingModal} ${open ? styles.show : ""}`}
      onClick={onClose}
    >
      hello
    </div>
  );
}
