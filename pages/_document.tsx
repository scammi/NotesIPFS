import { Html, Head, Main, NextScript } from "next/document";
import AppHeader from "../components/Header";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>IPFS Notes</title>
        <meta name="description" content="IPFS Notes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <AppHeader />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
