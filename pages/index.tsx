import React, { FC } from "react";
import { useRouter } from "next/router";
import { useFirebaseUser } from "services/firebase";
import { useQuery, gql } from "@apollo/client";

import { Container } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

import { Layout } from "components/layout";
import { HomeCrumb } from "components/shelters-crumb";
import { ShelterList } from "components/shelter-list";
import { ShelterForm } from "components/shelter-form";

import { SHELTER_LIST_FRAGMENTS } from "components/shelter-list";

import { HomeQuery } from "schema";

export const SHELTERS_QUERY = gql`
  query HomeQuery {
    viewer {
      id
      isAdmin
    }
    shelters(limit: 50) {
      ...ShelterList_shelter
    }
  }

  ${SHELTER_LIST_FRAGMENTS}
`;

const Shelters: FC = () => {
  const router = useRouter();
  const user = useFirebaseUser();

  const { data, refetch } = useQuery<HomeQuery>(SHELTERS_QUERY, {
    skip: user === undefined,
  });
  const { viewer, shelters } = data ?? {};
  const { isAdmin } = viewer ?? {};

  return (
    <Layout breadcrumbs={<HomeCrumb isCurrentPage />}>
      <Container>
        <ShelterList
          shelters={shelters}
          onItemClick={({ slug }) => router.push(`/shelter/${slug}`)}
        />
        {isAdmin && (
          <ShelterForm onCreate={() => refetch()}>
            {({ onOpen }) => (
              <Button onClick={onOpen} colorScheme="pink" my={4}>
                New Shelter
              </Button>
            )}
          </ShelterForm>
        )}
      </Container>
    </Layout>
  );
};

export default Shelters;
