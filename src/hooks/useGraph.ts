/**
 *  Hook to read data from the graph indexer
 */

import { gql } from "@apollo/client";
import client from "../configs/apollo-client";

export const useGraph = () => {
  return {
    search_stores: async (skip: number, first: number, query: string) => {
      return await client.query({
        query: gql`
          query stores($skip: Int!, $first: Int!, $query: String!) {
            storeSearch(skip: $skip, first: $first, text: $query) {
              id
              name
              description
              logo
              total_items
              total_orders
            }
          }
        `,
        variables: {
          skip,
          first,
          query,
        },
      });
    },

    get_orders_by_buyer: async (buyer_id: string) => {
      return await client.query({
        query: gql`
          query GetOrders($accountId: String!) {
            orders(
              where: { buyer: $accountId }
              orderBy: createdAt
              orderDirection: desc
            ) {
              id
              orderID
              item {
                id
                images
                title
              }
              store {
                id
              }
              buyer {
                id
              }
              seller {
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
    get_orders_by_seller: async (seller_id: string) => {
      return await client.query({
        query: gql`
          query GetOrders($accountId: String!) {
            orders(
              where: { seller: $accountId }
              orderBy: createdAt
              orderDirection: desc
            ) {
              id
              orderID
              item {
                id
                images
                title
              }
              store {
                id
              }
              buyer {
                id
              }
              seller {
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
          accountId: seller_id,
        },
      });
    },
    get_order_ids: async (order_id: string) => {
      return await client.query({
        query: gql`
          query GetOrder($orderId: String!) {
            order(id: $orderId) {
              orderID
              item {
                itemID
              }
              store {
                id
              }
            }
          }
        `,
        variables: {
          orderId: order_id,
        },
      });
    },

    // dashboard
    get_user_overview: async (user_id: string) => {
      return await client.query({
        query: gql`
          query GetUserOverview($accountId: String!) {
            user(id: $accountId) {
              total_sell_orders
              total_buy_orders
              total_active_sell_orders
              total_active_buy_orders
              total_stores
              total_sales
            }
          }
        `,
        variables: {
          accountId: user_id,
        },
      });
    },
  };
};
