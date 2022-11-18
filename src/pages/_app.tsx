import "../styles/globals.css";
import "../assets/font/stylesheet.css";
import "@near-wallet-selector/modal-ui/styles.css";
import type { AppProps } from "next/app";

import { ThemeProvider } from "theme-ui";
import theme from "../../theme";
import { WalletSelectorContextProvider } from "../contexts/WalletSelector";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // @ts-ignore
    <ThemeProvider theme={theme}>
      <WalletSelectorContextProvider>
        <Component {...pageProps} />
      </WalletSelectorContextProvider>
    </ThemeProvider>
  );
}

export default MyApp;
