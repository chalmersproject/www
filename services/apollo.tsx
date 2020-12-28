import React, { FC, useMemo } from "react";
import firebase from "firebase/app";

import {
  ApolloClient as Client,
  useApolloClient as useClient,
} from "@apollo/client";
import { ApolloProvider as Provider } from "@apollo/client";
import { HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { InMemoryCache, NormalizedCacheObject } from "@apollo/client";

/**
 * Get the ID token for the currently authenticated Firebase user.
 */
const getToken = async (): Promise<string | undefined> => {
  try {
    const { currentUser } = firebase.app().auth();
    if (currentUser) {
      return await currentUser.getIdToken();
    }
  } catch (error) {
    if (error.code !== "app/no-app") {
      throw error;
    }
  }
};

/**
 * Create an Apollo Client that can send both authenticated and anonymous
 * requests to our GraphQL API.
 */
const createClient = (): Client<NormalizedCacheObject> => {
  const httpLink = new HttpLink({ uri: "/api/graphql" });
  const authLink = setContext(async (_, { headers }) => {
    const token = await getToken();
    return {
      headers: {
        ...headers,
        authorization: token,
      },
    };
  });

  return new Client({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

export type ApolloClient = Client<NormalizedCacheObject>;

export const useApolloClient = useClient as () => ApolloClient;

export const ApolloProvider: FC = ({ children }) => {
  const client = useMemo(createClient, []);
  return <Provider client={client}>{children}</Provider>;
};
