import { GraphQLError } from 'graphql';
import { ApolloServerErrorCode as ErrorCode } from '@apollo/server/errors';

import { findAll, findOne, insert, update } from '../core/queries/glassware';
import { isDatabaseError, isUUID } from '../utils';
import { UUID } from 'crypto';
import mangledName from '../core/mangledName';

export const typeDef = `#graphql
    type Glassware {
        id: ID!
        name: String!
    }

    type Query {
      allGlassware: [Glassware!]!
      glassware(id: ID): Glassware
    }

    input CreateGlasswareInput {
        name: String!
    }
    input EditGlasswareInput {
      name: String!
    }
    type Mutation {
      createGlassware(input: CreateGlasswareInput!): Glassware!
      editGlassware(id: ID!, input: EditGlasswareInput!): Glassware!
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
    createGlassware: async (_: any, { input }: { input: CreateGlasswareInput }) => {
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

    editGlassware: async (_: any, { id, input }: { id: UUID; input: EditGlasswareInput }) => {
      try {
        return await update(id, {
          ...input,
          mangledName: mangledName(input.name),
        });
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
      throw new GraphQLError('glassware already exists!', {
        extensions: { code: ErrorCode.BAD_USER_INPUT },
      });
    default:
      throw new GraphQLError(`Unexpected error ${action} glassware`);
  }
}
