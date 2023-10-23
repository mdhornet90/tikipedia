import { gql } from "@apollo/client";
import { client } from "./ApolloClient";

export const getRecipeCards = async (): Promise<RecipeCard[]> =>
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

export const getRecipeDetail = async (id: string): Promise<RecipeDetail> =>
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
      name
      abv
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
