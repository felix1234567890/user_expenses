import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { dataSource } from "../data-source";

import { TransactionResolver } from './resolvers/TransactionResolver';
import { UserResolver } from './resolvers/UserResolver';

async function start() {
  await dataSource.initialize();
  const schema = await buildSchema({
    resolvers: [TransactionResolver, UserResolver],
    dateScalarMode: 'isoDate',
    emitSchemaFile: 'src/schema/index.gql',
  });
  const server = new ApolloServer({ schema });
  await server.listen(4000);
}

start();
