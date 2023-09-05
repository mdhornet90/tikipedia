import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDef as Ingredients, resolvers as IngredientResolvers } from './ingredients';
import { typeDef as Glassware, resolvers as GlasswareResolvers } from './glassware';

const Query = `#graphql
  type Query {
    allGlassware: [Glassware!]!
    glassware(id: ID): Glassware
    ingredients: [Ingredient!]!
    ingredient(id: ID): Ingredient
  }
  type Mutation {
    createGlassware(glassware: GlasswareInput!): Glassware!
    createIngredient(ingredient: IngredientInput!): Ingredient!
  }
`;

const resolvers = {
  Query: {
    ...GlasswareResolvers.Query,
    ...IngredientResolvers.Query,
  },
  Mutation: {
    ...GlasswareResolvers.Mutation,
    ...IngredientResolvers.Mutation,
  },
};

export const schema = makeExecutableSchema({
  typeDefs: [Query, Glassware, Ingredients],
  resolvers,
});
