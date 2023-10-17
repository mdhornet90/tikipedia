import { gql } from "@apollo/client";
import { client } from "./ApolloClient";

export const getRecipeCards = async (): Promise<RecipeCard[]> =>
  client
    .query({
      query: gql`
        query {
          recipes {
            id
            name
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
            name
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
