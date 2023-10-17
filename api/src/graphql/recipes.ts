import { GraphQLError } from 'graphql';
import { ApolloServerErrorCode as ErrorCode } from '@apollo/server/errors';

import { findAll, findOne, insert } from '../core/queries/recipes';
import { findOne as findGlassware } from '../core/queries/glassware';
import { isDatabaseError, isUUID } from '../utils';
import { findAllForRecipe } from '../core/queries/ingredients';

export const typeDef = `#graphql
    type Recipe {
        id: ID!
        title: String!
        imageUrl: String
        instructions: String!
        glassware: Glassware!
        ingredients: [RecipeIngredient!]!
    }
    type RecipeIngredient {
      name: String!
      abv: Float!
      quantity: Float!
      unit: String!
    }
    input RecipeInput {
        title: String!
        imageUrl: String
        instructions: String!
        glasswareId: ID!
        ingredientInputs: [RecipeIngredientInput!]!
    }
    input RecipeIngredientInput {
      ingredientId: ID!
      quantity: Float
      unit: Unit
    }

    enum Unit {
      OZ,
      TSP
      TBSP
      DASH
      DROP
      EACH
    }

    type Query {
      recipes: [Recipe!]!
      recipe(id: ID): Recipe
    }

    type Mutation {
      createRecipe(input: RecipeInput): Recipe!
    }
`;

export const resolvers = {
  Query: {
    recipes: () => findAll(),

    recipe: async (_: any, { id }: { id: string }) => {
      if (!isUUID(id)) {
        throw new GraphQLError('id must be a valid uuid', {
          extensions: { code: ErrorCode.BAD_USER_INPUT },
        });
      }
      try {
        return await findOne(id);
      } catch (err) {
        if (isDatabaseError(err)) {
          handleDatabaseError(err, 'retrieving');
        }
      }
    },
  },

  Recipe: {
    glassware: (recipe: Recipe) => {
      return findGlassware(recipe.glasswareId);
    },
    ingredients: async (recipe: Recipe) => {
      const rawIngredients = await findAllForRecipe(recipe.id);
      return rawIngredients;
    },
  },

  Mutation: {
    createRecipe: async (
      _: any,
      { input: { ingredientInputs: rawIngredientInputs, ...input } }: { input: RecipeInput },
    ) => {
      const ingredientInputs = rawIngredientInputs.map(({ unit, ...input }, i) => ({
        ...input,
        index: i,
        unit: unit.toLowerCase(),
      }));
      return insert({
        ...input,
        ingredientInputs,
        mangledName: input.title.toLowerCase().replace(/\s+/g, ''),
      });
    },
  },
};

function handleDatabaseError(err: DatabaseError, action: string) {
  switch (err.code) {
    case '23505':
      throw new GraphQLError('recipe already exists!', {
        extensions: { code: ErrorCode.BAD_USER_INPUT },
      });
    default:
      throw new GraphQLError(`Unexpected error ${action} recipe`);
  }
}
