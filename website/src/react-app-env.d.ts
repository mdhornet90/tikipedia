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
  interface RecipeEntry {
    id: string;
    title: string;
    ingredients: { name: string }[];
    glassware: { name: string };
  }
  interface AllRecipes {
    recipes: RecipeEntry[];
  }
  interface AllIngredients {
    ingredients: Ingredient[];
  }

  interface AllGlassware {
    allGlassware: Glassware[];
  }
}

declare module AdminData {
  interface Ingredient {
    id: string;
    name: string;
  }
  interface Glassware {
    id: string;
    name: string;
  }
  interface RecipeFormData {
    ingredients: Ingredient[];
    allGlassware: Glassware[];
  }
}
declare module Admin {
  type CategoryId = "recipes" | "ingredients" | "glassware";

  interface DataInteraction {
    displayTransform: (data: T) => Admin.SpreadsheetRowData[];
  }

  interface SpreadsheetRowData {
    id: string;
    data: (string | number | undefined)[];
  }

  interface SpreadsheetState {
    spreadsheetHeaders: string[];
    spreadsheetData: SpreadsheetRowData[];
  }
  interface FormActions {
    updateCategoryId: (categoryId: Admin.CategoryId) => void;
  }

  interface Interaction {
    currentId: CategoryId;
    spreadsheet: SpreadsheetState;
    actions: FormActions;
  }
}
interface ListItem {
  id: string;
  text: string;
}

declare module Form {
  interface Ingredient {
    abv: string;
    name: string;
  }

  interface Glassware {
    name: string;
  }

  interface Recipe {
    title: string;
    imageUrl?: string | null;
    instructions: String;
    glassware: string;
    ingredients: RecipeIngredient[];
  }

  interface RecipeIngredient {
    name: string;
    quantity: string;
    unit: string;
  }
}
