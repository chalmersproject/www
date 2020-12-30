import React, { FC } from "react";
import { gql, useQuery } from "@apollo/client";

import { Container } from "@chakra-ui/react";

import { Layout } from "components/layout";
import { ShelterList, SHELTER_LIST_FRAGMENTS } from "components/shelter-list";

import { AdminQuery } from "schema";

export const ADMIN_QUERY = gql`
  query AdminQuery {
    viewer {
      ...ShelterList_viewer
    }
    shelters(limit: 50) {
      ...ShelterList_shelter
    }
  }

  ${SHELTER_LIST_FRAGMENTS}
`;

const Admin: FC = () => {
  const { data, loading: isLoading, refetch } = useQuery<AdminQuery>(
    ADMIN_QUERY,
  );
  const { viewer, shelters } = data ?? {};
  return (
    <Layout title="Admin">
      <Container my={4}>
        <ShelterList {...{ viewer, shelters, refetch, isLoading }} />
      </Container>
    </Layout>
  );
};

export default Admin;
