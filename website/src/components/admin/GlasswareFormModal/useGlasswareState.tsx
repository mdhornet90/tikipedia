import { OperationVariables, useMutation, useQuery } from "@apollo/client";
import {
  CreateGlassware,
  EditGlassware,
  GetAllGlassware,
  GetGlassware,
  RecipeFormData,
} from "../../../api";
import { useEffect, useState } from "react";

const EMPTY_STATE: Input.Glassware = { name: "" };

export default function useGlasswareState(id?: string | null) {
  const [mutation] = useMutation(id ? EditGlassware : CreateGlassware, {
    refetchQueries: [GetAllGlassware, RecipeFormData],
  });
  const [initialForm, setInitialForm] = useState<Input.Glassware>(EMPTY_STATE);
  const [workingForm, updateForm] = useState<Input.Glassware>(EMPTY_STATE);
  const { loading, data } = useQuery<{ glassware: Input.Data.Glassware }>(
    GetGlassware,
    { variables: { id }, skip: !id }
  );

  useEffect(() => {
    if (loading) {
      return;
    }
    if (data) {
      updateForm({ ...data.glassware });
      setInitialForm(data.glassware);
    }
  }, [loading, data]);

  return {
    form: workingForm,
    updateForm,
    clearForm: () => updateForm(EMPTY_STATE),
    validate: id
      ? (input: Input.Glassware) => isFormValid(initialForm, input)
      : isNewFormValid,
    transform: id
      ? (input: Input.Glassware) => transformEdit(id, input)
      : transformAdd,
    mutation,
  };
}

function isFormValid(
  existingForm: Input.Glassware,
  updatedForm: Input.Glassware
): boolean {
  return existingForm.name !== updatedForm.name && isNewFormValid(updatedForm);
}

function isNewFormValid(updatedForm: Input.Glassware): boolean {
  return updatedForm.name.length > 0;
}

function transformAdd(input: Input.Glassware): OperationVariables {
  return { input: { name: input.name } };
}

function transformEdit(id: string, input: Input.Glassware): OperationVariables {
  return { id, input: { name: input.name } };
}
