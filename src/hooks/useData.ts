/**
 *  Hook to read data from the backend
 */

import { providers } from "near-api-js";
import { useCallback, useEffect, useState } from "react";
import { contractsConfig } from "../configs/contracts";
import { useWalletSelector } from "../contexts/WalletSelector";
import type { CodeResult } from "near-api-js/lib/providers/provider";

export const useData = () => {
  const { selector, account } = useWalletSelector();

  /** Helpers */
  const functionView = async ({
    contractId,
    methodName,
    args = {},
  }: {
    contractId: string;
    methodName: string;
    args?: any;
  }) => {
    const { network } = selector.options;
    const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });

    return provider
      .query<CodeResult>({
        request_type: "call_function",
        account_id: contractId,
        method_name: methodName,
        args_base64: Buffer.from(JSON.stringify(args)).toString("base64"),
        finality: "optimistic",
      })
      .then((res) => {
        let buffer = Buffer.from(res.result).toString();
        if (buffer === "") {
          return null;
        }
        return JSON.parse(buffer);
      });
  };

  const viewAccount = async (accountId: string) => {
    const { network } = selector.options;
    const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });

    return provider
      .query<CodeResult>({
        request_type: "view_account",
        account_id: accountId,
        finality: "final",
      })
      .then((data) => ({
        ...data,
        account_id: accountId,
      }));
  };

  const getTx = async (txHash: string) => {
    const { network } = selector.options;
    const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });
    console.log(txHash);

    return provider.txStatus(txHash, contractsConfig.store_factory.contractId);
  };

  /** Return object */
  return {
    // common
    account,
    functionView,
    viewAccount,
    getTx,

    // store factory
    get_stores_by_creator: async (creator_id: string) => {
      return functionView({
        contractId: contractsConfig.store_factory.contractId,
        methodName: "get_stores_by_creator",
        args: { creator_id },
      });
    },

    // store
    get_store_metadata: async (store_id: string) => {
      return functionView({
        contractId: store_id,
        methodName: "store_metadata",
      });
    },

    get_store_owner: async (store_id: string) => {
      return functionView({
        contractId: store_id,
        methodName: "get_store_owner",
      });
    },

    get_store_items: async (store_id: string) => {
      return functionView({
        contractId: store_id,
        methodName: "get_items",
      });
    },

    // items
    get_item: async (store_id: string, item_id: string) => {
      return functionView({
        contractId: store_id,
        methodName: "get_item",
        args: { item_id },
      });
    },

    // orders
    get_order: async (store_id: string, order_id: string) => {
      return functionView({
        contractId: store_id,
        methodName: "get_order",
        args: { order_id },
      });
    },

    // disputes
    get_disputes: async ({
      page,
      limit,
      openOnly,
    }: {
      page?: number;
      limit?: number;
      openOnly?: boolean;
    }) => {
      return functionView({
        contractId: contractsConfig.dispute.contractId,
        methodName: "get_disputes",
        args: {
          from_index: page != undefined ? page * (limit || 50) : undefined,
          limit: page != undefined ? limit || 50 : undefined,
          status: openOnly ? "Voting" : undefined,
        },
      });
    },
    get_dispute: async (dispute_id: string) => {
      return functionView({
        contractId: contractsConfig.dispute.contractId,
        methodName: "get_dispute",
        args: { dispute_id: Number(dispute_id) },
      });
    },
    get_evidence: async (dispute_id: string) => {
      return functionView({
        contractId: contractsConfig.dispute.contractId,
        methodName: "get_evidence",
        args: { dispute_id: Number(dispute_id) },
      });
    },
    get_votes: async (dispute_id: string) => {
      return functionView({
        contractId: contractsConfig.dispute.contractId,
        methodName: "get_votes",
        args: { dispute_id: Number(dispute_id) },
      });
    },
    can_vote: async (account_id: string) => {
      if (account_id == "") return false;

      try {
        await functionView({
          contractId: contractsConfig.dispute.contractId,
          methodName: "assert_whitelisted",
          args: { account_id },
        });
        return true;
      } catch (error) {
        // console.log(error);
        return false;
      }
    },
  };
};
