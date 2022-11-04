/**
 *  Hook to read data from the backend
 */

import { useNear } from "../contexts/Near";

export const useVerify = () => {
  const { connection, contracts } = useNear();

  return {
    // utils
    store_id_exists: async (store_id: string) => {
      const account_id = `${store_id}.${contracts?.store_factory.contractId}`;

      console.error(
        "TODO: implement an actual verification at hooks/useVerify.ts:store_id_exists"
      );

      // TODO: implement actual verification
      // 50 50 chance of returning true or false
      return false;
    },
  };
};
