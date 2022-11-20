/**
 *  Hook to interact with the backend
 */

import { utils } from "near-api-js";
import { contractsConfig } from "../configs/contracts";
import { useWalletSelector } from "../contexts/WalletSelector";

export const useAction = () => {
  const { selector, modal, accountId } = useWalletSelector();

  const functionCall = async ({
    contractId,
    methodName,
    args,
    gas,
    amount,
  }: {
    contractId: string;
    methodName: string;
    args: any;
    gas?: string;
    amount?: string;
  }) => {
    const wallet = await selector.wallet();
    return wallet
      .signAndSendTransaction({
        signerId: accountId!,
        receiverId: contractId,
        actions: [
          {
            type: "FunctionCall",
            params: {
              methodName: methodName,
              args: args,
              gas: gas || "300000000000000",
              deposit: amount || "0",
            },
          },
        ],
      })
      .catch((err) => {
        // alert("Failed to send transaction: " + err);
        console.log("Failed to send transaction: " + err);
        throw err;
      });
  };

  return {
    // common
    login: async () => modal.show(),
    logout: async () => {
      const wallet = await selector.wallet();
      wallet
        .signOut()
        .then(() => {
          localStorage.clear();
          window.location.href = "/";
        })
        .catch((err) => {
          console.log("Failed to sign out");
          console.error(err);
        });
    },

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
        owner_id: accountId!.toLowerCase(),
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

      return functionCall({
        contractId: contractsConfig.store_factory.contractId,
        methodName: "create",
        args: { name: id.toLowerCase(), args: argsBase64 },
        amount: "3000000000000000000000000",
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

      return functionCall({
        contractId: store_id,
        methodName: "update_store_metadata",
        args,
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

      return functionCall({
        contractId: store_id,
        methodName: "item_create",
        args,
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

      return functionCall({
        contractId: store_id,
        methodName: "item_update",
        args,
      });
    },

    item_delete: async (store_id: string, item_id: string) => {
      const args = {
        item_id: item_id,
      };

      return functionCall({
        contractId: store_id,
        methodName: "item_delete",
        args,
      });
    },

    // orders
    item_buy: async (store_id: string, item_id: string, amount: string) => {
      const args = {
        item_id: item_id,
      };
      let storage_estimate_cost = BigInt(10_000_000_000_000_000_000_000);
      return functionCall({
        contractId: store_id,
        methodName: "item_buy",
        args,
        amount: (BigInt(amount) + storage_estimate_cost).toString(),
      });
    },

    order_cancel: async (store_id: string, order_id: string) => {
      const args = {
        order_id: order_id,
      };

      return functionCall({
        contractId: store_id,
        methodName: "order_cancel",
        args,
      });
    },

    order_complete: async (store_id: string, order_id: string) => {
      const args = {
        order_id: order_id,
      };

      return functionCall({
        contractId: store_id,
        methodName: "order_complete",
        args,
      });
    },

    order_shipped: async (store_id: string, order_id: string) => {
      const args = {
        order_id: order_id,
      };

      return functionCall({
        contractId: store_id,
        methodName: "order_shipped",
        args,
      });
    },

    // disputes
    dispute_create: async (
      store_id: string,
      order_id: string,
      description: string
    ) => {
      const args = {
        order_id: order_id,
        description: description,
      };

      return functionCall({
        contractId: store_id,
        methodName: "start_dispute",
        args,
      });
    },
    add_evidence: async (
      dispute_id: string,
      description: string,
      link: string
    ) => {
      const args = {
        dispute_id: Number(dispute_id),
        description: description,
        link: link,
      };

      return functionCall({
        contractId: contractsConfig.dispute.contractId,
        methodName: "add_evidence",
        args,
      });
    },
    vote: async (dispute_id: string, vote: "Seller" | "Buyer" | "Draw") => {
      const args = {
        dispute_id: Number(dispute_id),
        vote_type: vote,
      };

      return functionCall({
        contractId: contractsConfig.dispute.contractId,
        methodName: "vote",
        args,
      });
    },
    whitelist_me: async (accountId: string) => {
      const args = {
        account_id: accountId,
      };

      return functionCall({
        contractId: contractsConfig.dispute.contractId,
        methodName: "whitelist",
        args,
      });
    },
  };
};
