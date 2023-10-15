import Tag from "../Tag";
import styles from "./index.module.css";

interface CardProps {
  id: string;
  title: string;
  imageUrl: string;
  tags: Tag[];
  onTap: () => void;
}

export default function Card(props: CardProps) {
  return (
    <div className={styles.card} onClick={props.onTap}>
      <img
        className={styles.cardImage}
        src={props.imageUrl}
        alt={props.imageUrl}
      />
      <div className={styles.cardTitle}>{props.title}</div>
      <div className={styles.tagContainer}>
        {props.tags.map((tag, i) => (
          <Tag {...tag} key={`card-${props.id}-tag-${i}`} />
        ))}
      </div>
    </div>
  );
}
