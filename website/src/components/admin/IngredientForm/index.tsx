import { useEffect, useState } from "react";
import TextField from "../TextField";
import styles from "./IngredientForm.module.css";
import EditingModal from "../EditingModal";
import { useMutation } from "@apollo/client";
import { CreateIngredient, GetAllIngredients } from "../../../api";

interface IngredientFormModalProps {
  open: boolean;
  onClose: () => void;
}

const INITIAL_STATE: Form.Ingredient = { name: "", abv: "" };

export default function IngredientFormModal({
  open,
  onClose,
}: IngredientFormModalProps) {
  const [form, setForm] = useState<Form.Ingredient>(INITIAL_STATE);
  const [mutation] = useMutation(CreateIngredient, {
    refetchQueries: [GetAllIngredients],
  });

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
        const abv = form.abv.length > 0 ? parseFloat(form.abv) / 100 : null;
        mutation({
          variables: {
            input: {
              name: form.name,
              abv: abv,
            },
          },
        });
        setForm(INITIAL_STATE);
        onClose();
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
