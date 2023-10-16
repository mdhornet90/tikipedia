import React from "react";
import Title from "../Title";
import styles from "./index.module.css";
import CloseIcon from "@mui/icons-material/Close";

interface RecipeDetailProps {
  recipe?: RecipeDetail | null;
  onClose: () => void;
}

export default function RecipeDetail({ recipe, onClose }: RecipeDetailProps) {
  return (
    <div className={styles.recipeOverlay}>
      {recipe && (
        <div className={styles.recipeDetail}>
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
      )}
    </div>
  );
}
