import { gql } from "@apollo/client";

import { ApolloClient, useApolloClient } from "services/apollo";
import { useFirebaseLogin, useFirebaseLogout } from "services/firebase";

import { AuthViewerQuery, AuthViewerQuery_viewer } from "schema";
import { CreateUserInput, UpdateUserInput } from "schema";

const AUTH_VIEWER_QUERY = gql`
  query AuthViewerQuery {
    viewer {
      id
    }
  }
`;

const getViewer = async (
  client: ApolloClient,
): Promise<AuthViewerQuery_viewer | null> => {
  const { data } = await client.query<AuthViewerQuery>({
    query: AUTH_VIEWER_QUERY,
    fetchPolicy: "network-only",
  });
  return data.viewer;
};

const CREATE_USER_ACCOUNT_UTATION = gql`
  mutation CreateUserAccountMutation($input: CreateUserInput!) {
    createUser(input: $input) {
      user {
        id
        slug
        firstName
        lastName
        about
        imageUrl
        email
        phone
        isAdmin
        isEmailVerified
        isPhoneVerified
      }
    }
  }
`;

const createUserAccount = async (
  client: ApolloClient,
  input: CreateUserInput,
): Promise<void> => {
  await client.mutate({
    mutation: CREATE_USER_ACCOUNT_UTATION,
    variables: { input },
  });
};

const UPDATE_USER_ACCOUNT_MUTATION = gql`
  mutation UpdateUserAccountMutation($input: UpdateUserInput!) {
    updateUser(input: $input) {
      user {
        id
        slug
        firstName
        lastName
        about
        imageUrl
        email
        phone
        isAdmin
        isEmailVerified
        isPhoneVerified
      }
    }
  }
`;

const updateUserAccount = async (
  client: ApolloClient,
  input: UpdateUserInput,
): Promise<void> => {
  await client.mutate({
    mutation: UPDATE_USER_ACCOUNT_MUTATION,
    variables: { input },
  });
};

export const useLogin = (): (() => Promise<void>) | null => {
  const client = useApolloClient();
  const login = useFirebaseLogin();
  return login
    ? async () => {
        const { additionalUserInfo } = await login();
        if (!additionalUserInfo) {
          throw new Error("Missing profile info from provider.");
        }
        const viewer = await getViewer(client);

        const {
          given_name: firstName,
          family_name: lastName,
          picture: imageUrl,
        } = additionalUserInfo.profile as {
          given_name: string;
          family_name: string;
          picture: string;
        };
        const params = {
          firstName,
          lastName,
          imageUrl,
        };
        if (viewer) {
          await updateUserAccount(client, params);
        } else {
          await createUserAccount(client, params);
        }

        await client.resetStore();
      }
    : null;
};

export const useLogout = (): (() => Promise<void>) | null => {
  const client = useApolloClient();
  const logout = useFirebaseLogout();
  return logout
    ? async () => {
        await logout();
        await client.resetStore();
      }
    : null;
};
