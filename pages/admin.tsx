import React, { FC } from "react";
import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";

import { Container } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

import { Layout } from "components/layout";
import { AdminGuard, ADMIN_GUARD_FRAGMENTS } from "components/admin";
import { AdminCrumb } from "components/admin-crumb";
import { ShelterList, SHELTER_LIST_FRAGMENTS } from "components/shelter-list";
import { ShelterForm } from "components/shelter-form";

import { AdminQuery } from "schema";
import { useFirebaseUser } from "services/firebase";

export const ADMIN_QUERY = gql`
  query AdminQuery {
    viewer {
      id
      ...AdminGuard_viewer
    }
    shelters(limit: 50) {
      ...ShelterList_shelter
    }
  }

  ${ADMIN_GUARD_FRAGMENTS}
  ${SHELTER_LIST_FRAGMENTS}
`;

const Admin: FC = () => {
  const router = useRouter();
  const user = useFirebaseUser();

  const { data, refetch } = useQuery<AdminQuery>(ADMIN_QUERY, {
    skip: user === undefined,
  });
  const { viewer, shelters } = data ?? {};

  return (
    <Layout pageTitle="Admin" crumbs={<AdminCrumb isCurrentPage />}>
      <AdminGuard as={Container} viewer={viewer} my={4}>
        <ShelterList
          shelters={shelters}
          onItemClick={({ slug }) => router.push(`/shelter/${slug}/admin`)}
        />
        <ShelterForm onCreate={() => refetch()}>
          {({ onOpen }) => (
            <Button onClick={onOpen} colorScheme="pink" my={4}>
              New Shelter
            </Button>
          )}
        </ShelterForm>
      </AdminGuard>
    </Layout>
  );
};

export default Admin;
