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
