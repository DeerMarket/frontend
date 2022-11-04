import * as nearAPI from "near-api-js";

const { keyStores } = nearAPI;

const connectionConfig = {
  networkId: "testnet",
  keyStore:
    typeof window !== "undefined"
      ? new keyStores.BrowserLocalStorageKeyStore()
      : new keyStores.InMemoryKeyStore(),
  nodeUrl: "https://rpc.testnet.near.org",
  walletUrl: "https://wallet.testnet.near.org",
  helperUrl: "https://helper.testnet.near.org",
  explorerUrl: "https://explorer.testnet.near.org",
};

export { connectionConfig };
