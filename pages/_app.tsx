import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { SWRConfig } from "swr";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <SWRConfig
        value={{ refreshInterval: 10 * 1000, focusThrottleInterval: 10000 }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    </ThemeProvider>
  );
}

export default MyApp;
