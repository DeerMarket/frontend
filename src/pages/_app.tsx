import "../styles/globals.css";
import "../assets/font/stylesheet.css";
import "@near-wallet-selector/modal-ui/styles.css";
import type { AppProps } from "next/app";

import { ThemeProvider } from "theme-ui";
import theme from "../../theme";
import { WalletSelectorContextProvider } from "../contexts/WalletSelector";

import "nprogress/nprogress.css";

import NProgress from 'nprogress';
import Router from 'next/router';
import { useEffect } from "react";



function MyApp({ Component, pageProps }: AppProps) {
  
  useEffect(() => {
    const handleRouteStart = () => NProgress.start();
    const handleRouteDone = () => NProgress.done();

    Router.events.on("routeChangeStart", handleRouteStart);
    Router.events.on("routeChangeComplete", handleRouteDone);
    Router.events.on("routeChangeError", handleRouteDone);

    return () => {
      // Make sure to remove the event handler on unmount!
      Router.events.off("routeChangeStart", handleRouteStart);
      Router.events.off("routeChangeComplete", handleRouteDone);
      Router.events.off("routeChangeError", handleRouteDone);
    };
  }, []);

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
