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
