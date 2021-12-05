import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api.cybertino.io/connect/",
  cache: new InMemoryCache(),
});

export default client;
