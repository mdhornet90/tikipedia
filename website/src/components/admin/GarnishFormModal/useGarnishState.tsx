import { useMutation, useQuery } from "@apollo/client";
import { Garnish, Recipe, RecipeFormData } from "../../../api";
import { useEffect, useState } from "react";

const EMPTY_STATE: Input.Garnish = { name: "" };

export default function useGarnishState(id?: string | null) {
  const [createOrUpdate] = useMutation(id ? Garnish.Edit : Garnish.Create, {
    refetchQueries: [Garnish.GetAll, RecipeFormData, Recipe.GetAll],
  });
  const [deleteGarnish] = useMutation(Garnish.Delete, {
    refetchQueries: [Garnish.GetAll, RecipeFormData, Recipe.GetAll],
    variables: { id },
  });
  const [initialForm, setInitialForm] = useState<Input.Garnish>(EMPTY_STATE);
  const [workingForm, updateForm] = useState<Input.Garnish>(EMPTY_STATE);
  const { loading, data } = useQuery<{ garnish: Input.Data.Garnish }>(
    Garnish.GetOne,
    { variables: { id }, skip: !id }
  );

  useEffect(() => {
    if (loading) {
      return;
    }
    if (data) {
      updateForm({ ...data.garnish });
      setInitialForm(data.garnish);
    }
  }, [loading, data]);

  return {
    form: workingForm,
    updateForm,
    clearForm: () => updateForm(EMPTY_STATE),
    validate: id
      ? (input: Input.Garnish) => isFormValid(initialForm, input)
      : isNewFormValid,
    commitChanges: () => {
      let transformFn = id
        ? (input: Input.Garnish) => transformEdit(id, input)
        : transformAdd;
      createOrUpdate({
        variables: transformFn(workingForm),
      });
    },
    deleteGarnish,
  };
}

function isFormValid(
  existingForm: Input.Garnish,
  updatedForm: Input.Garnish
): boolean {
  return existingForm.name !== updatedForm.name && isNewFormValid(updatedForm);
}

function isNewFormValid(updatedForm: Input.Garnish): boolean {
  return updatedForm.name.length > 0;
}

function transformAdd(
  input: Input.Garnish
): Submit.CreateData<Submit.CreateGarnish> {
  return { input: { name: input.name } };
}

function transformEdit(
  id: string,
  input: Input.Garnish
): Submit.EditData<Submit.EditGarnish> {
  return { id, input: { name: input.name } };
}
