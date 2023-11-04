import { GraphQLError } from 'graphql';
import { ApolloServerErrorCode as ErrorCode } from '@apollo/server/errors';

import { findAll, findOne, insert, remove, update } from '../core/queries/ingredients';
import { isDatabaseError, isUUID } from '../utils';
import mangledName from '../core/mangledName';
import { UUID } from 'crypto';

export const typeDef = `#graphql
  type Ingredient {
    id: ID!
    name: String!
    abv: Float
  }

  type Query {
    ingredients: [Ingredient!]!
    ingredient(id: ID!): Ingredient
  }
  
  input CreateIngredientInput {
    name: String!
    abv: Float
  }
  input EditIngredientInput {
    name: String
    abv: Float
  }

  type Mutation {
    createIngredient(input: CreateIngredientInput!): Ingredient!
    editIngredient(id: ID!, input: EditIngredientInput!): Ingredient!
    deleteIngredient(id: ID!): ID!
  }
`;

export const resolvers = {
  Query: {
    ingredients: () => findAll(),

    ingredient: async (_: any, { id }: { id: string }) => {
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

  Mutation: {
    createIngredient: async (_: any, { input }: { input: CreateIngredientInput }) => {
      try {
        return await insert({
          ...input,
          mangledName: mangledName(input.name),
        });
      } catch (err) {
        if (isDatabaseError(err)) {
          handleDatabaseError(err, 'inserting');
        }
      }
    },

    editIngredient: async (_: any, { id, input }: { id: UUID; input: EditIngredientInput }) => {
      if (Object.keys(input).length == 0) {
        throw new GraphQLError('At least one field required!', {
          extensions: { code: ErrorCode.BAD_USER_INPUT },
        });
      }
      try {
        const dbUpdate = {
          ...input,
          mangledName: input.name ? mangledName(input.name) : undefined,
        };
        return await update(id, dbUpdate);
      } catch (err) {
        if (isDatabaseError(err)) {
          handleDatabaseError(err, 'updating');
        }
      }
    },

    deleteIngredient: async (_: any, { id }: { id: UUID }) => {
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

function handleDatabaseError(err: DatabaseError, action: string) {
  switch (err.code) {
    case '23505':
      throw new GraphQLError('ingredient already exists!', {
        extensions: { code: ErrorCode.BAD_USER_INPUT },
      });
    default:
      throw new GraphQLError(`Unexpected error ${action} ingredient`);
  }
}
