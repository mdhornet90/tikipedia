import { useEffect, useState } from "react";
import styles from "./Admin.module.css";

import TikiHeader from "../../common/TikiHeader";
import Title from "../../common/Title";
import CategorySwitcher from "../CategorySwitcher";
import Spreadsheet from "../Spreadsheet";
import EditingModal from "../EditingModal";
import TextField from "../TextField";
import useAdminState from "../../../hooks/useAdminState";
import IngredientFormField from "../IngredientFormField";
import IngredientFormModal from "../IngredientFormModal";
import GlasswareFormModal from "../GlasswareFormModal";

type ModalState = "closed" | "opening" | "open" | "closing";

export default function Admin() {
  const {
    currentId,
    spreadsheet,
    actions: { updateCategoryId },
  } = useAdminState("recipes");
  const [modalState, setModalState] = useState<ModalState>("closed");

  useEffect(() => {
    if (modalState === "opening") {
      setModalState("open");
    } else if (modalState === "closing") {
      setModalState("closed");
    }
  }, [modalState]);

  return (
    <div className={styles.content}>
      <TikiHeader />
      <div className={styles.adminArea}>
        <div className={styles.adminAreaHeader}>
          <Title title="Content Management" size="large" />
        </div>
        <CategorySwitcher onSelect={updateCategoryId} />
        <Spreadsheet
          headers={spreadsheet.spreadsheetHeaders}
          data={spreadsheet.spreadsheetData}
          onAdd={() => setModalState("opening")}
        />
      </div>
      {(() => {
        switch (currentId) {
          case "ingredients":
            return (
              <IngredientFormModal
                open={modalState === "open"}
                onClose={() => {
                  setModalState("closing");
                }}
              />
            );
          case "glassware":
            return (
              <GlasswareFormModal
                open={modalState === "open"}
                onClose={() => {
                  setModalState("closing");
                }}
              />
            );
        }
      })()}
    </div>
  );
}

function mockIngredients() {
  return [
    {
      id: "0",
      text: "lime juice",
    },
    {
      id: "2",
      text: "orange juice",
    },
    {
      id: "3",
      text: "pineapple juice",
    },
    {
      id: "5",
      text: "lemon juice",
    },
    {
      id: "15",
      text: "grenadine",
    },
    {
      id: "25",
      text: "rum",
    },
  ];
}
