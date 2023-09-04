import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDef as Ingredients, resolvers as IngredientResolvers } from './ingredients';

const Query = `#graphql
  type Query {
    ingredients: [Ingredient!]!
    ingredient(id: String): Ingredient
  }
  type Mutation {
    createIngredient(ingredient: IngredientInput!): Ingredient!
  }
`;

const resolvers = {
  Query: {
    ...IngredientResolvers.Query,
  },
  Mutation: {
    ...IngredientResolvers.Mutation,
  },
};

export const schema = makeExecutableSchema({
  typeDefs: [Query, Ingredients],
  resolvers,
});
