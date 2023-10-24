import { MutationTuple, QueryResult, useMutation } from "@apollo/client";
import { useState, useEffect } from "react";
import {
  CreateGlassware,
  CreateIngredient,
  CreateRecipe,
  GetAllGlassware,
  GetAllIngredients,
  GetAllRecipes,
} from "../api";
import { useQuery } from "@apollo/client";

const EMPTY_FORM: Admin.FormState = {
  title: "",
  valid: false,
  formFields: [],
  formValues: {},
};

const dataInteraction: Record<Admin.CategoryId, Admin.DataInteraction> = {
  recipes: {
    displayTransform: (data: ApiData.AllRecipes) =>
      data.recipes.map(({ id, title, ingredients, glassware }) => ({
        id,
        data: [
          title,
          ingredients.map(({ name }) => name).join(", "),
          glassware.name,
        ],
      })),
    emptyFormState: {},
    validateForm: () => false,
    createMutationInput: () => ({}),
  },
  ingredients: {
    displayTransform: (data: ApiData.AllIngredients) =>
      data.ingredients.map(({ id, name, abv }) => ({
        id,
        data: [name, abv && (abv * 100).toPrecision(2)],
      })),
    emptyFormState: {
      name: "",
      abv: "",
    },
    validateForm: ({ name, abv }) => {
      if (name.length <= 0) {
        return false;
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
    createMutationInput: ({ name, abv }) => ({
      name,
      abv: abv && parseFloat(abv) / 100,
    }),
  },
  glassware: {
    displayTransform: (data: ApiData.AllGlassware) =>
      data.allGlassware.map(({ id, name }) => ({ id, data: [name] })),
    emptyFormState: {
      name: "",
    },
    validateForm: ({ name }) => name.length > 0,
    createMutationInput: (form) => form,
  },
};

export default function useAdminState(
  initialId: Admin.CategoryId
): Admin.Interaction {
  const [currentId, updateCategoryId] = useState<Admin.CategoryId>(initialId);
  const { loading, data: currentData } = useAdminQuery(currentId);
  const [mutation] = useAdminMutation(currentId);
  const [spreadsheet, setSpreadsheet] = useState<Admin.SpreadsheetState>({
    spreadsheetHeaders: [],
    spreadsheetData: [],
  });
  const [form, setForm] = useState<Admin.FormState>(EMPTY_FORM);

  useEffect(() => {
    if (loading || !currentData) {
      return;
    }

    let spreadsheetHeaders: string[];
    switch (currentId) {
      case "recipes":
        spreadsheetHeaders = ["Title", "Ingredients", "Glassware"];
        break;
      case "ingredients":
        spreadsheetHeaders = ["Name", "Abv (%)"];
        break;
      case "glassware":
        spreadsheetHeaders = ["Name"];
        break;
    }

    setSpreadsheet({
      spreadsheetHeaders,
      spreadsheetData: dataInteraction[currentId].displayTransform(currentData),
    });
  }, [loading, currentId, currentData]);

  const initializeForm = (id?: string) => {
    let title: string;
    let formFields: Admin.FormField[];
    switch (currentId) {
      case "recipes":
        title = "Add Recipe";
        formFields = [];
        break;
      case "ingredients":
        title = "Add Ingredient";
        formFields = [
          { key: "name", name: "Name" },
          { key: "abv", name: "Abv (%)" },
        ];
        break;
      case "glassware":
        title = "Add Glassware";
        formFields = [{ key: "name", name: "Name" }];
        break;
    }

    setForm({
      title,
      formFields,
      formValues: dataInteraction[currentId].emptyFormState,
      valid: false,
    });
  };
  const clearForm = () => {
    setForm(EMPTY_FORM);
  };
  const updateForm = (key: string, value: string) => {
    const updatedFormValues = {
      ...form.formValues,
      [key]: value,
    };

    setForm({
      ...form,
      formValues: updatedFormValues,
      valid: dataInteraction[currentId].validateForm(updatedFormValues),
    });
  };
  const saveForm = () => {
    if (!form.valid) {
      return;
    }

    mutation({
      variables: {
        input: dataInteraction[currentId].createMutationInput(form.formValues),
      },
    });
  };

  return {
    spreadsheet,
    form,
    actions: {
      updateCategoryId,
      initializeForm,
      updateForm,
      saveForm,
      clearForm,
    },
  };
}

function useAdminQuery(id: Admin.CategoryId): QueryResult {
  const recipesQuery = useQuery(GetAllRecipes, {
    skip: id !== "recipes",
  });
  const ingredientsQuery = useQuery(GetAllIngredients, {
    skip: id !== "ingredients",
  });
  const glasswareQuery = useQuery(GetAllGlassware, {
    skip: id !== "glassware",
  });

  switch (id) {
    case "recipes":
      return recipesQuery;
    case "ingredients":
      return ingredientsQuery;
    case "glassware":
      return glasswareQuery;
  }
}

function useAdminMutation(id: Admin.CategoryId): MutationTuple<any, any> {
  const recipeMutation = useMutation(CreateRecipe, {
    refetchQueries: [GetAllRecipes],
  });
  const ingredientMutation = useMutation(CreateIngredient, {
    refetchQueries: [GetAllIngredients],
  });
  const glasswareMutation = useMutation(CreateGlassware, {
    refetchQueries: [GetAllGlassware],
  });

  switch (id) {
    case "recipes":
      return recipeMutation;
    case "ingredients":
      return ingredientMutation;
    case "glassware":
      return glasswareMutation;
  }
}
