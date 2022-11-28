import * as nearAPI from "near-api-js";

const { keyStores } = nearAPI;

let networkId = process.env.NEXT_PUBLIC_NETWORK_ID;
if (networkId != "mainnet" && networkId != "testnet") {
  networkId = "testnet";
}

let connectionConfig = {
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

if (networkId == "mainnet") {
  connectionConfig = {
    networkId: "mainnet",
    keyStore:
      typeof window !== "undefined"
        ? new keyStores.BrowserLocalStorageKeyStore()
        : new keyStores.InMemoryKeyStore(),
    nodeUrl: "https://rpc.mainnet.near.org",
    walletUrl: "https://wallet.near.org",
    helperUrl: "https://helper.mainnet.near.org",
    explorerUrl: "https://explorer.mainnet.near.org",
  };
}

export { connectionConfig };
