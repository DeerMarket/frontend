import React, { useCallback, useContext, useEffect, useState } from "react";

import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupModal } from "@near-wallet-selector/modal-ui";
import type { WalletSelector, AccountState } from "@near-wallet-selector/core";
import type { WalletSelectorModal } from "@near-wallet-selector/modal-ui";

import { setupNearWallet } from "@near-wallet-selector/near-wallet";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";
import { setupLedger } from "@near-wallet-selector/ledger";
import { setupDefaultWallets } from "@near-wallet-selector/default-wallets";
import { contractsConfig } from "../configs/contracts";
import { AccountView } from "near-api-js/lib/providers/provider";
import { providers } from "near-api-js";

declare global {
  interface Window {
    selector: WalletSelector;
    modal: WalletSelectorModal;
  }
}

type Account = AccountView & {
  account_id: string;
};

interface WalletSelectorContextValue {
  selector: WalletSelector;
  modal: WalletSelectorModal;
  accounts: Array<AccountState>;
  accountId: string | null;
  account: Account | null;
}

const WalletSelectorContext =
  React.createContext<WalletSelectorContextValue | null>(null);

export const WalletSelectorContextProvider = ({ children }: any) => {
  const [selector, setSelector] = useState<WalletSelector | null>(null);
  const [modal, setModal] = useState<WalletSelectorModal | null>(null);
  const [accounts, setAccounts] = useState<Array<AccountState>>([]);
  const [account, setAccount] = useState<Account | null>(null);

  const accountId =
    accounts.find((account) => account.active)?.accountId || null;

  const successUrl =
    (typeof window !== "undefined"
      ? window.location.hostname
      : "https://deermarket.org") + "/dashboard";
  const failureUrl =
    typeof window !== "undefined"
      ? window.location.hostname
      : "https://deermarket.org";

  const init = useCallback(async () => {
    const _selector = await setupWalletSelector({
      network: "testnet",
      // debug: true,
      modules: [
        ...(await setupDefaultWallets()),
        setupNearWallet({
          // successUrl,
          // failureUrl,
        }),
        setupMyNearWallet({
          successUrl,
          failureUrl,
        }),
        // setupSender(),
        setupLedger(),
        // setupHereWallet(),
      ],
    });
    const _modal = setupModal(_selector, {
      contractId: contractsConfig.store_factory.contractId,
    });
    const state = _selector.store.getState();
    setAccounts(state.accounts);

    window.selector = _selector;
    window.modal = _modal;

    setSelector(_selector);
    setModal(_modal);
  }, []);

  useEffect(() => {
    init().catch((err) => {
      console.error(err);
      alert("Failed to initialise wallet selector");
    });
  }, [init]);

  const getAccount = useCallback(async (): Promise<Account | null> => {
    if (!accountId) {
      return null;
    }

    const { network } = selector!.options;
    const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });

    return provider
      .query<AccountView>({
        request_type: "view_account",
        finality: "final",
        account_id: accountId,
      })
      .then((data) => ({
        ...data,
        account_id: accountId,
      }));
  }, [accountId, selector?.options]);

  useEffect(() => {
    if (!accountId) {
      return setAccount(null);
    }

    getAccount().then((nextAccount) => {
      setAccount(nextAccount);
    });
  }, [accountId, getAccount]);

  if (!selector || !modal) {
    return null;
  }

  return (
    <WalletSelectorContext.Provider
      value={{
        selector,
        modal,
        accounts,
        accountId,
        account,
      }}
    >
      {children}
    </WalletSelectorContext.Provider>
  );
};

export function useWalletSelector() {
  const context = useContext(WalletSelectorContext);

  if (!context) {
    throw new Error(
      "useWalletSelector must be used within a WalletSelectorContextProvider"
    );
  }

  return context;
}
