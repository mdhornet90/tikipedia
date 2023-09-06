import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDef as Ingredients, resolvers as IngredientResolvers } from './ingredients';
import { typeDef as Glassware, resolvers as GlasswareResolvers } from './glassware';

export const schema = makeExecutableSchema({
  typeDefs: [Glassware, Ingredients],
  resolvers: [GlasswareResolvers, IngredientResolvers],
});
