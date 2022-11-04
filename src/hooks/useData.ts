/**
 *  Hook to read data from the backend
 */

import { Account, Contract } from "near-api-js";
import { store } from "../configs/contracts";
import { useNear } from "../contexts/Near";

export const useData = () => {
  const { wallet, contracts, connection } = useNear();

  return {
    // common
    get_account_id: async () => await wallet?.getAccountId(),
    is_signed: async () => await wallet?.isSignedIn(),

    // store factory
    get_stores_by_creator: async (creator_id: string) => {
      return await contracts?.store_factory.get_stores_by_creator({
        creator_id,
      });
    },

    // store
    get_store_metadata: async (store_id: string) => {
      if (!connection) return null;
      const c: any = new Contract(
        await connection?.account(null!)!,
        store_id,
        store.contractMethods
      );
      return await c.store_metadata();
    },

    get_store_items: async (store_id: string) => {
      if (!connection) return null;
      const c: any = new Contract(
        await connection?.account(null!)!,
        store_id,
        store.contractMethods
      );
      return await c.get_items();
    },

    // items
    get_item: async (store_id: string, item_id: string) => {
      if (!connection) return null;
      const c: any = new Contract(
        await connection?.account(null!)!,
        store_id,
        store.contractMethods
      );
      return await c.get_item({ item_id: item_id });
    },
  };
};
