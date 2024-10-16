import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";


const client = new ApolloClient({
  // TODO => Update the uri on production
  uri: import.meta.env.VITE_NODE_ENV === "development" ? "http://localhost:4000/graphql" : "/graphql", 
  cache: new InMemoryCache(), // Apollo Client uses to cache query results after fetching them.
  credentials: "include", // This tells Apollo Client to send cookies along with every request to the server.
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </BrowserRouter>
  </StrictMode>,
)
