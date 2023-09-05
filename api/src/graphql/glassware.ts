import { GraphQLError } from 'graphql';
import { ApolloServerErrorCode as ErrorCode } from '@apollo/server/errors';

import { findAll, findOne, insert } from '../core/queries/glassware';
import { isDatabaseError, isUUID } from '../utils';

export const typeDef = `#graphql
    type Glassware {
        id: ID!
        name: String!
    }
    input GlasswareInput {
        name: String!
    }
`;

export const resolvers = {
  Query: {
    allGlassware: () => findAll(),

    glassware: async (_: any, { id }: { id: string }) => {
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
    createGlassware: async (_: any, { glassware }: { glassware: GlasswareInput }) => {
      try {
        return await insert({ ...glassware, name: glassware.name.toLowerCase() });
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
      throw new GraphQLError('glassware already exists!', {
        extensions: { code: ErrorCode.BAD_USER_INPUT },
      });
    default:
      throw new GraphQLError(`Unexpected error ${action} glassware`);
  }
}
