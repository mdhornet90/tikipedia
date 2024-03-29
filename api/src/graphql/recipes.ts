import { GraphQLError } from 'graphql';
import { ApolloServerErrorCode as ErrorCode } from '@apollo/server/errors';

import { findAll, findBySlug, findOne, insert, remove, update } from '../core/queries/recipes';
import { findOne as findGlassware } from '../core/queries/glassware';
import { isDatabaseError, isUUID } from '../utils';
import { findAllForRecipe as findRecipeIngredients } from '../core/queries/ingredients';
import { findAllForRecipe as findRecipeGarnishes } from '../core/queries/garnishes';
import { mangledName, slug } from '../core/mangledName';
import { UUID } from 'crypto';

export const typeDef = `#graphql
  type Recipe {
    id: ID!
    title: String!
    slug: String!
    imageUrl: String
    instructions: String!
    glassware: Glassware!
    ingredients: [RecipeIngredient!]!
    garnishes: [RecipeGarnish!]!
  }
  type RecipeIngredient {
    name: String!
    abv: Float!
    quantity: Float!
    unit: String!
  }

  type RecipeGarnish {
    name: String!
    quantity: Int!
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
    recipeBySlug(slug: String): Recipe
  }

  input CreateRecipeInput {
    title: String!
    imageUrl: String
    instructions: String!
    glasswareId: ID!
    ingredientInputs: [CreateRecipeIngredientInput!]!
    garnishInputs: [CreateRecipeGarnishInput!]
  }
  input CreateRecipeIngredientInput {
    ingredientId: ID!
    quantity: Float!
    unit: Unit!
  }

  input CreateRecipeGarnishInput {
    garnishId: ID!
    quantity: Int!
  }

  input EditRecipeInput {
    title: String
    imageUrl: String
    instructions: String
    glasswareId: ID
    ingredientInputs: [EditRecipeIngredientInput!]
    garnishInputs: [EditRecipeGarnishInput!]
  }

  input EditRecipeIngredientInput {
    ingredientId: ID!
    quantity: Float!
    unit: Unit!
  }

  input EditRecipeGarnishInput {
    garnishId: ID!
    quantity: Int!
  }

  type Mutation {
    createRecipe(input: CreateRecipeInput!): Recipe!
    editRecipe(id: ID!, input: EditRecipeInput!): Recipe!
    deleteRecipe(id: ID!): ID!
  }
`;

enum Unit {
  OZ = 'oz',
  TSP = 'tsp',
  TBSP = 'tbsp',
  DASH = 'dash',
  DROP = 'drop',
  EACH = 'each',
}

export const resolvers = {
  Unit,
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

    recipeBySlug: async (_: any, { slug }: { slug: string }) => {
      try {
        return await findBySlug(slug);
      } catch (err) {
        if (isDatabaseError(err)) {
          handleDatabaseError(err, 'retrieving by slug');
        }
      }
    },
  },

  Recipe: {
    glassware: async (recipe: Recipe.Self) => findGlassware(recipe.glasswareId),
    ingredients: async (recipe: Recipe.Self) => findRecipeIngredients(recipe.id),
    garnishes: async (recipe: Recipe.Self) => findRecipeGarnishes(recipe.id),
  },

  Mutation: {
    createRecipe: async (_: any, { input }: { input: Recipe.API.Create }) =>
      insert({
        ...input,
        mangledName: mangledName(input.title),
        slug: slug(input.title),
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
          dbUpdate['slug'] = input.title ? slug(input.title) : undefined;
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

function validateRecipeUpdate({
  ingredientInputs,
  garnishInputs,
  ...input
}: Recipe.API.Edit): boolean {
  return Object.keys(input).length > 0 || (ingredientInputs?.length ?? 0) > 0 || !!garnishInputs;
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
