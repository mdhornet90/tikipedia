import { useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import styles from "./Home.module.css";
import CardArea from "../CardArea";
import Loading from "../../common/Loading";
import Card from "../Card";
import TikiHeader from "../../common/TikiHeader";
import { GetRecipeCards, GetRecipeDetail } from "../../../api";
import RecipeDetail from "../RecipeDetail";
import { useQuery } from "@apollo/client";

export default function Home() {
  const { loading: cardsLoading, data: cardData } = useQuery<{
    recipes: Main.RecipeCard[];
  }>(GetRecipeCards);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { data: recipeDetail } = useQuery<{ recipe: Main.RecipeDetail }>(
    GetRecipeDetail,
    { skip: !selectedId, variables: { id: selectedId } }
  );
  const ref = useRef(null);

  return (
    <div>
      <header className={styles.header}>
        <TikiHeader />
        {cardsLoading ? (
          <Loading indicatorStyle="dark" />
        ) : (
          <CardArea>
            {cardData?.recipes.map((card) => {
              const id = card.id;
              return (
                <Card key={id} card={card} onTap={() => setSelectedId(id)} />
              );
            })}
          </CardArea>
        )}
        <CSSTransition
          nodeRef={ref}
          in={selectedId !== null}
          timeout={300}
          classNames={"fade"}
          mountOnEnter={true}
          unmountOnExit={true}
        >
          <RecipeDetail
            ref={ref}
            recipe={recipeDetail?.recipe}
            onClose={() => setSelectedId(null)}
          />
        </CSSTransition>
      </header>
    </div>
  );
}
