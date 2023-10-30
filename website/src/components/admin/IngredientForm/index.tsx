import { useEffect, useState } from "react";
import TextField from "../TextField";
import styles from "./IngredientForm.module.css";
import EditingModal from "../EditingModal";

interface IngredientFormModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (form: Form.Ingredient) => void;
}

const INITIAL_STATE: Form.Ingredient = { name: "", abv: "" };

export default function IngredientFormModal({
  open,
  onClose,
  onSave,
}: IngredientFormModalProps) {
  const [form, setForm] = useState<Form.Ingredient>(INITIAL_STATE);

  return (
    <EditingModal
      open={open}
      onClose={() => {
        setForm(INITIAL_STATE);
        onClose();
      }}
      title="Add Ingredient"
      formValid={validateForm(form)}
      onSave={() => {
        setForm(INITIAL_STATE);
        onSave(form);
      }}
    >
      <TextField
        name={"Name"}
        value={form.name}
        onUpdate={(newValue) => {
          setForm({ ...form, name: newValue });
        }}
      />{" "}
      <TextField
        name={"Abv (%)"}
        value={form.abv}
        onUpdate={(newValue) => {
          setForm({ ...form, abv: newValue });
        }}
      />
    </EditingModal>
  );
}

function validateForm({ name, abv }: Form.Ingredient) {
  if (name.length <= 0) {
    return false;
  }

  try {
    const normalizedNumber = Number(abv);
    return (
      !isNaN(normalizedNumber) &&
      normalizedNumber >= 0 &&
      normalizedNumber <= 100
    );
  } catch {
    return false;
  }
}
