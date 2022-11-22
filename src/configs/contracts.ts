export const store_factory = {
  contractName: "store_factory",
  contractId: "dm5.testnet",
  contractMethods: {
    changeMethods: ["create", "update"],
    viewMethods: ["get_stores_by_creator", "get_stores"],
  },
  callbackUrl:
    typeof window !== "undefined"
      ? window.location.origin + "/dashboard/stores"
      : "",
};
export const store = {
  contractName: "store",
  contractMethods: {
    changeMethods: [
      // metadata
      "update_store_metadata",
      // items
      "item_create",
      "item_update",
      "item_delete",
      // orders
      "item_buy",
      // disputes
      "start_dispute",
    ],
    viewMethods: ["store_metadata", "get_items", "get_item", "get_order"],
  },
  callbackUrl:
    typeof window !== "undefined" ? window.location.origin + "/dashboard" : "",
};
export const dispute = {
  contractName: "dispute",
  contractId: "ddd5.testnet",
  contractMethods: {
    changeMethods: ["vote", "add_evidence"],
    viewMethods: [
      "get_disputes",
      "get_dispute",
      "get_disputes_by_account_id",
      "get_votes",
      "get_evidence",
      "assert_whitelisted",
      "whitelist",
    ],
  },
  callbackUrl:
    typeof window !== "undefined" ? window.location.origin + "/" : "",
};

export const contractsConfig = { store_factory, store, dispute };
