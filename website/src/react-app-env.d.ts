/// <reference types="react-scripts" />

type Category = "recipes" | "ingredients" | "glassware";

// Data types that define the shape of API objects used in populating the cards and detail views on the home page
declare module Main {
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

  interface Tag {
    title: string;
  }
}
declare module Admin {
  interface Interaction {
    category: Category;
    spreadsheet: Spreadsheet.State;
    updateCategory: (category: Category) => void;
  }
}

// Data types that define the interaction and state of the spreadsheet
declare module Spreadsheet {
  type DataTransformFn = (data: T) => RowData[];

  interface State {
    headers: string[];
    data: RowData[];
  }

  interface RowData {
    id: string;
    data: (string | number | undefined)[];
  }

  // Data types that define the shape of API objects used in populating the spreadsheet
  declare module Data {
    interface Recipes {
      recipes: {
        id: string;
        title: string;
        ingredients: { name: string }[];
        glassware: { name: string };
      }[];
    }
    interface Ingredients {
      ingredients: {
        id: string;
        name: string;
        abv?: number;
      }[];
    }
    interface Glassware {
      allGlassware: {
        id: string;
        name: string;
      }[];
    }
  }
}

// Data types that define the shape of data the user enters when populating a form
declare module Input {
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
    instructions: string;
    glassware: string;
    ingredients: RecipeIngredient[];
  }

  interface RecipeIngredient {
    name: string;
    quantity: string;
    unit: string;
  }

  // Data types that define the shape of API objects used in form interaction
  declare module Data {
    interface Ingredient {
      id: string;
      abv: string;
      name: string;
    }
    interface Glassware {
      id: string;
      name: string;
    }
    interface RecipeForm {
      ingredients: Ingredient[];
      allGlassware: Glassware[];
    }
  }
}

// Data types that define the shape of data submitted to the API (mutations)
declare module Submit {
  interface CreateGlassware {
    name: string;
  }
  interface EditGlassware {
    name: string;
  }

  interface CreateRecipe {
    title: string;
    imageUrl?: string;
    instructions: string;
    glasswareId: string;
    ingredientInputs: {
      ingredientId: string;
      quantity: number;
      unit: string;
    }[];
  }
}
