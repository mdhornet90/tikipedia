/// <reference types="react-scripts" />

interface Tag {
  title: string;
}

interface RecipeCard {
  id: string;
  name: string;
}

interface RecipeDetail {
  name: string;
  ingredients: Ingredient[];
  garnishes?: string[];
  glassware: { name: string };
  instructions: string;
}

interface Ingredient {
  quantity: string;
  unit: string;
  name: string;
}
