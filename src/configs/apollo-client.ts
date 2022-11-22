import { ApolloClient, InMemoryCache } from "@apollo/client";

const uri =
  process.env.NODE_ENV === "development"
    ? "https://api.thegraph.com/subgraphs/name/dino-bear/deertest"
    : "https://api.thegraph.com/subgraphs/name/dino-bear/deer";
const client = new ApolloClient({
  uri: uri,
  cache: new InMemoryCache({
    resultCaching: false,
  }),
});

export default client;
