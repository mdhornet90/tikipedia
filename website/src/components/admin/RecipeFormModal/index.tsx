import { useEffect, useState } from "react";
import EditingModal from "../EditingModal";
import IngredientFormSection from "../IngredientFormSection";
import { useMutation, useQuery } from "@apollo/client";
import { CreateRecipe, GetAllRecipes, RecipeFormData } from "../../../api";
import TextField from "../../form/TextField";
import FormFieldWrapper from "../../form/FormFieldWrapper";
import DropdownField from "../../form/DropdownField";
import TextAreaField from "../../form/TextAreaField";

interface RecipeFormModalProps {
  open: boolean;
  onClose: () => void;
}

const allUnits = ["dash", "drop", "each", "oz", "tbsp", "tsp"];
const INITIAL_STATE: Input.Recipe = {
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
  const { data } = useQuery<Input.Data.RecipeForm>(RecipeFormData);
  const [mutation] = useMutation<Submit.Recipe>(CreateRecipe, {
    refetchQueries: [GetAllRecipes],
  });

  const [ingredientLookup, setIngredientLookup] = useState<
    Record<string, Input.Data.Ingredient>
  >({});
  const [glasswareLookup, setGlasswareLookup] = useState<
    Record<string, Input.Data.Glassware>
  >({});

  const [form, setForm] = useState<Input.Recipe>(INITIAL_STATE);
  const [formValid, setFormValid] = useState(false);
  const [ingredientsValid, setIngredientsValid] = useState(true);

  useEffect(() => {
    if (!data) {
      return;
    }
    const { ingredients, allGlassware } = data;

    setIngredientLookup(
      ingredients
        .sort(({ name: aName }, { name: bName }) => aName.localeCompare(bName))
        .reduce((acc, ingredient) => {
          acc[ingredient.name] = ingredient;
          return acc;
        }, {} as Record<string, Input.Data.Ingredient>)
    );
    setGlasswareLookup(
      allGlassware.reduce((acc, glassware) => {
        acc[glassware.name] = glassware;
        return acc;
      }, {} as Record<string, Input.Data.Glassware>)
    );
  }, [data]);

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
      title="Add Recipe"
      formValid={formValid}
      onSave={() => {
        mutation({
          variables: {
            input: transformForSubmission(
              form,
              ingredientLookup,
              glasswareLookup
            ),
          },
        });
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
        allIngredients={Object.keys(ingredientLookup)}
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
          values={Object.keys(glasswareLookup)}
          text={form.glassware}
          onSelect={(glassware) => setForm({ ...form, glassware })}
        />
      </FormFieldWrapper>
      <FormFieldWrapper title="Instructions">
        <TextAreaField
          text={form.instructions}
          onUpdate={(instructions) => setForm({ ...form, instructions })}
        />
      </FormFieldWrapper>
    </EditingModal>
  );
}

function checkFormValid(
  form: Input.Recipe,
  glasswareLookup: Record<string, Input.Data.Glassware>
): boolean {
  return (
    titleValid(form.title) &&
    imageUrlValid(form.imageUrl) &&
    ingredientsValidForSubmission(form.ingredients) &&
    glasswareValid(form.glassware, glasswareLookup) &&
    instructionsValid(form.instructions)
  );
}

function titleValid(title: string): boolean {
  return title.length > 0;
}

function imageUrlValid(imageUrl?: string | null): boolean {
  if (!imageUrl) {
    return true;
  }

  try {
    new URL(imageUrl);
    return true;
  } catch {
    return false;
  }
}

function ingredientsValidForSubmission(
  ingredients: Input.RecipeIngredient[]
): boolean {
  return ingredients.length > 0 && ingredients.every(recipeIngredientValid);
}

function glasswareValid(
  glasswareName: string,
  glasswareLookup: Record<string, Input.Data.Glassware>
): boolean {
  return glasswareName in glasswareLookup;
}

function instructionsValid(instructions: string): boolean {
  return instructions.length > 0;
}

function recipeIngredientValid({
  name,
  quantity,
  unit,
}: Input.RecipeIngredient): boolean {
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

function transformForSubmission(
  form: Input.Recipe,
  ingredientLookup: Record<string, Input.Data.Ingredient>,
  glasswareLookup: Record<string, Input.Data.Glassware>
): Submit.Recipe {
  return {
    title: form.title,
    glasswareId: glasswareLookup[form.glassware].id,
    imageUrl: !!form.imageUrl ? form.imageUrl : undefined,
    instructions: form.instructions,
    ingredientInputs: form.ingredients.map(({ name, quantity, unit }) => ({
      ingredientId: ingredientLookup[name].id,
      quantity: Number(quantity),
      unit,
    })),
  };
}
