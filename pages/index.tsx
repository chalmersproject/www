import React, { FC } from "react";
import isEmpty from "lodash/isEmpty";

import { useFirebaseUser } from "services/firebase";
import { useQuery, gql } from "@apollo/client";

import { Container, Heading, VStack } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

import { Layout } from "components/layout";
import { HomeCrumb } from "components/shelters-crumb";
import { ShelterCard } from "components/shelter-card";
import { ShelterEditor } from "components/shelter-editor";

import { SHELTER_CARD_FRAGMENTS } from "components/shelter-card";

import { HomeQuery } from "schema";
import { usePlaceholders } from "utils/placeholder";
import { EmptyPlaceholder } from "components/placeholder";

export const SHELTERS_QUERY = gql`
  query HomeQuery {
    viewer {
      id
      isAdmin
    }
    shelters(limit: 50) {
      id
      ...ShelterCard_shelter
    }
  }

  ${SHELTER_CARD_FRAGMENTS}
`;

const Shelters: FC = () => {
  const user = useFirebaseUser();

  const { data, refetch } = useQuery<HomeQuery>(SHELTERS_QUERY, {
    skip: user === undefined,
  });
  const { viewer, shelters } = data ?? {};
  const { isAdmin } = viewer ?? {};
  const sheltersWithPlaceholders = usePlaceholders(shelters, 3);

  return (
    <Layout breadcrumbs={<HomeCrumb isCurrentPage />}>
      <Container>
        <VStack align="stretch">
          <Heading size="lg" fontSize="2xl" fontWeight="semibold">
            Shelters
          </Heading>
          {!isEmpty(sheltersWithPlaceholders) ? (
            <VStack align="stretch" spacing={3}>
              {sheltersWithPlaceholders.map((shelter, index) => {
                const { id: shelterId, slug } = shelter ?? {};
                return (
                  <ShelterCard
                    key={shelterId ?? index}
                    shelter={shelter}
                    href={`/shelter/${slug}`}
                  />
                );
              })}
            </VStack>
          ) : (
            <EmptyPlaceholder>No shelters registered.</EmptyPlaceholder>
          )}
          {isAdmin && (
            <ShelterEditor onCreate={() => refetch()}>
              {({ onOpen }) => (
                <Button onClick={onOpen} colorScheme="pink" my={1}>
                  New Shelter
                </Button>
              )}
            </ShelterEditor>
          )}
        </VStack>
      </Container>
    </Layout>
  );
};

export default Shelters;
