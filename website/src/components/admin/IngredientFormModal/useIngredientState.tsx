import { OperationVariables, useMutation, useQuery } from "@apollo/client";
import {
  CreateIngredient,
  EditIngredient,
  GetAllIngredients,
  GetAllRecipes,
  GetIngredient,
  RecipeFormData,
} from "../../../api";
import { useEffect, useState } from "react";

const EMPTY_STATE: Input.Ingredient = { name: "", abv: "" };

export default function useIngredientState(id?: string | null) {
  const [mutation] = useMutation(id ? EditIngredient : CreateIngredient, {
    refetchQueries: [GetAllIngredients, RecipeFormData, GetAllRecipes],
  });
  const [initialForm, setInitialForm] = useState<Input.Ingredient>(EMPTY_STATE);
  const [workingForm, updateForm] = useState<Input.Ingredient>(EMPTY_STATE);
  const { loading, data } = useQuery<{ ingredient: Input.Data.Ingredient }>(
    GetIngredient,
    { variables: { id }, skip: !id }
  );

  useEffect(() => {
    if (loading) {
      return;
    }
    if (data) {
      const initialForm = {
        name: data.ingredient.name,
        abv:
          data.ingredient.abv &&
          (parseFloat(data.ingredient.abv) * 100).toPrecision(2),
      };
      updateForm({ ...initialForm });
      setInitialForm(initialForm);
    }
  }, [loading, data]);

  return {
    form: workingForm,
    updateForm,
    clearForm: () => updateForm(EMPTY_STATE),
    validate: id
      ? (input: Input.Ingredient) => isFormValid(initialForm, input)
      : isNewFormValid,
    commitChanges: () => {
      let transformFn = id
        ? (input: Input.Ingredient) => transformEdit(id, input, initialForm)
        : transformAdd;
      mutation({
        variables: transformFn(workingForm),
      });
    },
  };
}

const newValueValidationFns: Record<
  keyof Input.Ingredient,
  (input: Input.Ingredient) => boolean
> = {
  name: ({ name }) => name.length > 0,
  abv: ({ abv }) => {
    if (!abv) {
      return true;
    }
    try {
      const normalizedNumber = Number(abv);
      return (
        !isNaN(normalizedNumber) &&
        normalizedNumber >= 0 &&
        normalizedNumber <= 100
      );
    } catch {
      return false;
    }
  },
};

const updatedValueValidationFns: Record<
  keyof Input.Ingredient,
  (input: Input.Ingredient, existing: Input.Ingredient) => boolean
> = {
  name: ({ name: iName }, { name: eName }) => iName !== eName,
  abv: ({ abv: iAbv }, { abv: eAbv }) =>
    parseFloat(iAbv).toPrecision(2) !== parseFloat(eAbv).toPrecision(2),
};

const isFormValid = (
  existingForm: Input.Ingredient,
  updatedForm: Input.Ingredient
) =>
  Object.keys(existingForm).some((key) => {
    const result = updatedValueValidationFns[key as keyof Input.Ingredient](
      updatedForm,
      existingForm
    );
    return result;
  }) && isNewFormValid(updatedForm);

function isNewFormValid(input: Input.Ingredient): boolean {
  return Object.keys(input).every((key) =>
    newValueValidationFns[key as keyof Input.Ingredient](input)
  );
}

function transformAdd(input: Input.Ingredient): OperationVariables {
  return {
    input: {
      ...input,
      abv: input.abv.length > 0 ? parseFloat(input.abv) / 100 : null,
    },
  };
}

function transformEdit(
  id: string,
  input: Input.Ingredient,
  original: Input.Ingredient
): OperationVariables {
  return {
    id,
    input: Object.keys(input)
      .filter((key) =>
        updatedValueValidationFns[key as keyof Input.Ingredient](
          input,
          original
        )
      )
      .reduce((acc, key) => {
        const propName = key as keyof Input.Ingredient;
        if (propName === "abv") {
          acc[propName] = parseFloat(input[propName]) / 100;
        } else {
          acc[propName] = input[propName];
        }
        return acc;
      }, {} as { [key: string]: any }),
  };
}
