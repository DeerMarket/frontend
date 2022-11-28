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

export const TheGraphURI =
  process.env.NODE_ENV === "development"
    ? "https://thegraph.com/hosted-service/subgraph/dino-bear/deertest?selected=logs"
    : "https://thegraph.com/hosted-service/subgraph/dino-bear/deer?selected=logs";

export default client;
