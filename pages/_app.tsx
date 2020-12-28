import React, { FC } from "react";
import { AppProps } from "next/app";

import { FirebaseProvider } from "services/firebase";
import { ApolloProvider } from "services/apollo";
import { ChakraProvider } from "services/chakra";

import { ResetApolloStoreHandler } from "services/apollo";

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <FirebaseProvider>
      <ApolloProvider>
        <ChakraProvider>
          <ResetApolloStoreHandler>
            <Component {...pageProps} />
          </ResetApolloStoreHandler>
        </ChakraProvider>
      </ApolloProvider>
    </FirebaseProvider>
  );
};

export default App;
