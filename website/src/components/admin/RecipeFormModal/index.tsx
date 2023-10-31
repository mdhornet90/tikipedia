import { useEffect, useState } from "react";
import EditingModal from "../EditingModal";
import IngredientFormSection from "../IngredientFormSection";
import { useQuery } from "@apollo/client";
import { RecipeFormData } from "../../../api";
import TextField from "../../form/TextField";
import FormFieldWrapper from "../../form/FormFieldWrapper";
import DropdownField from "../../form/DropdownField";

interface RecipeFormModalProps {
  open: boolean;
  onClose: () => void;
}

const allUnits = ["dash", "drop", "each", "oz", "tbsp", "tsp"];
const INITIAL_STATE: Form.Recipe = {
  title: "",
  glassware: "Glassware",
  imageUrl: null,
  instructions: "",
  ingredients: [{ name: "", quantity: "", unit: "Unit" }],
};

export default function RecipeFormModal({
  open,
  onClose,
}: RecipeFormModalProps) {
  const {
    data: { ingredients, allGlassware } = { ingredients: [], allGlassware: [] },
  } = useQuery<AdminData.RecipeFormData>(RecipeFormData);
  const [ingredientLookup, setIngredientLookup] = useState<
    Record<string, AdminData.Ingredient>
  >({});
  const [glasswareLookup, setGlasswareLookup] = useState<
    Record<string, AdminData.Glassware>
  >({});
  const [ingredientList, setIngredientList] = useState<ListItem[]>([]);
  const [form, setForm] = useState<Form.Recipe>(INITIAL_STATE);
  const [formValid, setFormValid] = useState(false);
  const [ingredientsValid, setIngredientsValid] = useState(true);

  useEffect(() => {
    setIngredientLookup(
      ingredients.reduce((acc, ingredient) => {
        acc[ingredient.name] = ingredient;
        return acc;
      }, {} as Record<string, AdminData.Ingredient>)
    );
    setGlasswareLookup(
      allGlassware.reduce((acc, glassware) => {
        acc[glassware.name] = glassware;
        return acc;
      }, {} as Record<string, AdminData.Glassware>)
    );

    setIngredientList(
      ingredients
        .sort(({ name: aName }, { name: bName }) => aName.localeCompare(bName))
        .map(({ id, name }) => ({ id, text: name }))
    );
  }, [ingredients, allGlassware]);

  useEffect(() => {
    setFormValid(checkFormValid(form, glasswareLookup));
    setIngredientsValid(form.ingredients.every(recipeIngredientValid));
  }, [form, glasswareLookup]);
  return (
    <EditingModal
      open={open}
      onClose={() => {
        setForm(INITIAL_STATE);
        onClose();
      }}
      title="Add Ingredient"
      formValid={formValid}
      onSave={() => {
        setForm(INITIAL_STATE);
        onClose();
      }}
    >
      <TextField
        name="Title"
        value={form.title}
        onUpdate={(title) => setForm({ ...form, title })}
      />
      <TextField
        name="Image URL"
        value={form.imageUrl ?? ""}
        onUpdate={(imageUrl) => setForm({ ...form, imageUrl })}
      />
      <IngredientFormSection
        allIngredients={ingredientList}
        allUnits={allUnits}
        ingredientInputs={form.ingredients}
        valid={ingredientsValid}
        onAdd={() => {
          setForm({
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
          setForm({ ...form, ingredients: updatedIngredients });
        }}
        onRemove={(i) => {
          const updatedIngredients = [...form.ingredients];
          updatedIngredients.splice(i, 1);
          setForm({ ...form, ingredients: updatedIngredients });
        }}
      />
      <FormFieldWrapper title="Glassware">
        <DropdownField
          defaultValue="Glassware"
          values={allGlassware.map(({ name }) => name)}
          text={form.glassware}
          onSelect={(glassware) => setForm({ ...form, glassware })}
        />
      </FormFieldWrapper>
    </EditingModal>
  );
}

function checkFormValid(
  form: Form.Recipe,
  glasswareLookup: Record<string, AdminData.Glassware>
): boolean {
  return (
    form.title.length > 0 &&
    form.glassware in glasswareLookup &&
    form.ingredients.length > 0 &&
    form.ingredients.every(recipeIngredientValid)
  );
}

function recipeIngredientValid({
  name,
  quantity,
  unit,
}: Form.RecipeIngredient): boolean {
  if (name.length <= 0 || !allUnits.includes(unit)) {
    return false;
  }

  try {
    const normalizedNumber = Number(quantity);
    return !isNaN(normalizedNumber) && normalizedNumber > 0;
  } catch {
    return false;
  }
}
