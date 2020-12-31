import React, { FC } from "react";
import { useRouter } from "next/router";
import { useQueryParam } from "utils/routing";
import { useQuery, gql } from "@apollo/client";
import { useFirebaseUser } from "services/firebase";

import { Box, Container } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";

import { Layout } from "components/layout";
import { AdminGuard, ADMIN_GUARD_FRAGMENTS } from "components/admin";
import { AdminCrumb } from "components/admin-crumb";
import { ErrorBox } from "components/error";
import { ShelterCard, SHELTER_CARD_FRAGMENTS } from "components/shelter-card";
import { ShelterForm } from "components/shelter-form";
import {
  ShelterAdminCrumb,
  SHELTER_ADMIN_CRUMB_FRAGMENTS,
} from "components/shelter-admin-crumb";

import { ShelterAdminQuery, ShelterAdminQueryVariables } from "schema";

export const SHELTER_ADMIN_QUERY = gql`
  query ShelterAdminQuery($slug: String!) {
    viewer {
      id
      ...AdminGuard_viewer
    }
    shelter: shelterBySlug(slug: $slug) {
      id
      ...ShelterCard_shelter
      ...ShelterAdminCrumb_shelter
    }
  }

  ${ADMIN_GUARD_FRAGMENTS}
  ${SHELTER_CARD_FRAGMENTS}
  ${SHELTER_ADMIN_CRUMB_FRAGMENTS}
`;

const ShelterAdmin: FC = () => {
  const router = useRouter();
  const slug = useQueryParam("slug");
  const user = useFirebaseUser();

  const { data } = useQuery<ShelterAdminQuery, ShelterAdminQueryVariables>(
    SHELTER_ADMIN_QUERY,
    {
      variables: {
        slug: slug!,
      },
      skip: !slug || user === undefined,
    },
  );
  const { viewer, shelter } = data ?? {};

  return (
    <Layout
      title="Shelter Admin"
      crumbs={
        <>
          <AdminCrumb />
          <ShelterAdminCrumb shelter={shelter} isCurrentPage />
        </>
      }
    >
      <AdminGuard as={Container} viewer={viewer} my={4}>
        <Text fontSize="2xl" fontWeight="semibold">
          Shelter Info
        </Text>
        <Box mt={2}>
          {shelter !== null ? (
            <ShelterForm
              shelterId={shelter?.id}
              onDelete={() => router.replace("/admin")}
            >
              {({ onOpen }) => (
                <ShelterCard shelter={shelter} onClick={onOpen} />
              )}
            </ShelterForm>
          ) : (
            <ErrorBox>Shelter not found.</ErrorBox>
          )}
        </Box>
      </AdminGuard>
    </Layout>
  );
};

export default ShelterAdmin;
