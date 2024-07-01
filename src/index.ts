import datasource from "./lib/datasource";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import { CountryResolver } from "./resolvers/country.resolver";
import { ContinentResolver } from "./resolvers/continent.resolver";

import express from "express";
import http from "http";
import { buildSchema } from "type-graphql";
import "reflect-metadata";

const app = express();
const httpServer = http.createServer(app);

async function main() {
  const schema = await buildSchema({
    resolvers: [ContinentResolver, CountryResolver],
    validate: false,
  });
  const server = new ApolloServer<{}>({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  app.use(
    "/",
    express.json(),
    expressMiddleware(server)
  );
  await datasource.initialize();
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4005 }, resolve)
  );
  console.log(`🚀 Server lancé sur http://localhost:4005/`);
}

main();