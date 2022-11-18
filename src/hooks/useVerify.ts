/**
 *  Hook to read data from the backend
 */

import { contractsConfig } from "../configs/contracts";
import { useData } from "./useData";

export const useVerify = () => {
  const { viewAccount } = useData();
  return {
    // utils
    store_id_exists: async (store_id: string) => {
      const account_id = `${store_id}.${contractsConfig?.store_factory.contractId}`;

      try {
        await viewAccount(account_id);
        return true;
      } catch (err) {
        return false;
      }
    },
  };
};
