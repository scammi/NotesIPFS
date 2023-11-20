import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Web3ContextProvider } from "../context/Web3";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Web3ContextProvider>
        <Component {...pageProps} />
      </Web3ContextProvider>
    </QueryClientProvider>
  );
}
