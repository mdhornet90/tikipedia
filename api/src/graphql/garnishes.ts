import { GraphQLError } from 'graphql';
import { ApolloServerErrorCode as ErrorCode } from '@apollo/server/errors';

import { findAll, findOne, insert, remove, update } from '../core/queries/garnishes';
import { isDatabaseError, isUUID } from '../utils';
import { UUID } from 'crypto';
import { mangledName } from '../core/mangledName';

export const typeDef = `#graphql
    type Garnish {
        id: ID!
        name: String!
    }

    type Query {
      garnishes: [Garnish!]!
      garnish(id: ID!): Garnish
    }

    input CreateGarnishInput {
        name: String!
    }
    input EditGarnishInput {
      name: String!
    }
    type Mutation {
      createGarnish(input: CreateGarnishInput!): Garnish!
      editGarnish(id: ID!, input: EditGarnishInput!): Garnish!
      deleteGarnish(id: ID!): ID!
    }
`;

export const resolvers = {
  Query: {
    garnishes: () => findAll(),

    garnish: async (_: any, { id }: { id: string }) => {
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
    createGarnish: async (_: any, { input }: { input: Garnish.API.Create }) => {
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

    editGarnish: async (_: any, { id, input }: { id: UUID; input: Garnish.API.Edit }) => {
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

    deleteGarnish: async (_: any, { id }: { id: UUID }) => {
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
      throw new GraphQLError('garnish already exists!', {
        extensions: { code: ErrorCode.BAD_USER_INPUT },
      });
    default:
      throw new GraphQLError(`Unexpected error ${action} garnish`);
  }
}
