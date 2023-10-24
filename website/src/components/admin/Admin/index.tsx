import { useEffect, useState } from "react";
import styles from "./Admin.module.css";

import TikiHeader from "../../common/TikiHeader";
import Title from "../../common/Title";
import CategorySwitcher from "../CategorySwitcher";
import Spreadsheet from "../Spreadsheet";
import EditingModal from "../EditingModal";
import { FormField } from "../FormField";
import useAdminState from "../../../hooks/useAdminState";

type ModalState = "closed" | "opening" | "open" | "closing";

export default function Admin() {
  const {
    spreadsheet,
    form,
    actions: {
      updateCategoryId,
      initializeForm,
      updateForm,
      saveForm,
      clearForm,
    },
  } = useAdminState("ingredients");
  const [modalState, setModalState] = useState<ModalState>("closed");

  useEffect(() => {
    if (modalState === "opening") {
      initializeForm();
      setModalState("open");
    } else if (modalState === "closing") {
      clearForm();
      setModalState("closed");
    }
  }, [modalState, initializeForm, clearForm]);

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
      <EditingModal
        open={modalState === "open"}
        title={form.title}
        formValid={form.valid}
        onClose={() => {
          setModalState("closing");
        }}
        onSave={async () => {
          saveForm();
          setModalState("closing");
        }}
      >
        {form.formFields.map(({ key, name }) => (
          <FormField
            key={key}
            name={name}
            value={form.formValues[key] ?? ""}
            onUpdate={(newValue) => {
              updateForm(key, newValue);
            }}
          />
        ))}
      </EditingModal>
    </div>
  );
}
