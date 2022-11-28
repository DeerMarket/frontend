import { providers } from "near-api-js";
import { CodeResult } from "near-api-js/lib/providers/provider";
import { connectionConfig } from "../configs/wallet";

export const callViewMethod = async ({
  contractId,
  methodName,
  args = {},
}: {
  contractId: string;
  methodName: string;
  args?: any;
}) => {
  const provider = new providers.JsonRpcProvider({
    url: connectionConfig.nodeUrl,
  });

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

export const getBlocks = async () => {
  const provider = new providers.JsonRpcProvider({
    url: connectionConfig.nodeUrl,
  });

  // "jsonrpc": "2.0",
  // "id": "dontcare",
  // "method": "block",
  // "params": {
  //   "finality": "final"
  // }
  return provider
  .block({finality: "final"})
    .then((res) => {
      return res;
    });
};
