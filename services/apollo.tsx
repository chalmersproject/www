import React, { FC, RefObject, useEffect, useMemo, useRef } from "react";

import {
  ApolloClient as Client,
  useApolloClient as useClient,
} from "@apollo/client";

import { ApolloProvider as Provider } from "@apollo/client";
import { HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { InMemoryCache, NormalizedCacheObject } from "@apollo/client";

import { FirebaseUser, useFirebase, useFirebaseUser } from "services/firebase";

/**
 * Create an Apollo Client that can send both authenticated and anonymous
 * requests to our GraphQL API.
 */
const createClient = (
  userRef: RefObject<FirebaseUser | null>,
): Client<NormalizedCacheObject> => {
  const httpLink = new HttpLink({ uri: "/api/graphql" });
  const authLink = setContext(async (_, { headers = {} }) => {
    if (userRef.current) {
      const token = await userRef.current.getIdToken();
      headers["Authorization"] = token;
    }
    return { headers };
  });

  return new Client({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

export type ApolloClient = Client<NormalizedCacheObject>;

export const useApolloClient = useClient as () => ApolloClient;

export const ApolloProvider: FC = ({ children }) => {
  const userRef = useRef<FirebaseUser | null>(null);
  const user = useFirebaseUser();
  useEffect(() => {
    if (user !== undefined) {
      userRef.current = user;
    }
  }, [user]);
  const client = useMemo(() => createClient(userRef), []);
  return <Provider client={client}>{children}</Provider>;
};

export const useResetApolloStoreOnAuthStateChange = (): void => {
  const client = useApolloClient();
  const firebase = useFirebase();
  useEffect(() => {
    if (!firebase) return;
    return firebase.auth().onAuthStateChanged(() => client.resetStore());
  }, [firebase]);
};

export const ResetApolloStoreHandler: FC = ({ children }) => {
  useResetApolloStoreOnAuthStateChange();
  return <>{children}</>;
};
