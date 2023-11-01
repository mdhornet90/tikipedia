import { GraphQLError } from 'graphql';
import { ApolloServerErrorCode as ErrorCode } from '@apollo/server/errors';

import { findAll, findOne, insert, update } from '../core/queries/recipes';
import { findOne as findGlassware } from '../core/queries/glassware';
import { isDatabaseError, isUUID } from '../utils';
import { findAllForRecipe } from '../core/queries/ingredients';
import mangledName from '../core/mangledName';
import { UUID } from 'crypto';

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
    unit: Unit!
  }
  enum Unit {
    oz
    tsp
    tbsp
    dash
    drop
    each
  }
  type Query {
    recipes: [Recipe!]!
    recipe(id: ID): Recipe
  }

  input CreateRecipeInput {
    title: String!
    imageUrl: String
    instructions: String!
    glasswareId: ID!
    ingredientInputs: [CreateRecipeIngredientInput!]!
  }
  input CreateRecipeIngredientInput {
    ingredientId: ID!
    quantity: Float!
    unit: Unit!
  }

  input EditRecipeInput {
    title: String
    imageUrl: String
    instructions: String
    glasswareId: ID
    ingredientInputs: [EditRecipeIngredientInput!]
  }
  input EditRecipeIngredientInput {
    ingredientId: ID!
    quantity: Float!
    unit: Unit!
  }

  type Mutation {
    createRecipe(input: CreateRecipeInput!): Recipe!
    editRecipe(id: ID!, input: EditRecipeInput!): Recipe!
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
      { input: { ingredientInputs: rawIngredientInputs, ...input } }: { input: CreateRecipeInput },
    ) => {
      const ingredientInputs = rawIngredientInputs.map(({ unit, ...input }, i) => ({
        ...input,
        index: i,
        unit: unit.toLowerCase(),
      }));
      return insert({
        ...input,
        ingredientInputs,
        mangledName: mangledName(input.title),
      });
    },

    editRecipe: async (_: any, { id, input }: { id: UUID; input: EditRecipeInput }) => {
      if (Object.keys(input).length == 0) {
        throw new GraphQLError('At least one field required!', {
          extensions: { code: ErrorCode.BAD_USER_INPUT },
        });
      }
      try {
        const dbUpdate = {
          ...input,
          mangledName: input.title ? mangledName(input.title) : undefined,
        };
        return await update(id, dbUpdate);
      } catch (err) {
        if (isDatabaseError(err)) {
          handleDatabaseError(err, 'updating');
        }
      }
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
