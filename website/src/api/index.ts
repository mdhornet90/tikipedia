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
  query recipe($id: ID!) {
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

export const GetRecipe = gql`
  query recipe($id: ID!) {
    recipe(id: $id) {
      id
      title
      imageUrl
      instructions
      glassware {
        name
      }
      ingredients {
        name
        unit
        quantity
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

export const DeleteRecipe = gql`
  mutation deleteRecipe($id: ID!) {
    deleteRecipe(id: $id) {
      id
    }
  }
`;

export const EditRecipe = gql`
  mutation editRecipe($id: ID!, $input: EditRecipeInput!) {
    editRecipe(id: $id, input: $input) {
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

export const GetIngredient = gql`
  query ingredient($id: ID!) {
    ingredient(id: $id) {
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

export const EditIngredient = gql`
  mutation editIngredient($id: ID!, $input: EditIngredientInput!) {
    editIngredient(id: $id, input: $input) {
      id
    }
  }
`;

export const DeleteIngredient = gql`
  mutation deleteIngredient($id: ID!) {
    deleteRecipe(id: $id) {
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

export const GetGlassware = gql`
  query glassware($id: ID!) {
    glassware(id: $id) {
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

export const EditGlassware = gql`
  mutation editGlassware($id: ID!, $input: EditGlasswareInput!) {
    editGlassware(id: $id, input: $input) {
      id
    }
  }
`;

export const DeleteGlassware = gql`
  mutation deleteGlassware($id: ID!) {
    deleteRecipe(id: $id) {
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
      abv
      name
    }
  }
`;
