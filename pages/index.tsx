import React, { FC } from "react";
import NextLink from "next/link";

import { Box, Container } from "@chakra-ui/react";
import { Text, Link } from "@chakra-ui/react";

import { Layout } from "components/layout";

const Home: FC = () => {
  return (
    <Layout>
      <Container my={4}>
        <Text fontWeight="medium" fontSize="lg">
          This page is under construction. 👷‍♀️
        </Text>
        <Box my={2}>
          <Text>
            If you&apos;re an admin, head on over to the{" "}
            <NextLink href="/admin" passHref>
              <Link color="pink.500">admin panel</Link>
            </NextLink>
            .
          </Text>
        </Box>
      </Container>
    </Layout>
  );
};

export default Home;
