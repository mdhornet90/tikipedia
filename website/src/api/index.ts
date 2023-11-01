import { gql } from "@apollo/client";
import { client } from "./ApolloClient";

export const getRecipeCards = async (): Promise<Main.RecipeCard[]> =>
  client
    .query({
      query: gql`
        query {
          recipes {
            id
            title
            imageUrl
          }
        }
      `,
    })
    .then(({ data }) => data.recipes);

export const getRecipeDetail = async (id: string): Promise<Main.RecipeDetail> =>
  client
    .query({
      query: gql`
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
      `,
      variables: { id },
    })
    .then(({ data }) => data.recipe);

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
  mutation createRecipe($input: RecipeInput!) {
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
  mutation createIngredient($input: IngredientInput!) {
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
  mutation createGlassware($input: GlasswareInput!) {
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
