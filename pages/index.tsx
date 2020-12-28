import React, { FC } from "react";
import { gql, useQuery } from "@apollo/client";

import { Container } from "@chakra-ui/react";

import { Layout } from "components/layout";
import { ShelterList, SHELTER_LIST_FRAGMENTS } from "components/shelter-list";

import { HomeQuery } from "schema";

export const HOME_QUERY = gql`
  query HomeQuery {
    viewer {
      ...ShelterList_viewer
    }
    shelters(limit: 50) {
      ...ShelterList_shelter
    }
  }

  ${SHELTER_LIST_FRAGMENTS}
`;

const Home: FC = () => {
  const { data, loading, refetch } = useQuery<HomeQuery>(HOME_QUERY);
  const { viewer, shelters } = data ?? {};
  return (
    <Layout>
      <Container my={4}>
        <ShelterList {...{ viewer, shelters, loading, refetch }} />
      </Container>
    </Layout>
  );
};

export default Home;
