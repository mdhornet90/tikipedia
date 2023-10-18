import React, { useEffect, useRef, useState, forwardRef, Ref } from "react";
import { CSSTransition } from "react-transition-group";
import Title from "../../common/Title";
import styles from "./RecipeDetail.module.css";
import CloseIcon from "@mui/icons-material/Close";
import Loading from "../../common/Loading";

interface RecipeDetailProps {
  recipe?: RecipeDetail | null;
  onClose: () => void;
}

const ForwardedRecipeDetail = forwardRef(RecipeDetail);
export default ForwardedRecipeDetail;

function RecipeDetail(
  { recipe, onClose }: RecipeDetailProps,
  ref: Ref<HTMLDivElement>
) {
  const [showRecipe, setShowRecipe] = useState(false);
  const innerRef = useRef(null);

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

  useEffect(() => {
    if (!showRecipe && recipe) {
      setShowRecipe(true);
    }
  }, [showRecipe, recipe]);

  return (
    <div ref={ref} className={styles.recipeOverlay} onClick={onClose}>
      {!showRecipe && <Loading indicatorStyle="light" />}
      <CSSTransition
        nodeRef={innerRef}
        in={showRecipe}
        timeout={300}
        classNames={"fade"}
        mountOnEnter={true}
        unmountOnExit={true}
      >
        {showRecipe ? (
          <ForwardedRecipeSection
            ref={innerRef}
            onClose={onClose}
            recipe={recipe}
          />
        ) : (
          <></>
        )}
      </CSSTransition>
    </div>
  );
}

const ForwardedRecipeSection = forwardRef(RecipeSection);

function RecipeSection(
  {
    onClose,
    recipe,
  }: {
    onClose: () => void;
    recipe?: RecipeDetail | null;
  },
  ref: Ref<HTMLDivElement>
) {
  return recipe ? (
    <div
      ref={ref}
      className={styles.recipeDetail}
      onClick={(e) => e.stopPropagation()}
    >
      <CloseIcon className={styles.closeButton} onClick={onClose} />
      <Title title={recipe.title} size="large" />
      <Title title={"Ingredients"} size="medium" alignment="left" />
      <div className={styles.ingredients}>
        {recipe.ingredients.map((ingredient, i) => (
          <React.Fragment key={i}>
            <span key={`amount-${i}`} className={styles.amount}>
              {ingredient.quantity}
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
      {recipe.garnishes && recipe.garnishes.length > 0 && (
        <>
          <Title title={"Garnishes"} size="medium" alignment="left" />
          <div className={styles.garnishes}>
            {recipe.garnishes.map((g, i) => (
              <div key={i}>{g}</div>
            ))}
          </div>
        </>
      )}
      <Title title={"Glassware"} size="medium" alignment="left" />
      <div className={styles.glassware}>{recipe.glassware.name}</div>
      <Title title={"Preparation"} size="medium" alignment="left" />
      <div className={styles.instructions}>{recipe.instructions}</div>
    </div>
  ) : (
    <></>
  );
}
