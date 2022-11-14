export const store_factory = {
  contractName: "store_factory",
  contractId: "dev-20221028024743-81046331272148",
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
    ],
    viewMethods: ["store_metadata", "get_items", "get_item"],
  },
  callbackUrl:
    typeof window !== "undefined" ? window.location.origin + "/dashboard" : "",
};
export const dispute = {
  contractName: "dispute",
  contractId: "dev-20221114125212-73354151692913",
  contractMethods: {
    changeMethods: ["vote", "add_evidence"],
    viewMethods: [
      "get_disputes",
      "get_dispute",
      "get_disputes_by_account_id",
      "get_votes",
      "get_evidence",
    ],
  },
  callbackUrl:
    typeof window !== "undefined" ? window.location.origin + "/" : "",
};

export const contractsConfig = { store_factory, store, dispute };
