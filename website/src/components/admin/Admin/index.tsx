import { useEffect, useState } from "react";
import styles from "./Admin.module.css";

import TikiHeader from "../../common/TikiHeader";
import Title from "../../common/Title";
import CategorySwitcher from "../CategorySwitcher";
import Spreadsheet from "../Spreadsheet";
import EditingModal from "../EditingModal";
import { useMutation } from "@apollo/client";
import { CreateIngredient, GetAllIngredients } from "../../../api";
import { FormField } from "../FormField";
import useAdminState from "../../../hooks/useAdminState";

type ModalState = "closed" | "opening" | "open" | "closing";

export default function Admin() {
  const {
    spreadsheet,
    form,
    actions: { updateCategoryId, initializeForm, updateForm, clearForm },
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
          headers={spreadsheet?.spreadsheetHeaders ?? []}
          data={spreadsheet?.spreadsheetData ?? []}
          onAdd={() => setModalState("opening")}
        />
      </div>
      <EditingModal
        open={modalState === "open"}
        title={form?.title ?? ""}
        formValid={form?.valid ?? false}
        onClose={() => {
          setModalState("closing");
        }}
        onSave={async () => {
          // const input = {
          //   ...formData,
          //   abv: formData.abv && parseFloat(formData.abv) / 100,
          // };
          // addIngredient({ variables: { input } });
          // setFormData({
          //   name: "",
          //   abv: null,
          // });
          // setModalOpen(false);
        }}
      >
        {form &&
          form.formFields.map(({ key, name }) => (
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

// function validateForm(form: IngredientForm): boolean {
//   if (form.name.length <= 0) {
//     return false;
//   }

//   try {
//     const normalizedNumber = Number(form.abv);
//     return (
//       !isNaN(normalizedNumber) &&
//       normalizedNumber >= 0 &&
//       normalizedNumber <= 100
//     );
//   } catch {
//     return false;
//   }
// }
