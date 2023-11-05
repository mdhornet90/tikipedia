import { gql } from "@apollo/client";

export module Display {
  export const Cards = gql`
    query {
      recipes {
        id
        title
        imageUrl
      }
    }
  `;

  export const Detail = gql`
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
        garnishes {
          name
        }
        instructions
      }
    }
  `;
}

export module Recipe {
  export const Create = gql`
    mutation createRecipe($input: CreateRecipeInput!) {
      createRecipe(input: $input) {
        id
      }
    }
  `;

  export const GetAll = gql`
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

  export const GetOne = gql`
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

  export const Edit = gql`
    mutation editRecipe($id: ID!, $input: EditRecipeInput!) {
      editRecipe(id: $id, input: $input) {
        id
      }
    }
  `;

  export const Delete = gql`
    mutation deleteRecipe($id: ID!) {
      deleteRecipe(id: $id)
    }
  `;
}

export module Ingredient {
  export const Create = gql`
    mutation createIngredient($input: CreateIngredientInput!) {
      createIngredient(input: $input) {
        id
      }
    }
  `;

  export const GetAll = gql`
    query ingredients {
      ingredients {
        id
        name
        abv
      }
    }
  `;

  export const GetOne = gql`
    query ingredient($id: ID!) {
      ingredient(id: $id) {
        id
        name
        abv
      }
    }
  `;

  export const Edit = gql`
    mutation editIngredient($id: ID!, $input: EditIngredientInput!) {
      editIngredient(id: $id, input: $input) {
        id
      }
    }
  `;

  export const Delete = gql`
    mutation deleteIngredient($id: ID!) {
      deleteIngredient(id: $id)
    }
  `;
}

export module Glassware {
  export const Create = gql`
    mutation createGlassware($input: CreateGlasswareInput!) {
      createGlassware(input: $input) {
        id
      }
    }
  `;

  export const GetAll = gql`
    query glassware {
      allGlassware {
        id
        name
      }
    }
  `;

  export const GetOne = gql`
    query glassware($id: ID!) {
      glassware(id: $id) {
        id
        name
      }
    }
  `;

  export const Edit = gql`
    mutation editGlassware($id: ID!, $input: EditGlasswareInput!) {
      editGlassware(id: $id, input: $input) {
        id
      }
    }
  `;

  export const Delete = gql`
    mutation deleteGlassware($id: ID!) {
      deleteGlassware(id: $id)
    }
  `;
}

export module Garnish {
  export const Create = gql`
    mutation createGarnish($input: CreateGarnishInput!) {
      createGarnish(input: $input) {
        id
      }
    }
  `;

  export const GetAll = gql`
    query garnishes {
      garnishes {
        id
        name
      }
    }
  `;

  export const GetOne = gql`
    query garnish($id: ID!) {
      garnish(id: $id) {
        id
        name
      }
    }
  `;

  export const Edit = gql`
    mutation editGarnish($id: ID!, $input: EditGarnishInput!) {
      editGarnish(id: $id, input: $input) {
        id
      }
    }
  `;

  export const Delete = gql`
    mutation deleteGarnish($id: ID!) {
      deleteGarnish(id: $id)
    }
  `;
}

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
    garnishes {
      id
      name
    }
  }
`;
