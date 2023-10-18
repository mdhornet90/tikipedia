import { useState } from "react";
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
      <Title title="Admin Page" size="large" />
      <div className={styles.adminArea}>
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
              <SpreadsheetRow>
                <SpreadsheetItem text="The Daiquiri" />
                <SpreadsheetItem text="Demerara syrup, lime juice, rum" />
                <SpreadsheetItem text="Coupe" />
                <SpreadsheetItem text="dehydrated lime wheel" />
              </SpreadsheetRow>
              <SpreadsheetRow>
                <SpreadsheetItem text="The Daiquiri" />
                <SpreadsheetItem text="Demerara syrup, lime juice, rum" />
                <SpreadsheetItem text="Coupe" />
                <SpreadsheetItem text="dehydrated lime wheel" />
              </SpreadsheetRow>
              <SpreadsheetRow>
                <SpreadsheetItem text="The Daiquiri" />
                <SpreadsheetItem text="Demerara syrup, lime juice, rum" />
                <SpreadsheetItem text="Coupe" />
                <SpreadsheetItem text="dehydrated lime wheel" />
              </SpreadsheetRow>
              <SpreadsheetRow>
                <SpreadsheetItem text="The Daiquiri" />
                <SpreadsheetItem text="Demerara syrup, lime juice, rum" />
                <SpreadsheetItem text="Coupe" />
                <SpreadsheetItem text="dehydrated lime wheel" />
              </SpreadsheetRow>
              <SpreadsheetRow>
                <SpreadsheetItem text="The Daiquiri" />
                <SpreadsheetItem text="Demerara syrup, lime juice, rum" />
                <SpreadsheetItem text="Coupe" />
                <SpreadsheetItem text="dehydrated lime wheel" />
              </SpreadsheetRow>
              <SpreadsheetRow>
                <SpreadsheetItem text="The Daiquiri" />
                <SpreadsheetItem text="Demerara syrup, lime juice, rum" />
                <SpreadsheetItem text="Coupe" />
                <SpreadsheetItem text="dehydrated lime wheel" />
              </SpreadsheetRow>
              <SpreadsheetRow>
                <SpreadsheetItem text="The Daiquiri" />
                <SpreadsheetItem text="Demerara syrup, lime juice, rum" />
                <SpreadsheetItem text="Coupe" />
                <SpreadsheetItem text="dehydrated lime wheel" />
              </SpreadsheetRow>
              <SpreadsheetRow>
                <SpreadsheetItem text="The Daiquiri" />
                <SpreadsheetItem text="Demerara syrup, lime juice, rum" />
                <SpreadsheetItem text="Coupe" />
                <SpreadsheetItem text="dehydrated lime wheel" />
              </SpreadsheetRow>
              <SpreadsheetRow>
                <SpreadsheetItem text="The Daiquiri" />
                <SpreadsheetItem text="Demerara syrup, lime juice, rum" />
                <SpreadsheetItem text="Coupe" />
                <SpreadsheetItem text="dehydrated lime wheel" />
              </SpreadsheetRow>
              <SpreadsheetRow>
                <SpreadsheetItem text="The Daiquiri" />
                <SpreadsheetItem text="Demerara syrup, lime juice, rum" />
                <SpreadsheetItem text="Coupe" />
                <SpreadsheetItem text="dehydrated lime wheel" />
              </SpreadsheetRow>
              <SpreadsheetRow>
                <SpreadsheetItem text="The Daiquiri" />
                <SpreadsheetItem text="Demerara syrup, lime juice, rum" />
                <SpreadsheetItem text="Coupe" />
                <SpreadsheetItem text="dehydrated lime wheel" />
              </SpreadsheetRow>
              <SpreadsheetRow>
                <SpreadsheetItem text="The Daiquiri" />
                <SpreadsheetItem text="Demerara syrup, lime juice, rum" />
                <SpreadsheetItem text="Coupe" />
                <SpreadsheetItem text="dehydrated lime wheel" />
              </SpreadsheetRow>
              <SpreadsheetRow>
                <SpreadsheetItem text="The Daiquiri" />
                <SpreadsheetItem text="Demerara syrup, lime juice, rum" />
                <SpreadsheetItem text="Coupe" />
                <SpreadsheetItem text="dehydrated lime wheel" />
              </SpreadsheetRow>
              <SpreadsheetRow>
                <SpreadsheetItem text="The Daiquiri" />
                <SpreadsheetItem text="Demerara syrup, lime juice, rum" />
                <SpreadsheetItem text="Coupe" />
                <SpreadsheetItem text="dehydrated lime wheel" />
              </SpreadsheetRow>
              <SpreadsheetRow>
                <SpreadsheetItem text="The Daiquiri" />
                <SpreadsheetItem text="Demerara syrup, lime juice, rum" />
                <SpreadsheetItem text="Coupe" />
                <SpreadsheetItem text="dehydrated lime wheel" />
              </SpreadsheetRow>
              <SpreadsheetRow>
                <SpreadsheetItem text="The Daiquiri" />
                <SpreadsheetItem text="Demerara syrup, lime juice, rum" />
                <SpreadsheetItem text="Coupe" />
                <SpreadsheetItem text="dehydrated lime wheel" />
              </SpreadsheetRow>
              <SpreadsheetRow>
                <SpreadsheetItem text="The Daiquiri" />
                <SpreadsheetItem text="Demerara syrup, lime juice, rum" />
                <SpreadsheetItem text="Coupe" />
                <SpreadsheetItem text="dehydrated lime wheel" />
              </SpreadsheetRow>
              <SpreadsheetRow>
                <SpreadsheetItem text="The Daiquiri" />
                <SpreadsheetItem text="Demerara syrup, lime juice, rum" />
                <SpreadsheetItem text="Coupe" />
                <SpreadsheetItem text="dehydrated lime wheel" />
              </SpreadsheetRow>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
