import TextField from "../../form/TextField";
import EditingModal from "../EditingModal";
import useGlasswareState from "./useGarnishState";

export default function GarnishFormModal({
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
    deleteGarnish,
  } = useGlasswareState(selectedId);

  return (
    <EditingModal
      open={open}
      onClose={() => {
        clearForm();
        onClose();
      }}
      title={selectedId ? "Edit Garnish" : "Add Garnish"}
      formValid={validate(form)}
      onSave={() => {
        commitChanges();
        clearForm();
        onClose();
      }}
      showDelete={!!selectedId}
      onDelete={() => {
        deleteGarnish();
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
