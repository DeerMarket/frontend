import "../styles/globals.css";
import "../assets/font/stylesheet.css";
import type { AppProps } from "next/app";

import { ThemeProvider } from "theme-ui";
import theme from "../../theme";
import { NearProvider } from "../contexts/Near";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // @ts-ignore
    <ThemeProvider theme={theme}>
      <NearProvider>
        <Component {...pageProps} />
      </NearProvider>
    </ThemeProvider>
  );
}

export default MyApp;
