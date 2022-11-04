/**
 *  Hook to read data from the graph indexer
 */

import { gql } from "@apollo/client";
import client from "../configs/apollo-client";

export const useGraph = () => {
  return {
    get_orders_by_buyer: async (buyer_id: string) => {
      return await client.query({
        query: gql`
          query GetOrders($accountId: String!) {
            orders(buyer: $accountId) {
              id
              item {
                id
                images
                title
              }
              store {
                id
              }
              price
              status
              createdAt
              updatedAt
            }
          }
        `,
        variables: {
          accountId: buyer_id,
        },
      });
    },
  };
};
