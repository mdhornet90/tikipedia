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
declare module Admin {
  type CategoryId = "recipes" | "ingredients" | "glassware";

  interface DataInteraction {
    displayTransform: (data: T) => Admin.SpreadsheetRowData[];
    emptyFormState: Record<string, string>;
    validateForm: (values: Record<string, string>) => boolean;
    createMutationInput: (
      values: Record<string, string>
    ) => Record<string, any>;
  }

  interface SpreadsheetRowData {
    id: string;
    data: (string | number | undefined)[];
  }

  interface SpreadsheetState {
    spreadsheetHeaders: string[];
    spreadsheetData: SpreadsheetRowData[];
  }

  interface FormField {
    key: string;
    name: string;
  }

  interface FormState {
    title: string;
    valid: boolean;
    formValues: Record<string, string>;
    formFields: FormField[];
  }

  interface FormActions {
    updateCategoryId: (categoryId: Admin.CategoryId) => void;
    initializeForm: (id?: string) => void;
    clearForm: () => void;
    updateForm: (key: string, value: string) => void;
    saveForm: () => void;
  }

  interface Interaction {
    spreadsheet: SpreadsheetState;
    form: FormState;
    actions: FormActions;
  }
}
