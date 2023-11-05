import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
  Ref,
  PropsWithChildren,
} from "react";
import { CSSTransition } from "react-transition-group";
import Title from "../../common/Title";
import styles from "./RecipeDetail.module.css";
import CloseIcon from "@mui/icons-material/Close";
import Loading from "../../common/Loading";

interface RecipeDetailProps {
  recipe?: Main.RecipeDetail | null;
  onClose: () => void;
}

export default forwardRef(function (
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
          <RecipeSection ref={innerRef} onClose={onClose} recipe={recipe} />
        ) : (
          <></>
        )}
      </CSSTransition>
    </div>
  );
});

const RecipeSection = forwardRef(function (
  {
    onClose,
    recipe,
  }: {
    onClose: () => void;
    recipe?: Main.RecipeDetail | null;
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
      <RecipeDetailSection title={"Ingredients"}>
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
      </RecipeDetailSection>
      <RecipeDetailSection title="Glassware">
        <div className={styles.glassware}>{recipe.glassware.name}</div>
      </RecipeDetailSection>
      {recipe.garnishes && recipe.garnishes.length > 0 && (
        <RecipeDetailSection title="Garnishes">
          <div className={styles.garnishes}>
            {recipe.garnishes.map(({ name }, i) => (
              <div key={i}>{name}</div>
            ))}
          </div>
        </RecipeDetailSection>
      )}
      <RecipeDetailSection title={"Preparation"}>
        <div className={styles.instructions}>{recipe.instructions}</div>
      </RecipeDetailSection>
    </div>
  ) : (
    <></>
  );
});

interface RecipeSectionProps extends PropsWithChildren {
  title: string;
}

function RecipeDetailSection({ title, children }: RecipeSectionProps) {
  return (
    <div className={styles.detailSection}>
      <Title title={title} size="medium" alignment="left" />
      {children}
    </div>
  );
}
