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
  const [garnishLookup, setGarnishLookup] = useState<
    Record<string, Input.Data.Garnish>
  >({});

  useEffect(() => {
    if (loading || !data) {
      return;
    }
    const { ingredients, allGlassware, garnishes } = data;

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
    setGarnishLookup(
      garnishes.reduce((acc, garnish) => {
        acc[garnish.name] = garnish;
        return acc;
      }, {} as Record<string, Input.Data.Garnish>)
    );
  }, [loading, data]);

  return { ingredientLookup, glasswareLookup, garnishLookup };
}
