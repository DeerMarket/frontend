/**
 *  Hook to interact with the backend
 */

import { Contract, utils } from "near-api-js";
import { contractsConfig } from "../configs/contracts";
import { ContractType, useNear } from "../contexts/Near";

export const useAction = () => {
  const { wallet, contracts } = useNear();

  return {
    // common
    login: async () =>
      await wallet?.requestSignIn({
        contractId: contracts?.store_factory.contractId,
      }),
    logout: async () => await wallet?.signOut(),

    // store factory
    create_store: async ({
      id,
      name,
      category,
      description,
      logo,
      cover,
      website,
      email,
      phone,
      terms,
      tags,
    }: {
      id: string;
      name: string;
      category: string | number;
      description?: string;
      logo?: string;
      cover?: string;
      website?: string;
      email?: string;
      phone?: string;
      terms?: string;
      tags?: string[];
    }) => {
      const args = {
        owner_id: await wallet?.getAccountId(),
        arbiter_id: contracts?.store_factory.contractId,
        metadata: {
          name,
          category: parseInt(category as string),
          description,
          logo,
          cover,
          website,
          email,
          phone,
          terms,
          tags,
        },
      };
      const argsBase64 = Buffer.from(JSON.stringify(args)).toString("base64");
      await contracts?.store_factory.create({
        callbackUrl: contractsConfig.store_factory.callbackUrl,
        args: {
          name: id,
          args: argsBase64,
        },
        gas: "300000000000000",
        amount: "2500000000000000000000000",
      });
    },
    delete_store: async (store_id: string) => {
      alert("Not implemented yet");
    },

    // store
    update_store_metadata: async (
      store_id: string,
      metadata: {
        name?: string;
        category?: string | number;
        description?: string;
        logo?: string;
        cover?: string;
        website?: string;
        email?: string;
        phone?: string;
        terms?: string;
        tags?: string[];
      }
    ) => {
      const args = {
        metadata: {
          ...metadata,
          category: parseInt(metadata.category as string),
        },
      };
      const store: ContractType = new Contract(
        wallet!.account(),
        store_id,
        contractsConfig.store.contractMethods
      );
      await store.update_store_metadata({
        callbackUrl: contractsConfig.store_factory.callbackUrl,
        args: args,
        gas: "300000000000000",
      });
    },

    // items
    item_create: async ({
      store_id,
      price,
      title,
      description,
      images,
      tags,
    }: {
      store_id: string;
      price: number;
      title: string;
      description?: string;
      images?: string[];
      tags?: string[];
    }) => {
      const args = {
        price: utils.format.parseNearAmount(price.toString()),
        metadata: {
          title,
          description,
          images,
          tags,
        },
      };

      const c = initStoreContract(wallet, store_id);
      await c.item_create({
        callbackUrl: contractsConfig.store_factory.callbackUrl,
        args: args,
        gas: "300000000000000",
      });
    },

    item_update: async (
      store_id: string,
      {
        item_id,
        price,
        title,
        description,
        images,
        tags,
      }: {
        item_id: string;
        price: number;
        title: string;
        description?: string;
        images?: string[];
        tags?: string[];
      }
    ) => {
      const args = {
        item_id: item_id,
        price: utils.format.parseNearAmount(price.toString()),
        metadata: {
          title,
          description,
          images,
          tags,
        },
      };

      const c = initStoreContract(wallet, store_id);
      await c.item_update({
        callbackUrl: contractsConfig.store_factory.callbackUrl,
        args: args,
        gas: "300000000000000",
      });
    },

    item_delete: async (store_id: string, item_id: string) => {
      const c = initStoreContract(wallet, store_id);
      await c.item_delete({
        callbackUrl: contractsConfig.store_factory.callbackUrl,
        args: {
          item_id: item_id,
        },
        gas: "300000000000000",
      });
    },

    // orders
    item_buy: async (store_id: string, item_id: string, amount: string) => {
      const c = initStoreContract(wallet, store_id);
      await c.item_buy({
        callbackUrl: contractsConfig.store_factory.callbackUrl,
        args: {
          item_id: item_id,
        },
        gas: "300000000000000",
        amount: amount,
      });
    },
  };
};

// Helper function to get the contract instance
function initStoreContract(wallet: any, contractId: string): ContractType {
  return new Contract(wallet.account(), contractId, {
    ...contractsConfig.store.contractMethods,
  });
}
