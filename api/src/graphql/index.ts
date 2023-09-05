import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDef as Ingredients, resolvers as IngredientResolvers } from './ingredients';
import { typeDef as Glassware, resolvers as GlasswareResolvers } from './glassware';

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
  typeDefs: [Glassware, Ingredients],
  resolvers,
});
