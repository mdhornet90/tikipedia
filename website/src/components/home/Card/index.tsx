import Tag from "../Tag";
import styles from "./index.module.css";

interface CardProps {
  card: RecipeCard;
  onTap: () => void;
}

export default function Card({ card, onTap }: CardProps) {
  return (
    <div className={styles.card} onClick={onTap}>
      {card.imageUrl && (
        <img
          className={styles.cardImage}
          src={card.imageUrl}
          alt={card.imageUrl}
        />
      )}
      <div className={styles.cardTitle}>{card.title}</div>
      <div className={styles.tagContainer}>
        {card.tags?.map((tag, i) => (
          <Tag {...tag} key={`card-${card.id}-tag-${i}`} />
        ))}
      </div>
    </div>
  );
}
