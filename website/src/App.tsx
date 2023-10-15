import React, { useEffect, useState } from "react";
import "./App.css";
import ExtraLargeTitle from "./ExtraLargeTitle";
import CardArea from "./CardArea";
import Loading from "./Loading";
import Card from "./Card";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [cards, setCards] = useState<RecipeCard[]>([]);

  useEffect(() => {
    setTimeout(() => {
      if (isLoading) {
        setCards([
          {
            id: "0",
            title: "Daiquiri",
            imageUrl:
              "https://www.liquor.com/thmb/aLlM1JQiNiu0o2Mwx2n2AfOgoyw=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Daiquiri_3000x3000_primary-206eb2330cb04852ab7d780dcf3d55ef.jpg",
            tags: [{ title: "Lime" }, { title: "Sugar" }, { title: "Simple" }],
          },
          {
            id: "1",
            title: "Daiquiri",
            imageUrl:
              "https://www.liquor.com/thmb/aLlM1JQiNiu0o2Mwx2n2AfOgoyw=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Daiquiri_3000x3000_primary-206eb2330cb04852ab7d780dcf3d55ef.jpg",
            tags: [{ title: "Lime" }, { title: "Sugar" }, { title: "Simple" }],
          },
          {
            id: "2",
            title: "Daiquiri",
            imageUrl:
              "https://www.liquor.com/thmb/aLlM1JQiNiu0o2Mwx2n2AfOgoyw=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Daiquiri_3000x3000_primary-206eb2330cb04852ab7d780dcf3d55ef.jpg",
            tags: [{ title: "Lime" }, { title: "Sugar" }, { title: "Simple" }],
          },
        ]);

        setIsLoading(false);
      }
    }, 1000);
  }, [isLoading]);

  return (
    <div className="App">
      <header className="App-header">
        <ExtraLargeTitle title="Tikipedia" />
        {isLoading ? (
          <Loading />
        ) : (
          <CardArea>
            {cards.map((card) => (
              <Card {...card} />
            ))}
          </CardArea>
        )}
      </header>
    </div>
  );
}

export default App;
