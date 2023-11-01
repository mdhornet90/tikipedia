import { gql } from "@apollo/client";

export const GetRecipeCards = gql`
  query {
    recipes {
      id
      title
      imageUrl
    }
  }
`;

export const GetRecipeDetail = gql`
  query recipe($id: ID) {
    recipe(id: $id) {
      title
      ingredients {
        quantity
        unit
        name
      }
      glassware {
        name
      }
      instructions
    }
  }
`;

export const GetAllRecipes = gql`
  query recipes {
    recipes {
      id
      title
      ingredients {
        name
      }
      glassware {
        name
      }
    }
  }
`;

export const CreateRecipe = gql`
  mutation createRecipe($input: CreateRecipeInput!) {
    createRecipe(input: $input) {
      id
    }
  }
`;

export const GetAllIngredients = gql`
  query ingredients {
    ingredients {
      id
      name
      abv
    }
  }
`;

export const CreateIngredient = gql`
  mutation createIngredient($input: CreateIngredientInput!) {
    createIngredient(input: $input) {
      id
    }
  }
`;

export const GetAllGlassware = gql`
  query glassware {
    allGlassware {
      id
      name
    }
  }
`;

export const CreateGlassware = gql`
  mutation createGlassware($input: CreateGlasswareInput!) {
    createGlassware(input: $input) {
      id
    }
  }
`;

export const RecipeFormData = gql`
  query recipeFormData {
    allGlassware {
      id
      name
    }
    ingredients {
      id
      name
    }
  }
`;
