import Tag from "../Tag";
import styles from "./index.module.css";

interface CardProps {
  id: string;
  name: string;
  imageUrl?: string;
  tags?: Tag[];
  onTap: () => void;
}

export default function Card({ id, name, imageUrl, tags, onTap }: CardProps) {
  return (
    <div className={styles.card} onClick={onTap}>
      {imageUrl && (
        <img className={styles.cardImage} src={imageUrl} alt={imageUrl} />
      )}
      <div className={styles.cardTitle}>{name}</div>
      <div className={styles.tagContainer}>
        {tags?.map((tag, i) => (
          <Tag {...tag} key={`card-${id}-tag-${i}`} />
        ))}
      </div>
    </div>
  );
}
