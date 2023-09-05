import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import dotenv from 'dotenv';
import { schema } from './graphql';

const server = new ApolloServer({ schema });

async function run() {
  dotenv.config();

  const { url } = await startStandaloneServer(server, {
    listen: { port: 3000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
}

run().catch(err => {
  console.log(err);
  process.exitCode = 1;
});
