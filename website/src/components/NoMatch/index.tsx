import TikiHeader from "../TikiHeader";
import Title from "../Title";
import styles from "./NoMatch.module.css";
import notFound from "./not-found.png";
export default function NoMatch() {
  return (
    <div>
      <header className={styles.header}>
        <TikiHeader>
          <Title title={"Tikipedia"} size="extraLarge" />
        </TikiHeader>
        <img
          className={styles.image}
          src={notFound}
          alt={"visible_confusion.png"}
          sizes="400px"
        />
        <Title
          title={"Whatever it is you want, we don't have it :("}
          size="large"
        />
      </header>
    </div>
  );
}
