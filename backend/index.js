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

dotenv.config();
console.log("uri", process.env.MONGO_URI);
const __dirname = path.resolve();
const app = express();
const httpServer = http.createServer(app);


// Sample type definitions and resolvers
const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
  }

  type Query {
    hello: String
    getUser(id: ID!): User
    listUsers: [User]
  }
`;

const users = [
  { id: "1", username: "Alice", email: "alice@example.com" },
  { id: "2", username: "Bob", email: "bob@example.com" },
];

const resolvers = {
  Query: {
    hello: () => 'Hello, world!',
    getUser: (_, { id }) => users.find(user => user.id === id),
    listUsers: () => users,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

// Ensure we wait for our server to start
await server.start();

// Set up our Express middleware to handle CORS, body parsing, and our expressMiddleware function.
app.use(
  "/graphql",
  cors({
    origin: "http://localhost:3000",
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

// Static file serving for frontend (uncomment when ready)
// app.use(express.static(path.join(__dirname, "frontend/dist")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "frontend/dist", "index.html"));
// });

// Modified server startup
await httpServer.listen({ port: 4000 });
await connectDB();

console.log(`🚀 Server ready at http://localhost:4000/graphql`);
