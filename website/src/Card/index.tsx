import Tag from "../Tag";
import styles from "./index.module.css";

interface CardProps {
  id: string;
  title: string;
  imageUrl: string;
  tags: Tag[];
}

export default function Card(props: CardProps) {
  return (
    <div className={styles.card}>
      <img
        className={styles.cardImage}
        src={props.imageUrl}
        alt={props.imageUrl}
      />
      <div className={styles.cardTitle}>{props.title}</div>
      <div className={styles.tagContainer}>
        {props.tags.map((tag) => (
          <Tag {...tag} />
        ))}
      </div>
    </div>
  );
}
