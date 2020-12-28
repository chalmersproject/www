import { gql } from "@apollo/client";

import { ApolloClient, useApolloClient } from "services/apollo";
import { useFirebaseLogin, useFirebaseLogout } from "services/firebase";

import { CreateUserInput, UpdateUserInput } from "__generated__/globalTypes";
import {
  AuthGetViewer,
  AuthGetViewer_viewer,
} from "./__generated__/AuthGetViewer";

const getViewer = async (
  client: ApolloClient,
): Promise<AuthGetViewer_viewer | null> => {
  const { data } = await client.query<AuthGetViewer>({
    query: gql`
      query AuthGetViewer {
        viewer {
          id
        }
      }
    `,
  });
  return data.viewer;
};

const createUser = async (
  client: ApolloClient,
  input: CreateUserInput,
): Promise<void> => {
  await client.mutate({
    mutation: gql`
      mutation AuthCreateUser($input: CreateUserInput!) {
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
    `,
    variables: { input },
  });
};

const updateUser = async (
  client: ApolloClient,
  input: UpdateUserInput,
): Promise<void> => {
  await client.mutate({
    mutation: gql`
      mutation AuthUpdateUser($input: UpdateUserInput!) {
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
    `,
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
          updateUser(client, params);
        } else {
          createUser(client, params);
        }
      }
    : null;
};

export const useLogout = useFirebaseLogout;
