/// <reference types="react-scripts" />

interface Tag {
  title: string;
}

interface RecipeCard {
  id: string;
  title: string;
  imageUrl?: string;
  tags?: Tag[];
}

interface RecipeDetail {
  title: string;
  ingredients: RecipeIngredient[];
  garnishes?: string[];
  glassware: { name: string };
  instructions: string;
}

interface RecipeIngredient {
  quantity: string;
  unit: string;
  name: string;
}

interface Ingredient {
  name: string;
  abv?: number;
}

declare module ApiData {
  interface AllIngredients {
    ingredients: Ingredient[];
  }
}
