import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GetRecipe } from "../../../api";

export default function useRecipeData(
  defaultValue: Input.Recipe,
  id?: string | null
) {
  const { loading: recipeLoading, data: recipeData } = useQuery<{
    recipe: Input.Data.Recipe;
  }>(GetRecipe, { variables: { id }, skip: !id });
  const [initialRecipe, setInitialRecipe] =
    useState<Input.Recipe>(defaultValue);

  useEffect(() => {
    if (recipeLoading) {
      return;
    }
    if (recipeData) {
      const { recipe } = recipeData;
      const initialForm: Input.Recipe = {
        title: recipe.title,
        imageUrl: recipe.imageUrl,
        glassware: recipe.glassware.name,
        instructions: recipe.instructions,
        ingredients: recipe.ingredients,
      };
      setInitialRecipe(initialForm);
    }
  }, [recipeLoading, recipeData]);

  return initialRecipe;
}
