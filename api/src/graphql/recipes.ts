import { GraphQLError } from 'graphql';
import { ApolloServerErrorCode as ErrorCode } from '@apollo/server/errors';

import { findAll, findOne, insert, remove, update } from '../core/queries/recipes';
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
    OZ
    TSP
    TBSP
    DASH
    DROP
    EACH
  }

  type Query {
    recipes: [Recipe!]!
    recipe(id: ID!): Recipe
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
    deleteRecipe(id: ID!): ID!
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
    glassware: (recipe: Recipe.Self) => {
      return findGlassware(recipe.glasswareId);
    },
    ingredients: async (recipe: Recipe.Self) => {
      const rawIngredients = await findAllForRecipe(recipe.id);
      return rawIngredients;
    },
  },

  Mutation: {
    createRecipe: async (_: any, { input }: { input: Recipe.API.Create }) =>
      insert({
        ...input,
        mangledName: mangledName(input.title),
      }),

    editRecipe: async (_: any, { id, input }: { id: UUID; input: Recipe.API.Edit }) => {
      if (!validateRecipeUpdate(input)) {
        throw new GraphQLError('At least one field required!', {
          extensions: { code: ErrorCode.BAD_USER_INPUT },
        });
      }
      try {
        const dbUpdate: Recipe.DB.Edit = {
          ...input,
        };
        if (input.title) {
          dbUpdate['mangledName'] = input.title ? mangledName(input.title) : undefined;
        }
        return await update(id, dbUpdate);
      } catch (err) {
        if (isDatabaseError(err)) {
          handleDatabaseError(err, 'updating');
        } else {
          throw err;
        }
      }
    },

    deleteRecipe: async (_: any, { id }: { id: UUID }) => {
      try {
        await remove(id);
        return id;
      } catch (err) {
        if (isDatabaseError(err)) {
          handleDatabaseError(err, 'removing');
        }
      }
    },
  },
};

function validateRecipeUpdate({ ingredientInputs, ...input }: Recipe.API.Edit): boolean {
  return Object.keys(input).length > 0 || (ingredientInputs?.length ?? 0) > 0;
}

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
