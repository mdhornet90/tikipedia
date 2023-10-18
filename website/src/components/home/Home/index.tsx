import { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import styles from "./Home.module.css";
import CardArea from "../CardArea";
import Loading from "../../common/Loading";
import Card from "../Card";
import TikiHeader from "../../common/TikiHeader";
import { getRecipeCards, getRecipeDetail } from "../../../api";
import RecipeDetail from "../RecipeDetail";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const ref = useRef(null);
  const [cards, setCards] = useState<RecipeCard[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [recipeDetail, setRecipeDetail] = useState<RecipeDetail | null>(null);

  useEffect(() => {
    (async function () {
      if (isLoading) {
        setCards(await getRecipeCards());
        setIsLoading(false);
      }
    })();
  }, [isLoading]);

  useEffect(() => {
    if (selectedId) {
      (async () => {
        setRecipeDetail(await getRecipeDetail(selectedId));
      })();
    } else {
      setRecipeDetail(null);
    }
  }, [selectedId]);

  return (
    <div>
      <header className={styles.header}>
        <TikiHeader />
        {isLoading ? (
          <Loading indicatorStyle="dark" />
        ) : (
          <CardArea>
            {cards.map((card) => {
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
            recipe={recipeDetail}
            onClose={() => setSelectedId(null)}
          />
        </CSSTransition>
      </header>
    </div>
  );
}
