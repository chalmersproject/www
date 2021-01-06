import React, { FC } from "react";
import Head from "next/head";
import { AppProps } from "next/app";

import { SiteName } from "components/head";

import { FirebaseProvider } from "services/firebase";
import { ApolloProvider } from "services/apollo";
import { ChakraProvider } from "services/chakra";

import { ResetApolloStoreHandler } from "services/apollo";

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <SiteName>Chalmers Project</SiteName>
      </Head>
      <FirebaseProvider>
        <ApolloProvider>
          <ChakraProvider>
            <ResetApolloStoreHandler>
              <Component {...pageProps} />
            </ResetApolloStoreHandler>
          </ChakraProvider>
        </ApolloProvider>
      </FirebaseProvider>
    </>
  );
};

export default App;
