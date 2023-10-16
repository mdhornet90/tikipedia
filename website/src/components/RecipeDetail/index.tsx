import React, { useEffect } from "react";
import Title from "../Title";
import styles from "./RecipeDetail.module.css";
import CloseIcon from "@mui/icons-material/Close";
import Loading from "../Loading";

interface RecipeDetailProps {
  recipe?: RecipeDetail | null;
  onClose: () => void;
}

export default function RecipeDetail({ recipe, onClose }: RecipeDetailProps) {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return (
    <div className={styles.recipeOverlay} onClick={onClose}>
      {RecipeSection(onClose, recipe)}
    </div>
  );
}

function RecipeSection(onClose: () => void, recipe?: RecipeDetail | null) {
  if (!recipe) {
    return <Loading indicatorStyle="light" />;
  }
  return (
    <div className={styles.recipeDetail} onClick={(e) => e.stopPropagation()}>
      <CloseIcon className={styles.closeButton} onClick={onClose} />
      <Title title={recipe.title} size="large" />
      <Title title={"Ingredients"} size="medium" alignment="left" />
      <div className={styles.ingredients}>
        {recipe.ingredients.map((ingredient, i) => (
          <React.Fragment key={i}>
            <span key={`amount-${i}`} className={styles.amount}>
              {ingredient.amount}
            </span>
            <span key={`unit-${i}`} className={styles.unit}>
              {ingredient.unit}
            </span>
            <span key={`name-${i}`} className={styles.ingredientName}>
              {ingredient.name}
            </span>
          </React.Fragment>
        ))}
      </div>
      <Title title={"Garnishes"} size="medium" alignment="left" />
      <div className={styles.garnishes}>
        {recipe.garnishes.map((g, i) => (
          <div key={i}>{g}</div>
        ))}
      </div>
      <Title title={"Glassware"} size="medium" alignment="left" />
      <div className={styles.glassware}>{recipe.glassware}</div>
      <Title title={"Preparation"} size="medium" alignment="left" />
      <div className={styles.instructions}>{recipe.instructions}</div>
    </div>
  );
}