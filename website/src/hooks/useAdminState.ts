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
  },
  glassware: {
    displayTransform: (data: ApiData.AllGlassware) =>
      data.allGlassware.map(({ id, name }) => ({ id, data: [name] })) ?? [],
  },
};

export default function useAdminState(
  initialId: Admin.CategoryId
): Admin.FormInteraction {
  const [currentId, updateCategoryId] = useState<Admin.CategoryId>(initialId);
  const { loading, data: currentData } = useAdminQuery(currentId);
  const [formState, setFormState] = useState<Admin.FormState | null>(null);

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

    setFormState({
      spreadsheetHeaders,
      spreadsheetData: dataInteraction[currentId].displayTransform(currentData),
    });
  }, [loading, currentId, currentData]);

  return { form: formState, updateCategoryId };
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
