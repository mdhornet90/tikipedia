import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDef as Glassware, resolvers as GlasswareResolvers } from './glassware';
import { typeDef as Ingredients, resolvers as IngredientResolvers } from './ingredients';
import { typeDef as Recipes, resolvers as RecipeResolvers } from './recipes';

export const schema = makeExecutableSchema({
  typeDefs: [Glassware, Ingredients, Recipes],
  resolvers: [GlasswareResolvers, IngredientResolvers, RecipeResolvers],
});
