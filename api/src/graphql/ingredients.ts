import { GraphQLError } from 'graphql';
import { ApolloServerErrorCode as ErrorCode } from '@apollo/server/errors';

import { findAll, findOne, insert } from '../core/ingredients';
import { isDatabaseError, isUUID } from '../utils';

export const typeDef = `#graphql
    type Ingredient {
        id: ID!
        name: String!
        abv: Float!
    }
    input IngredientInput {
        name: String!
        abv: Float
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
    createIngredient: async (_: any, { ingredient }: { ingredient: IngredientInput }) => {
      try {
        return await insert({ ...ingredient, name: ingredient.name.toLowerCase() });
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
