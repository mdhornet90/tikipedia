import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDef as Garnishes, resolvers as GarnishResolvers } from './garnishes';
import { typeDef as Glassware, resolvers as GlasswareResolvers } from './glassware';
import { typeDef as Ingredients, resolvers as IngredientResolvers } from './ingredients';
import { typeDef as Recipes, resolvers as RecipeResolvers } from './recipes';

export const schema = makeExecutableSchema({
  typeDefs: [Garnishes, Glassware, Ingredients, Recipes],
  resolvers: [GarnishResolvers, GlasswareResolvers, IngredientResolvers, RecipeResolvers],
});
