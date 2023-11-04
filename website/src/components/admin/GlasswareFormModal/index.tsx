import TextField from "../../form/TextField";
import EditingModal from "../EditingModal";
import useGlasswareState from "./useGlasswareState";

interface GlasswareFormModalProps {
  open: boolean;
  onClose: () => void;
  selectedId?: string;
}

export default function GlasswareFormModal({
  open,
  onClose,
  selectedId,
}: GlasswareFormModalProps) {
  const { form, updateForm, clearForm, validate, commitChanges } =
    useGlasswareState(selectedId);

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
    </EditingModal>
  );
}
