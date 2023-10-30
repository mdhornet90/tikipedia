import { QueryResult } from "@apollo/client";
import { useState, useEffect } from "react";
import { GetAllGlassware, GetAllIngredients, GetAllRecipes } from "../api";
import { useQuery } from "@apollo/client";

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
  },
  ingredients: {
    displayTransform: (data: ApiData.AllIngredients) =>
      data.ingredients.map(({ id, name, abv }) => ({
        id,
        data: [name, abv && (abv * 100).toPrecision(2)],
      })),
  },
  glassware: {
    displayTransform: (data: ApiData.AllGlassware) =>
      data.allGlassware.map(({ id, name }) => ({ id, data: [name] })),
  },
};

export default function useAdminState(
  initialId: Admin.CategoryId
): Admin.Interaction {
  const [currentId, updateCategoryId] = useState<Admin.CategoryId>(initialId);
  const { loading, data: currentData } = useAdminQuery(currentId);
  const [spreadsheet, setSpreadsheet] = useState<Admin.SpreadsheetState>({
    spreadsheetHeaders: [],
    spreadsheetData: [],
  });
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

  return {
    currentId,
    spreadsheet,
    actions: {
      updateCategoryId,
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
