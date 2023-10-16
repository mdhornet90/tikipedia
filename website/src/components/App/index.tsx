import { useEffect, useState } from "react";
import styles from "./App.module.css";
import Title from "../Title";
import CardArea from "../CardArea";
import Loading from "../Loading";
import Card from "../Card";
import TikiHeader from "../TikiHeader";
import { getRecipeDetail } from "../../api";
import RecipeDetail from "../RecipeDetail";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [cards, setCards] = useState<RecipeCard[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [recipeDetail, setRecipeDetail] = useState<RecipeDetail | null>(null);

  useEffect(() => {
    setTimeout(() => {
      if (isLoading) {
        setCards([
          {
            id: "0",
            title: "Daiquiri 1",
            imageUrl:
              "https://www.liquor.com/thmb/aLlM1JQiNiu0o2Mwx2n2AfOgoyw=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Daiquiri_3000x3000_primary-206eb2330cb04852ab7d780dcf3d55ef.jpg",
            tags: [{ title: "Lime" }, { title: "Sugar" }, { title: "Simple" }],
          },
          {
            id: "1",
            title: "Daiquiri 2",
            imageUrl:
              "https://www.liquor.com/thmb/aLlM1JQiNiu0o2Mwx2n2AfOgoyw=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Daiquiri_3000x3000_primary-206eb2330cb04852ab7d780dcf3d55ef.jpg",
            tags: [{ title: "Lime" }, { title: "Sugar" }, { title: "Simple" }],
          },
          {
            id: "2",
            title: "Daiquiri 3",
            imageUrl:
              "https://www.liquor.com/thmb/aLlM1JQiNiu0o2Mwx2n2AfOgoyw=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Daiquiri_3000x3000_primary-206eb2330cb04852ab7d780dcf3d55ef.jpg",
            tags: [{ title: "Lime" }, { title: "Sugar" }, { title: "Simple" }],
          },
        ]);

        setIsLoading(false);
      }
    }, 1000);
  }, [isLoading]);

  useEffect(() => {
    if (selectedId) {
      setTimeout(() => {
        setRecipeDetail(getRecipeDetail(selectedId));
      }, 1000);
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
                <Card {...card} key={id} onTap={() => setSelectedId(id)} />
              );
            })}
          </CardArea>
        )}
        {selectedId && (
          <RecipeDetail
            recipe={recipeDetail}
            onClose={() => setSelectedId(null)}
          />
        )}
      </header>
    </div>
  );
}
