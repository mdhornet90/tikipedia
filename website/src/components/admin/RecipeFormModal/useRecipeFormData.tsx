import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { RecipeFormData } from "../../../api";

export default function useRecipeFormData() {
  const { loading, data } = useQuery<Input.Data.RecipeForm>(RecipeFormData);
  const [ingredientLookup, setIngredientLookup] = useState<
    Record<string, Input.Data.Ingredient>
  >({});
  const [glasswareLookup, setGlasswareLookup] = useState<
    Record<string, Input.Data.Glassware>
  >({});

  useEffect(() => {
    if (loading || !data) {
      return;
    }
    const { ingredients, allGlassware } = data;

    setIngredientLookup(
      ingredients
        .sort(({ name: aName }, { name: bName }) => aName.localeCompare(bName))
        .reduce((acc, ingredient) => {
          acc[ingredient.name] = ingredient;
          return acc;
        }, {} as Record<string, Input.Data.Ingredient>)
    );
    setGlasswareLookup(
      allGlassware.reduce((acc, glassware) => {
        acc[glassware.name] = glassware;
        return acc;
      }, {} as Record<string, Input.Data.Glassware>)
    );
  }, [loading, data]);

  return { ingredientLookup, glasswareLookup };
}
