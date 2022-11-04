import React from "react";

import * as nearAPI from "near-api-js";
import { connectionConfig } from "../configs/wallet";
import { contractsConfig } from "../configs/contracts";

const { connect, Contract } = nearAPI;

const NearContext = React.createContext<{
  wallet: nearAPI.WalletConnection | undefined;
  contracts: ContractsType | undefined;
  connection: nearAPI.Near | undefined;
}>(
  {} as {
    wallet: nearAPI.WalletConnection | undefined;
    contracts: ContractsType | undefined;
    connection: nearAPI.Near | undefined;
  }
);

const NearProvider = ({ children }: any) => {
  const [wallet, setWallet] = React.useState<
    nearAPI.WalletConnection | undefined
  >(undefined);
  const [contracts, setContracts] = React.useState<any>(undefined);
  const [connection, setConnection] = React.useState<nearAPI.Near | undefined>(
    undefined
  );

  React.useEffect(() => {
    async function init() {
      // create NEAR connection
      const near = await connect(connectionConfig);
      setConnection(near);

      // create wallet connection
      const wallet = new nearAPI.WalletConnection(near, "dj-app");
      setWallet(wallet);

      // create contracts instance
      const contracts = init_contracts(wallet);
      setContracts(contracts);
    }
    init();
  }, []);

  return (
    <NearContext.Provider
      value={{
        wallet,
        contracts,
        connection,
      }}
    >
      {children}
    </NearContext.Provider>
  );
};

// types
export interface ContractType extends nearAPI.Contract {
  [key: string]: any;
}
interface ContractsType {
  [contract_id: string]: ContractType;
}

// helper functions
function init_contracts(wallet: nearAPI.WalletConnection): ContractsType {
  const contracts: ContractsType = {};
  const store_factory_config = contractsConfig.store_factory;

  contracts[store_factory_config.contractName] = new Contract(
    wallet.account(),
    store_factory_config.contractId,
    store_factory_config.contractMethods
  );

  return contracts;
}

// custom hooks
function useNear() {
  const context = React.useContext(NearContext);

  if (context === undefined) {
    throw new Error("useNear must be used within a NearProvider");
  }

  return context;
}

export { NearProvider, useNear };
