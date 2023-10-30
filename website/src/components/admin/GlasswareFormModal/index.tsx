import { useState } from "react";
import TextField from "../TextField";
import EditingModal from "../EditingModal";
import { useMutation } from "@apollo/client";
import { CreateGlassware, GetAllGlassware } from "../../../api";

interface GlasswareFormModalProps {
  open: boolean;
  onClose: () => void;
}

const INITIAL_STATE: Form.Glassware = { name: "" };

export default function GlasswareFormModal({
  open,
  onClose,
}: GlasswareFormModalProps) {
  const [form, setForm] = useState<Form.Glassware>(INITIAL_STATE);
  const [mutation] = useMutation(CreateGlassware, {
    refetchQueries: [GetAllGlassware],
  });

  return (
    <EditingModal
      open={open}
      onClose={() => {
        setForm(INITIAL_STATE);
        onClose();
      }}
      title="Add Glassware"
      formValid={form.name.length > 0}
      onSave={() => {
        mutation({
          variables: {
            input: { name: form.name },
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
    </EditingModal>
  );
}
