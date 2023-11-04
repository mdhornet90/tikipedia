import EditingModal from "../EditingModal";
import IngredientFormSection from "../IngredientFormSection";
import TextField from "../../form/TextField";
import FormFieldWrapper from "../../form/FormFieldWrapper";
import DropdownField from "../../form/DropdownField";
import TextAreaField from "../../form/TextAreaField";
import useRecipeState from "./useRecipeState";

interface RecipeFormModalProps {
  open: boolean;
  onClose: () => void;
  selectedId?: string;
}

const allUnits = new Set(["dash", "drop", "each", "oz", "tbsp", "tsp"]);

export default function RecipeFormModal({
  open,
  onClose,
  selectedId,
}: RecipeFormModalProps) {
  const {
    form,
    formValid,
    ingredientSectionValid,
    ingredientLookup,
    glasswareLookup,
    updateForm,
    clearForm,
    commitChanges,
  } = useRecipeState(selectedId);

  return (
    <EditingModal
      open={open}
      onClose={() => {
        clearForm();
        onClose();
      }}
      title={selectedId ? "Edit Recipe" : "Add Recipe"}
      formValid={formValid}
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
        name="Title"
        value={form.title}
        onUpdate={(title) => updateForm({ ...form, title })}
      />
      <TextField
        name="Image URL"
        value={form.imageUrl ?? ""}
        onUpdate={(imageUrl) => updateForm({ ...form, imageUrl })}
      />
      <IngredientFormSection
        allIngredients={Object.keys(ingredientLookup)}
        allUnits={Array.from(allUnits)}
        ingredientInputs={form.ingredients}
        valid={ingredientSectionValid}
        onAdd={() => {
          updateForm({
            ...form,
            ingredients: [
              ...form.ingredients,
              { name: "", quantity: "", unit: "Unit" },
            ],
          });
        }}
        onUpdate={(i, updatedIngredient) => {
          const updatedIngredients = [...form.ingredients];
          updatedIngredients[i] = updatedIngredient;
          updateForm({ ...form, ingredients: updatedIngredients });
        }}
        onRemove={(i) => {
          const updatedIngredients = [...form.ingredients];
          updatedIngredients.splice(i, 1);
          updateForm({ ...form, ingredients: updatedIngredients });
        }}
      />
      <FormFieldWrapper title="Glassware">
        <DropdownField
          defaultValue="Glassware"
          values={Object.keys(glasswareLookup)}
          text={form.glassware}
          onSelect={(glassware) => updateForm({ ...form, glassware })}
        />
      </FormFieldWrapper>
      <FormFieldWrapper title="Instructions">
        <TextAreaField
          text={form.instructions}
          onUpdate={(instructions) => updateForm({ ...form, instructions })}
        />
      </FormFieldWrapper>
    </EditingModal>
  );
}
