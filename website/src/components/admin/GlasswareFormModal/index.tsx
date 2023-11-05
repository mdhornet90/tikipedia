import TextField from "../../form/TextField";
import EditingModal from "../EditingModal";
import useGlasswareState from "./useGlasswareState";

export default function GlasswareFormModal({
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
    deleteGlassware,
  } = useGlasswareState(selectedId);

  return (
    <EditingModal
      open={open}
      onClose={() => {
        clearForm();
        onClose();
      }}
      title={selectedId ? "Edit Glassware" : "Add Glassware"}
      formValid={validate(form)}
      onSave={() => {
        commitChanges();
        clearForm();
        onClose();
      }}
      showDelete={!!selectedId}
      onDelete={() => {
        deleteGlassware();
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
    </EditingModal>
  );
}
