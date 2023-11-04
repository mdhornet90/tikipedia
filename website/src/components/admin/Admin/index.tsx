import { useEffect, useState } from "react";
import styles from "./Admin.module.css";

import TikiHeader from "../../common/TikiHeader";
import Title from "../../common/Title";
import CategorySwitcher from "../CategorySwitcher";
import Spreadsheet from "../Spreadsheet";
import useAdminState from "../../../hooks/useAdminState";
import IngredientFormModal from "../IngredientFormModal";
import GlasswareFormModal from "../GlasswareFormModal";
import RecipeFormModal from "../RecipeFormModal";

type ModalState = "closed" | "opening" | "open" | "closing";

export default function Admin() {
  const { category, spreadsheet, updateCategory } = useAdminState("recipes");
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const [modalState, setModalState] = useState<ModalState>("closed");

  useEffect(() => {
    if (modalState === "opening") {
      setModalState("open");
    } else if (modalState === "closing") {
      setModalState("closed");
    }
  }, [modalState]);

  const onClose = () => {
    setSelectedId(undefined);
    setModalState("closing");
  };

  return (
    <div className={styles.content}>
      <TikiHeader />
      <div className={styles.adminArea}>
        <div className={styles.adminAreaHeader}>
          <Title title="Content Management" size="large" />
        </div>
        <CategorySwitcher onSelect={updateCategory} />
        <Spreadsheet
          headers={spreadsheet.headers}
          data={spreadsheet.data}
          onAdd={() => setModalState("opening")}
          onSelectItem={(id) => {
            setSelectedId(id);
            setModalState("opening");
          }}
        />
      </div>
      {(() => {
        switch (category) {
          case "ingredients":
            return (
              <IngredientFormModal
                selectedId={selectedId}
                open={modalState === "open"}
                onClose={onClose}
              />
            );
          case "glassware":
            return (
              <GlasswareFormModal
                selectedId={selectedId}
                open={modalState === "open"}
                onClose={onClose}
              />
            );
          case "recipes":
            return (
              <RecipeFormModal
                selectedId={selectedId}
                open={modalState === "open"}
                onClose={onClose}
              />
            );
        }
      })()}
    </div>
  );
}
