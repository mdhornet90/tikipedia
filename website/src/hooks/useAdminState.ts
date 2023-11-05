import { QueryResult } from "@apollo/client";
import { useState, useEffect } from "react";
import { Garnish, Glassware, Ingredient, Recipe } from "../api";
import { useQuery } from "@apollo/client";

const transforms: Record<Category, Spreadsheet.DataTransformFn> = {
  recipes: (data: Spreadsheet.Data.Recipes) =>
    data.recipes.map(({ id, title, ingredients, glassware }) => ({
      id,
      data: [
        title,
        ingredients.map(({ name }) => name).join(", "),
        glassware.name,
      ],
    })),
  ingredients: (data: Spreadsheet.Data.Ingredients) =>
    data.ingredients.map(({ id, name, abv }) => ({
      id,
      data: [name, abv && (abv * 100).toPrecision(2)],
    })),
  glassware: (data: Spreadsheet.Data.Glassware) =>
    data.allGlassware.map(({ id, name }) => ({ id, data: [name] })),
  garnishes: (data: Spreadsheet.Data.Garnishes) =>
    data.garnishes.map(({ id, name }) => ({ id, data: [name] })),
};

export default function useAdminState(initialId: Category): Admin.Interaction {
  const [category, updateCategory] = useState<Category>(initialId);
  const { loading, data: currentData } = useAdminQuery(category);
  const [spreadsheet, setSpreadsheet] = useState<Spreadsheet.State>({
    headers: [],
    data: [],
  });
  useEffect(() => {
    if (loading || !currentData) {
      return;
    }

    let headers: string[];
    switch (category) {
      case "recipes":
        headers = ["Title", "Ingredients", "Glassware"];
        break;
      case "ingredients":
        headers = ["Name", "Abv (%)"];
        break;
      case "glassware":
      case "garnishes":
        headers = ["Name"];
        break;
    }

    setSpreadsheet({ headers, data: transforms[category](currentData) });
  }, [loading, category, currentData]);

  return {
    category,
    spreadsheet,
    updateCategory,
  };
}

function useAdminQuery(category: Category): QueryResult {
  const recipesQuery = useQuery(Recipe.GetAll, {
    skip: category !== "recipes",
  });
  const ingredientsQuery = useQuery(Ingredient.GetAll, {
    skip: category !== "ingredients",
  });
  const glasswareQuery = useQuery(Glassware.GetAll, {
    skip: category !== "glassware",
  });
  const garnishesQuery = useQuery(Garnish.GetAll, {
    skip: category !== "garnishes",
  });

  switch (category) {
    case "recipes":
      return recipesQuery;
    case "ingredients":
      return ingredientsQuery;
    case "glassware":
      return glasswareQuery;
    case "garnishes":
      return garnishesQuery;
  }
}
