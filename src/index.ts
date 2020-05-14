import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';

import { TransactionResolver } from './resolvers/TransactionResolver';
import { UserResolver } from './resolvers/UserResolver';

async function start() {
  await createConnection();
  const schema = await buildSchema({
    resolvers: [TransactionResolver, UserResolver],
    dateScalarMode: 'isoDate',
    emitSchemaFile: 'src/schema/index.gql',
  });
  const server = new ApolloServer({ schema });
  await server.listen(4000);
}

start();
