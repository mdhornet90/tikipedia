import styles from "./Home.module.css";
import CardArea from "../CardArea";
import Loading from "../../common/Loading";
import Card from "../Card";
import TikiHeader from "../../common/TikiHeader";
import { Display } from "../../../api";
import { useQuery } from "@apollo/client";
import { Link, Outlet } from "react-router-dom";

export default function Home() {
  const { loading: cardsLoading, data: cardData } = useQuery<{
    recipes: Main.RecipeCard[];
  }>(Display.Cards);

  return (
    <div>
      <header className={styles.header}>
        <TikiHeader />
        {cardsLoading ? (
          <Loading indicatorStyle="dark" />
        ) : (
          <CardArea>
            {cardData?.recipes.map((card) => (
              <Link
                key={card.id}
                to={`${card.slug}`}
                style={{
                  textDecoration: "inherit",
                  color: "inherit",
                  cursor: "inherit",
                }}
              >
                <Card card={card} onTap={() => {}} />
              </Link>
            ))}
          </CardArea>
        )}
        <Outlet />
      </header>
    </div>
  );
}
