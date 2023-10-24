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

  interface DataInteraction {
    displayTransform: (data: T) => Admin.SpreadsheetRowData[];
    emptyFormState: Record<string, string>;
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
    updateForm(
      key: keyof FormState.formValues,
      value: (typeof FormState.formValues)[keyof FormState.formValues]
    );
  }

  interface Interaction {
    spreadsheet: SpreadsheetState;
    form: FormState;
    actions: FormActions;
  }
}
