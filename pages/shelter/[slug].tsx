import React, { FC } from "react";
import { gql } from "@apollo/client";

import { ParsedUrlQuery } from "querystring";
import { GetServerSideProps } from "next";
import { getServerClient } from "services/apollo";

import { Container } from "@chakra-ui/react";

import { Layout } from "components/layout";

import {
  ShelterMetaQuery,
  ShelterMetaQueryVariables,
  ShelterMetaQuery_shelter,
} from "schema";

export interface ShelterQueryParams extends ParsedUrlQuery {
  slug: string;
}

export interface ShelterProps {
  slug: string;
  url: string;
  shelter: ShelterMetaQuery_shelter;
}

export const SHELTER_QUERY = gql`
  query ShelterQuery($slug: String!) {
    shelter: shelterBySlug(slug: $slug) {
      id
      name
      about
      imageUrl
    }
  }
`;

const Shelter: FC<ShelterProps> = ({ url, shelter }) => {
  const { name, about, imageUrl } = shelter;
  return (
    <Layout
      pageUrl={url}
      pageType="article"
      pageTitle={[name, "Shelter"]}
      pageDescription={about}
      pageImageUrl={imageUrl}
    >
      <Container my={4}></Container>
    </Layout>
  );
};

export default Shelter;

export const SHELTER_META_QUERY = gql`
  query ShelterMetaQuery($slug: String!) {
    shelter: shelterBySlug(slug: $slug) {
      id
      name
      about
      imageUrl
    }
  }
`;

export const getServerSideProps: GetServerSideProps<
  ShelterProps,
  ShelterQueryParams
> = async context => {
  const { slug } = context.params ?? {};
  if (!slug) {
    throw new Error("Missing slug.");
  }

  const client = getServerClient();
  const { data } = await client.query<
    ShelterMetaQuery,
    ShelterMetaQueryVariables
  >({
    query: SHELTER_META_QUERY,
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
