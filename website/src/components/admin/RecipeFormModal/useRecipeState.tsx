import { OperationVariables, useMutation } from "@apollo/client";
import { CreateRecipe, EditIngredient, GetAllRecipes } from "../../../api";
import { useEffect, useState } from "react";
import useRecipeData from "./useRecipeData";
import useRecipeFormData from "./useRecipeFormData";
import useRecipeFormValidation from "./useRecipeFormValidation";

const EMPTY_STATE: Input.Recipe = {
  title: "",
  glassware: "Glassware",
  imageUrl: null,
  instructions: "",
  ingredients: [{ name: "", quantity: "", unit: "Unit" }],
};
const allUnits = new Set(["dash", "drop", "each", "oz", "tbsp", "tsp"]);

export default function useRecipeState(id?: string | null) {
  const [mutation] = useMutation(id ? EditIngredient : CreateRecipe, {
    refetchQueries: [GetAllRecipes],
  });
  const initialForm = useRecipeData(EMPTY_STATE, id);
  const [workingForm, updateForm] = useState<Input.Recipe>(EMPTY_STATE);
  const { ingredientLookup, glasswareLookup } = useRecipeFormData();
  const { formValid, ingredientSectionValid } = useRecipeFormValidation({
    initialForm,
    form: workingForm,
    units: allUnits,
    glasswareLookup,
  });

  useEffect(() => {
    updateForm({ ...initialForm });
  }, [initialForm]);

  return {
    form: workingForm,
    formValid,
    ingredientSectionValid,
    ingredientLookup,
    glasswareLookup,
    updateForm,
    clearForm: () => updateForm(EMPTY_STATE),
    transform: id
      ? (input: Input.Recipe) => transformEdit(id, input, initialForm)
      : transformAdd,
    mutation,
  };
}

function transformAdd(input: Input.Recipe): OperationVariables {
  return {
    input: {
      ...input,
      // abv: input.abv.length > 0 ? parseFloat(input.abv) / 100 : null,
    },
  };
}

function transformEdit(
  id: string,
  input: Input.Recipe,
  original: Input.Recipe
): OperationVariables {
  return {
    id,
    input: Object.keys(input)
      // .filter((key) =>
      //   updatedValueValidationFns[key as keyof Input.Recipe](input, original)
      // )
      .reduce((acc, key) => {
        // const propName = key as keyof Input.Ingredient;
        // if (propName === "abv") {
        //   acc[propName] = parseFloat(input[propName]) / 100;
        // } else {
        //   acc[propName] = input[propName];
        // }
        return acc;
      }, {} as { [key: string]: any }),
  };
}
