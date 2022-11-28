import "../styles/globals.css";
import "../assets/font/stylesheet.css";
import "@near-wallet-selector/modal-ui/styles.css";
import type { AppProps } from "next/app";

import { ThemeProvider } from "theme-ui";
import theme from "../../theme";
import { WalletSelectorContextProvider } from "../contexts/WalletSelector";

import "nprogress/nprogress.css";

import NProgress from "nprogress";
import Router from "next/router";
import { useEffect, useState } from "react";
import client, { TheGraphURI } from "../configs/apollo-client";
import { gql } from "@apollo/client";
import { getBlocks } from "../helpers/near";

function MyApp({ Component, pageProps }: AppProps) {
  const [statusErrors, setStatusErrors] = useState<any>({
    graph: false,
    near: false,
  });

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

  useEffect(() => {
    async function graph_status() {
      const graphmeta = await client.query({
        query: gql`
          query meta {
            _meta {
              block {
                hash
                timestamp
                number
              }
              deployment
              hasIndexingErrors
            }
          }
        `,
      });
      const nearmeta = await getBlocks();

      let lastGraphBlock = graphmeta.data._meta.block.number;
      let lastNearBlock = nearmeta.header.height;

      if (lastGraphBlock < lastNearBlock - 1000) {
        setStatusErrors({
          graph: (
            <a
              href={TheGraphURI}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: "inherit",
                textDecoration: "none",
              }}
            >
              The Graph indexer is stuck at block {lastGraphBlock}. Data may be
              outdated until it catches up.
            </a>
          ),
          near: false,
        });
      }
    }
    graph_status();
  }, []);

  return (
    // @ts-ignore
    <ThemeProvider theme={theme}>
      <WalletSelectorContextProvider>
        <Component {...pageProps} statusErrors={statusErrors} />
      </WalletSelectorContextProvider>
    </ThemeProvider>
  );
}

export default MyApp;
