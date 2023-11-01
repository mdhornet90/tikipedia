import { GraphQLError } from 'graphql';
import { ApolloServerErrorCode as ErrorCode } from '@apollo/server/errors';

import { findAll, findOne, insert } from '../core/queries/ingredients';
import { isDatabaseError, isUUID } from '../utils';

export const typeDef = `#graphql
  type Ingredient {
    id: ID!
    name: String!
    abv: Float
  }

  type Query {
    ingredients: [Ingredient!]!
    ingredient(id: ID): Ingredient
  }
  
  input CreateIngredientInput {
    name: String!
    abv: Float
  }

  type Mutation {
    createIngredient(input: CreateIngredientInput!): Ingredient!
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
          mangledName: input.name.toLowerCase().replace(/\s+/g, ''),
        });
      } catch (err) {
        if (isDatabaseError(err)) {
          handleDatabaseError(err, 'inserting');
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
