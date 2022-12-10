import { ApolloClient, InMemoryCache } from "@apollo/client";

const uri = process.env.NEXT_PUBLIC_DEER_GRAPH_URI || "https://api.thegraph.com/subgraphs/name/dino-bear/deer";

const client = new ApolloClient({
  uri: uri,
  cache: new InMemoryCache({
    resultCaching: false,
  }),
});

export const TheGraphURI =
  uri.split("/name/")?.length > 1
    ? "https://thegraph.com/hosted-service/subgraph" +
      uri.split("/name/")[1] +
      "?selected=logs"
    : uri;

export default client;
