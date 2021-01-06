import React, { FC } from "react";
import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";
import { useFirebaseUser } from "services/firebase";

import { ParsedUrlQuery } from "querystring";
import { GetServerSideProps } from "next";
import { getServerClient } from "services/apollo";

import { Box, Container } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";

import { Layout } from "components/layout";
import { AdminGuard, ADMIN_GUARD_FRAGMENTS } from "components/admin";
import { AdminCrumb } from "components/admin-crumb";
import { ShelterCard, SHELTER_CARD_FRAGMENTS } from "components/shelter-card";
import { ShelterForm } from "components/shelter-form";
import {
  ShelterAdminCrumb,
  SHELTER_ADMIN_CRUMB_FRAGMENTS,
} from "components/shelter-admin-crumb";

import { ShelterAdminQuery, ShelterAdminQueryVariables } from "schema";
import {
  ShelterAdminMetaQuery_shelter,
  ShelterAdminMetaQuery,
  ShelterAdminMetaQueryVariables,
} from "schema";

export interface ShelterAdminQueryParams extends ParsedUrlQuery {
  slug: string;
}

export interface ShelterAdminProps {
  slug: string;
  url: string;
  shelter: ShelterAdminMetaQuery_shelter;
}

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

const ShelterAdmin: FC<ShelterAdminProps> = ({
  slug,
  url,
  shelter: shelterMeta,
}) => {
  const router = useRouter();
  const user = useFirebaseUser();

  const { data } = useQuery<ShelterAdminQuery, ShelterAdminQueryVariables>(
    SHELTER_ADMIN_QUERY,
    {
      variables: {
        slug: slug,
      },
      skip: user === undefined,
    },
  );
  const { viewer, shelter } = data ?? {};
  if (shelter === null) {
    throw new Error("Shelter not found.");
  }

  const { name, imageUrl } = shelter ?? shelterMeta ?? {};
  return (
    <Layout
      pageUrl={url}
      pageTitle={[name, "Shelter Admin"]}
      pageImageUrl={imageUrl}
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
          <ShelterForm
            shelterId={shelter?.id}
            onDelete={() => router.replace("/admin")}
          >
            {({ onOpen }) => <ShelterCard shelter={shelter} onClick={onOpen} />}
          </ShelterForm>
        </Box>
      </AdminGuard>
    </Layout>
  );
};

export default ShelterAdmin;

export const SHELTER_ADMIN_META_QUERY = gql`
  query ShelterAdminMetaQuery($slug: String!) {
    shelter: shelterBySlug(slug: $slug) {
      id
      name
      imageUrl
    }
  }
`;

export const getServerSideProps: GetServerSideProps<
  ShelterAdminProps,
  ShelterAdminQueryParams
> = async context => {
  const { slug } = context.params ?? {};
  if (!slug) {
    throw new Error("Missing slug.");
  }

  const client = getServerClient();
  const { data } = await client.query<
    ShelterAdminMetaQuery,
    ShelterAdminMetaQueryVariables
  >({
    query: SHELTER_ADMIN_META_QUERY,
    variables: { slug },
  });

  const { shelter } = data;
  if (shelter) {
    return {
      props: { slug, url: context.resolvedUrl, shelter },
    };
  }
  return {
    notFound: true,
  };
};
