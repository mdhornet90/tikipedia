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
  id: string;
  name: string;
  abv?: number;
}

interface Glassware {
  id: string;
  name: string;
}

declare module ApiData {
  interface AllIngredients {
    ingredients: Ingredient[];
  }

  interface AllGlassware {
    allGlassware: Glassware[];
  }
}
declare module Admin {
  type CategoryId = "ingredients" | "glassware";

  interface SpreadsheetRowData {
    id: string;
    data: Array<string | number | undefined>;
  }
  interface DataInteraction {
    displayTransform: (data: T) => Admin.SpreadsheetRowData[];
  }
  interface FormState {
    spreadsheetHeaders: string[];
    spreadsheetData: SpreadsheetRowData[];
  }

  interface FormInteraction {
    updateCategoryId: (categoryId: Admin.CategoryId) => void;
    form: FormState | null;
  }
}
