import styles from "./TextAreaField.module.css";

interface TextAreaFieldProps {
  text: string;
  onUpdate: (updatedText: string) => void;
}
export default function TextAreaField({ text, onUpdate }: TextAreaFieldProps) {
  return (
    <div className={styles.container}>
      <textarea
        className={styles.textArea}
        rows={5}
        value={text}
        onChange={(e) => onUpdate(e.target.value)}
      />
    </div>
  );
}
