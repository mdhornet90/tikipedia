import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { Recipe } from "../../../api";

export default function useRecipeData(id?: string | null) {
  const { loading: recipeLoading, data: recipeData } = useQuery<{
    recipe: Input.Data.Recipe;
  }>(Recipe.GetOne, { variables: { id }, skip: !id });
  const [initialRecipe, setInitialRecipe] = useState<Input.Recipe>();

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
        ingredients: recipe.ingredients.map(({ name, quantity, unit }) => ({
          name,
          quantity: quantity.toString(),
          unit,
        })),
        garnishes: recipe.garnishes.map(({ name, quantity }) => ({
          name,
          quantity: quantity.toString(),
        })),
      };
      setInitialRecipe(initialForm);
    }
  }, [recipeLoading, recipeData]);

  return initialRecipe;
}
