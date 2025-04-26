import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { gql } from "graphql-tag"; // Import gql
import User from "./models/user.model.js";
import { connectDB } from "./db/connectDB.js";
import mergedResolvers from "./resolvers/index.js";
import mergedTypeDefs from "./typeDefs/index.js";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

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
  cookieParser(),
  cors({
    origin: "http://localhost:4000", // Adjust your frontend's origin here
    credentials: true, // Allows cookies to be sent
  }),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req, res }) => {
      // Pass both `req` and `res` so that you can access them in resolvers
      // console.log("cookies", req.cookies);

      const token = req.cookies?.authToken;

      if (!token) {
        return { req, res, user: null };
      }

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        return { req, res, user };
      } catch (error) {
        console.log("error in context", error.message);
        return { req, res, user: null };
      }
    },
  })
);

app.use(express.static(path.join(__dirname, "frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/dist", "index.html"));
});

// Modified server startup
await httpServer.listen({ port: 4000 });
await connectDB();

console.log(`🚀 Server ready at http://localhost:4000/graphql`);
