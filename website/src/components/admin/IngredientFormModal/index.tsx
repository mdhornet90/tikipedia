import TextField from "../../form/TextField";
import EditingModal from "../EditingModal";
import useIngredientState from "./useIngredientState";

export default function IngredientFormModal({
  open,
  onClose,
  selectedId,
}: Input.Props) {
  const {
    form,
    updateForm,
    clearForm,
    validate,
    commitChanges,
    deleteIngredient,
  } = useIngredientState(selectedId);

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
        deleteIngredient();
        clearForm();
        onClose();
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
