import React, { FC } from "react";
import { AppProps } from "next/app";

import { FirebaseProvider } from "services/firebase";
import { ApolloProvider } from "services/apollo";
import { ChakraProvider } from "services/chakra";

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <FirebaseProvider>
    <ApolloProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  </FirebaseProvider>
);

export default App;
