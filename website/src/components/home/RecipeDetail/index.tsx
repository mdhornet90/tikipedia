import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
  Ref,
  PropsWithChildren,
} from "react";
import { CSSTransition } from "react-transition-group";
import Fraction from "fraction.js";

import Title from "../../common/Title";
import styles from "./RecipeDetail.module.css";
import CloseIcon from "@mui/icons-material/Close";
import Loading from "../../common/Loading";
import { useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import { Display } from "../../../api";

export default forwardRef(function () {
  const { recipeSlug } = useParams();
  const [showRecipe, setShowRecipe] = useState(false);
  const ref = useRef(null);
  const { data: recipe } = useQuery<{ recipeBySlug: Main.RecipeDetail }>(
    Display.Detail,
    { variables: { slug: recipeSlug } }
  );
  const navigate = useNavigate();

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        navigate("..");
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [navigate]);

  useEffect(() => {
    if (!showRecipe && recipe) {
      setShowRecipe(true);
    }
  }, [showRecipe, recipe]);

  return (
    <div className={styles.recipeOverlay} onClick={() => navigate("..")}>
      {!showRecipe && <Loading indicatorStyle="light" />}
      <CSSTransition
        nodeRef={ref}
        in={showRecipe}
        timeout={300}
        classNames={"fade"}
        mountOnEnter={true}
        unmountOnExit={true}
      >
        {showRecipe ? (
          <RecipeSection
            ref={ref}
            recipe={recipe?.recipeBySlug}
            onClose={() => navigate("..")}
          />
        ) : (
          <></>
        )}
      </CSSTransition>
    </div>
  );
});

interface RecipeSectionProps {
  recipe?: Main.RecipeDetail | null;
  onClose: () => void;
}
const RecipeSection = forwardRef(function (
  { recipe, onClose }: RecipeSectionProps,
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
              <span key={`amount-unit-${i}`} className={styles.amountUnit}>
                {`${new Fraction(ingredient.quantity).toFraction(true)} ${
                  ingredient.unit
                }`}
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

interface RecipeDetailSectionProps extends PropsWithChildren {
  title: string;
}

function RecipeDetailSection({ title, children }: RecipeDetailSectionProps) {
  return (
    <div className={styles.detailSection}>
      <Title title={title} size="medium" alignment="left" />
      {children}
    </div>
  );
}
