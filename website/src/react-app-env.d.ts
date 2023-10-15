/// <reference types="react-scripts" />

interface RecipeCard {
  id: string;
  title: string;
  imageUrl: string;
  tags: Tag[];
}

interface Tag {
  title: string;
}

interface RecipeDetail {}

interface RecipeDetail {
  title: string;
  ingredients: Ingredient[];
  garnishes: string[];
  glassware: string;
  instructions: string;
}

interface Ingredient {
  amount: string;
  unit: string;
  name: string;
}
