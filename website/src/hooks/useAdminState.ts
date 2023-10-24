import { QueryResult } from "@apollo/client";
import { useState, useEffect } from "react";
import { GetAllGlassware, GetAllIngredients } from "../api";
import { useQuery } from "@apollo/client";

const dataInteraction: Record<Admin.CategoryId, Admin.DataInteraction> = {
  ingredients: {
    displayTransform: (data: ApiData.AllIngredients) =>
      data.ingredients.map(({ id, name, abv }) => ({
        id,
        data: [name, abv],
      })) ?? [],
    emptyFormState: {
      name: "",
      abv: "",
    },
  },
  glassware: {
    displayTransform: (data: ApiData.AllGlassware) =>
      data.allGlassware.map(({ id, name }) => ({ id, data: [name] })) ?? [],
    emptyFormState: {
      name: "",
    },
  },
};

export default function useAdminState(
  initialId: Admin.CategoryId
): Admin.Interaction {
  const [currentId, updateCategoryId] = useState<Admin.CategoryId>(initialId);
  const { loading, data: currentData } = useAdminQuery(currentId);
  const [spreadsheet, setSpreadsheet] = useState<Admin.SpreadsheetState | null>(
    null
  );
  const [form, setForm] = useState<Admin.FormState | null>(null);

  useEffect(() => {
    if (loading || !currentData) {
      return;
    }

    let spreadsheetHeaders: string[];
    switch (currentId) {
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
    setForm(null);
  };
  const updateForm = (key: string, value: string | null) => {
    setForm(
      form && {
        ...form,
        formValues: {
          ...form.formValues,
          [key]: value,
        },
      }
    );
  };

  return {
    spreadsheet,
    form,
    actions: {
      updateCategoryId,
      initializeForm,
      updateForm,
      clearForm,
    },
  };
}

function useAdminQuery(id: Admin.CategoryId): QueryResult {
  const ingredientsQuery = useQuery(GetAllIngredients, {
    skip: id !== "ingredients",
  });
  const glasswareQuery = useQuery(GetAllGlassware, {
    skip: id !== "glassware",
  });

  switch (id) {
    case "ingredients":
      return ingredientsQuery;
    case "glassware":
      return glasswareQuery;
  }
}
