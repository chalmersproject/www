import React, { FC, useMemo } from "react";
import { gql, useQuery } from "@apollo/client";

import { Layout } from "components/layout";

import { Box, Container, Skeleton, VStack } from "@chakra-ui/react";
import { Text, Code } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

import { useFirebaseToken, useFirebaseUser } from "services/firebase";
import { useLogin, useLogout } from "services/auth";

import { HomeViewerCard } from "./__generated__/HomeViewerCard";

const Home: FC = () => {
  const token = useFirebaseToken();
  const login = useLogin();
  const logout = useLogout();
  return (
    <Layout>
      <Container my={12}>
        <Text fontSize="xl" fontWeight="semibold">
          Brand new whip, what's poppin?
        </Text>
        <Box my={2}>
          {token ? (
            <>
              <Text fontSize="md" fontWeight="medium">
                Auth Token
              </Text>
              <Code display="block" overflowWrap="break-word">
                {token ?? "null"}
              </Code>
              <Button onClick={logout!} disabled={!logout} mt={2}>
                Sign Out
              </Button>
            </>
          ) : (
            <Button
              onClick={async () => {
                const credentials = await login!();
                console.log({ credentials });
              }}
              disabled={!login}
            >
              Sign In
            </Button>
          )}
        </Box>
        <ViewerCard />
      </Container>
    </Layout>
  );
};

const ViewerCard: FC = ({}) => {
  const user = useFirebaseUser();
  const { data, loading } = useQuery<HomeViewerCard>(
    gql`
      query HomeViewerCard {
        viewer {
          id
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
    `,
    {
      skip: !user,
    },
  );
  return (
    <Box>
      {!loading ? (
        <Code as="pre">
          {data ? JSON.stringify(data.viewer, undefined, 2) : "null"}
        </Code>
      ) : (
        <Skeleton h={20} />
      )}
    </Box>
  );
};

export default Home;
