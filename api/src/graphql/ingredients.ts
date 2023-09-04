import { findAll, findOne, insert } from '../core/ingredients';

export const typeDef = `#graphql
    type Ingredient {
        name: String!
        abv: Float!
    }
    input IngredientInput {
        name: String!
        abv: Float
    }
`;

export const resolvers = {
  Query: {
    ingredients() {
      return findAll();
    },

    ingredient(id: string) {
      return findOne(id);
    },
  },
  Mutation: {
    createIngredient(_: any, { ingredient }: { ingredient: Ingredient }) {
      return insert(ingredient);
    },
  },
};
