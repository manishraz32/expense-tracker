import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { gql } from 'graphql-tag'; // Import gql

import { connectDB } from "./db/connectDB.js";
import mergedResolvers from "./resolvers/index.js";
import mergedTypeDefs from "./typeDefs/index.js";

dotenv.config();
const __dirname = path.resolve();
const app = express();
const httpServer = http.createServer(app);


const server = new ApolloServer({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

// Ensure we wait for our server to start
await server.start();

// Set up our Express middleware to handle CORS, body parsing, and our expressMiddleware function.
app.use(
  "/graphql",
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  }),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req, res }) => ({ /* Add context here later */ }),
  })
);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});



// Modified server startup
await httpServer.listen({ port: 4000 });
await connectDB();

console.log(`🚀 Server ready at http://localhost:4000/graphql`);
