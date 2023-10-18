import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import TikiHeader from "../../common/TikiHeader";
import Title from "../../common/Title";
import CategoryButton from "../CategoryButton";
import styles from "./Admin.module.css";
import SpreadsheetTitle from "../SpreadsheetTitle";
import SpreadsheetRow from "../SpreadsheetRow";
import SpreadsheetItem from "../SpreadsheetItem";

export default function Admin() {
  const categoryNames = [
    "Recipes",
    "Ingredients",
    "Glassware",
    "Garnishes",
    "Tags",
  ];
  const [selectedId, setSelectedId] = useState("recipes");

  return (
    <div className={styles.content}>
      <TikiHeader />
      <div className={styles.adminArea}>
        <div className={styles.adminAreaHeader}>
          <Title title="Content Management" size="large" />
        </div>
        <span className={styles.categories}>
          {categoryNames.map((title) => (
            <CategoryButton
              key={title.toLowerCase()}
              title={title}
              selected={title.toLowerCase() === selectedId}
              onClick={() => setSelectedId(title.toLowerCase())}
            />
          ))}
        </span>
        <div className={styles.spreadsheetContainer}>
          <table className={styles.spreadsheet}>
            <thead>
              <SpreadsheetRow>
                <SpreadsheetTitle title="Title" />
                <SpreadsheetTitle title="Ingredients" />
                <SpreadsheetTitle title="Glassware" />
                <SpreadsheetTitle title="Garnishes" />
              </SpreadsheetRow>
            </thead>
            <tbody className={styles.spreadsheetBody}>
              {[...Array(20).keys()].map((i) => (
                <SpreadsheetRow key={i}>
                  <SpreadsheetItem text="The Daiquiri" />
                  <SpreadsheetItem text="Demerara syrup, lime juice, rum" />
                  <SpreadsheetItem text="Coupe" />
                  <SpreadsheetItem text="dehydrated lime wheel" />
                </SpreadsheetRow>
              ))}
            </tbody>
          </table>
          <div className={styles.addButton}>
            <AddIcon className={styles.addIcon} />
          </div>
        </div>
      </div>
    </div>
  );
}
