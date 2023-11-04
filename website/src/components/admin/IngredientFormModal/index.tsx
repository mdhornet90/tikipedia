import TextField from "../../form/TextField";
import EditingModal from "../EditingModal";
import useIngredientState from "./useIngredientState";

interface IngredientFormModalProps {
  open: boolean;
  onClose: () => void;
  selectedId?: string;
}

export default function IngredientFormModal({
  open,
  onClose,
  selectedId,
}: IngredientFormModalProps) {
  const { form, updateForm, clearForm, validate, commitChanges } =
    useIngredientState(selectedId);

  return (
    <EditingModal
      open={open}
      onClose={() => {
        clearForm();
        onClose();
      }}
      title={selectedId ? "Edit Ingredient" : "Add Ingredient"}
      formValid={validate(form)}
      onSave={() => {
        commitChanges();
        clearForm();
        onClose();
      }}
      showDelete={!!selectedId}
      onDelete={() => {
        console.log("deleting...");
      }}
    >
      <TextField
        name={"Name"}
        value={form.name}
        onUpdate={(newValue) => {
          updateForm({ ...form, name: newValue });
        }}
      />{" "}
      <TextField
        name={"Abv (%)"}
        value={form.abv}
        onUpdate={(newValue) => {
          updateForm({ ...form, abv: newValue });
        }}
      />
    </EditingModal>
  );
}
