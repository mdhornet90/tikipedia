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
    ingredients: () => findAll(),

    ingredient: (id: string) => findOne(id),
  },

  Mutation: {
    createIngredient: (_: any, { ingredient }: { ingredient: Ingredient }) =>
      insert({ ...ingredient, name: ingredient.name.toLowerCase() }),
  },
};
