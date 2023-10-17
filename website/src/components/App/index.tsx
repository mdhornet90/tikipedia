import { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import styles from "./App.module.css";
import Title from "../Title";
import CardArea from "../CardArea";
import Loading from "../Loading";
import Card from "../Card";
import TikiHeader from "../TikiHeader";
import { getRecipeCards, getRecipeDetail } from "../../api";
import RecipeDetail from "../RecipeDetail";

export default function App() {
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
      <header className={styles["App-header"]}>
        <TikiHeader>
          <Title title={"Tikipedia"} size="extraLarge" />
        </TikiHeader>
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
