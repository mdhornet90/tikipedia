import { useMutation } from "@apollo/client";
import { Recipe } from "../../../api";
import { useEffect, useState } from "react";
import useRecipeData from "./useRecipeData";
import useRecipeFormData from "./useRecipeFormData";
import useRecipeFormValidation from "./useRecipeFormValidation";
import { existingValueValidationFns } from "./utils";

const EMPTY_STATE: () => Input.Recipe = () => ({
  title: "",
  glassware: "Glassware",
  imageUrl: null,
  instructions: "",
  ingredients: [{ name: "", quantity: "", unit: "Unit" }],
  garnishes: [],
});
const allUnits = new Set(["dash", "drop", "each", "oz", "tbsp", "tsp"]);

export default function useRecipeState(id?: string | null) {
  const [createOrUpdate] = useMutation(id ? Recipe.Edit : Recipe.Create, {
    refetchQueries: [Recipe.GetAll],
  });
  const [deleteRecipe] = useMutation(Recipe.Delete, {
    refetchQueries: [Recipe.GetAll],
    variables: { id },
  });
  const initialForm = useRecipeData(id);
  const [workingForm, updateForm] = useState<Input.Recipe>(EMPTY_STATE);
  const { ingredientLookup, glasswareLookup, garnishLookup } =
    useRecipeFormData();
  const { formValid, ingredientSectionValid } = useRecipeFormValidation({
    initialForm,
    form: workingForm,
    units: allUnits,
    glasswareLookup,
    garnishLookup,
  });

  useEffect(() => {
    if (initialForm) {
      updateForm({ ...initialForm });
    } else {
      updateForm(EMPTY_STATE());
    }
  }, [initialForm]);

  return {
    form: workingForm,
    formValid,
    ingredientSectionValid,
    ingredientLookup,
    glasswareLookup,
    updateForm,
    clearForm: () => updateForm(EMPTY_STATE()),
    commitChanges: () => {
      const transformFn = id
        ? (
            input: Input.Recipe,
            glasswareLookup: Record<string, Input.Data.Glassware>,
            ingredientLookup: Record<string, Input.Data.Ingredient>,
            garnishLookup: Record<string, Input.Data.Garnish>
          ) =>
            transformEdit(
              id,
              input,
              initialForm ?? EMPTY_STATE(),
              glasswareLookup,
              ingredientLookup,
              garnishLookup
            )
        : transformAdd;
      createOrUpdate({
        variables: transformFn(
          workingForm,
          glasswareLookup,
          ingredientLookup,
          garnishLookup
        ),
      });
    },
    deleteRecipe,
  };
}

function transformAdd(
  input: Input.Recipe,
  glasswareLookup: Record<string, Input.Data.Glassware>,
  ingredientLookup: Record<string, Input.Data.Ingredient>,
  garnishLookup: Record<string, Input.Data.Garnish>
): Submit.CreateData<Submit.CreateRecipe> {
  return {
    input: {
      title: input.title,
      glasswareId: glasswareLookup[input.glassware].id,
      imageUrl: !!input.imageUrl ? input.imageUrl : undefined,
      instructions: input.instructions,
      ingredientInputs: input.ingredients.map(({ name, quantity, unit }) => ({
        ingredientId: ingredientLookup[name].id,
        quantity: Number(quantity),
        unit: unit.toUpperCase(),
      })),
      garnishInputs: input.garnishes.map(({ name, quantity }) => ({
        garnishId: garnishLookup[name].id,
        quantity: Number(quantity),
      })),
    },
  };
}

function transformEdit(
  id: string,
  input: Input.Recipe,
  original: Input.Recipe,
  glasswareLookup: Record<string, Input.Data.Glassware>,
  ingredientLookup: Record<string, Input.Data.Ingredient>,
  garnishLookup: Record<string, Input.Data.Garnish>
): Submit.EditData<Submit.EditRecipe> {
  return {
    id,
    input: Object.keys(input)
      .filter((key) =>
        existingValueValidationFns[key as keyof Input.Recipe](input, original)
      )
      .reduce((acc, key) => {
        const tKey = key as keyof Input.Recipe;
        switch (tKey) {
          case "title":
            acc[tKey] = input.title;
            break;
          case "imageUrl":
            acc[tKey] = !!input.imageUrl ? input.imageUrl : null;
            break;
          case "glassware":
            acc["glasswareId"] = glasswareLookup[input.glassware].id;
            break;
          case "ingredients":
            acc["ingredientInputs"] = input.ingredients.map(
              ({ name, quantity, unit }) => ({
                ingredientId: ingredientLookup[name].id,
                quantity: Number(quantity),
                unit: unit.toUpperCase(),
              })
            );
            break;
          case "garnishes":
            acc["garnishInputs"] = input.garnishes.map(
              ({ name, quantity }) => ({
                garnishId: garnishLookup[name].id,
                quanity: Number(quantity),
              })
            );
            break;
          case "instructions":
            acc[tKey] = input.instructions;
            break;
        }
        return acc;
      }, {} as { [key: string]: any }),
  };
}
