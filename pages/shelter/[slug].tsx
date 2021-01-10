import React, { FC, useMemo } from "react";
import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";

import { parsePhoneNumberFromString } from "libphonenumber-js";

import { ParsedUrlQuery } from "querystring";
import { GetServerSideProps } from "next";
import { getServerClient } from "services/apollo";

import {
  HiOutlineLink,
  HiOutlineMail,
  HiOutlinePencil,
  HiOutlinePhone,
} from "react-icons/hi";
import { IconType } from "react-icons";

import { Box, Container, HStack, VStack } from "@chakra-ui/react";
import { Skeleton } from "@chakra-ui/react";
import { Heading, Text, Link, LinkProps } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { Icon, IconButton } from "@chakra-ui/react";
import { Fade } from "@chakra-ui/react";
import { useBreakpointValue, useColorModeValue } from "@chakra-ui/react";
import { useTransparentize } from "utils/theme";

import { Layout } from "components/layout";
import { HomeCrumb } from "components/shelters-crumb";
import { ShelterForm } from "components/shelter-form";
import { ShelterTags } from "components/shelter-tags";
import { ShelterCrumb } from "components/shelter-crumb";

import { SHELTER_CRUMB_FRAGMENTS } from "components/shelter-crumb";
import { SHELTER_TAGS_FRAGMENTS } from "components/shelter-tags";

import {
  ShelterHomeQuery,
  ShelterHomeQueryVariables,
  ShelterHomeQuery_shelter,
} from "schema";

import {
  ShelterMetaQuery_shelter,
  ShelterMetaQuery,
  ShelterMetaQueryVariables,
} from "schema";

export interface ShelterHomeQueryParams extends ParsedUrlQuery {
  slug: string;
}

export interface ShelterProps {
  slug: string;
  url: string;
  shelter: ShelterMetaQuery_shelter;
}

export const SHELTER_ADMIN_QUERY = gql`
  query ShelterHomeQuery($slug: String!) {
    viewer {
      id
      isAdmin
    }
    shelter: shelterBySlug(slug: $slug) {
      id
      name
      about
      imageUrl
      email
      phone
      websiteUrl
      location
      ...ShelterCrumb_shelter
      ...ShelterTags_shelter
    }
  }

  ${SHELTER_CRUMB_FRAGMENTS}
  ${SHELTER_TAGS_FRAGMENTS}
`;

const Shelter: FC<ShelterProps> = ({ slug, url, shelter: shelterMeta }) => {
  const router = useRouter();

  const { data } = useQuery<ShelterHomeQuery, ShelterHomeQueryVariables>(
    SHELTER_ADMIN_QUERY,
    {
      variables: {
        slug: slug,
      },
    },
  );

  const { viewer, shelter } = data ?? {};
  if (shelter === null) {
    throw new Error("Shelter not found.");
  }

  const { isAdmin } = viewer ?? {};

  const { id: shelterId, name, about, imageUrl } = {
    ...shelter,
    ...shelterMeta,
  };

  const editButtonSize = useBreakpointValue(["sm", "md"]);
  const aboutColor = useColorModeValue("gray.600", "gray.300");

  return (
    <Layout
      pageUrl={url}
      pageTitle={[name, "Shelter"]}
      pageImageUrl={imageUrl}
      breadcrumbs={
        <>
          <HomeCrumb />
          <ShelterCrumb shelter={shelter} isCurrentPage />
        </>
      }
    >
      <VStack as={Container} align="stretch" spacing={6}>
        {imageUrl !== null && (
          <Box h={[60, 80, 96]} rounded="md" overflow="hidden">
            <Image
              src={imageUrl}
              alt={name}
              fit="cover"
              fallback={<Skeleton boxSize="full" />}
              boxSize="full"
            />
          </Box>
        )}
        <VStack align="stretch">
          <HStack align="start">
            <VStack align="stretch" spacing={0.5} flex={1}>
              <Heading size="lg">{name}</Heading>
              <ShelterTags shelter={shelter} />
            </VStack>
            <Fade in={isAdmin}>
              <ShelterForm
                shelterId={shelterId}
                onDelete={() => router.replace("/")}
                p={[1, 2]}
              >
                {({ onOpen }) => (
                  <IconButton
                    icon={<Icon as={HiOutlinePencil} boxSize={[4, 5]} />}
                    aria-label="Edit"
                    size={editButtonSize}
                    colorScheme="pink"
                    onClick={onOpen}
                    isRound
                  />
                )}
              </ShelterForm>
            </Fade>
          </HStack>
          <Text lineHeight="short" color={aboutColor}>
            {about}
          </Text>
        </VStack>
        <ShelterLinks shelter={shelter} />
      </VStack>
    </Layout>
  );
};

export default Shelter;

interface ShelterLinksProps {
  shelter: ShelterHomeQuery_shelter | undefined;
}

const ShelterLinks: FC<ShelterLinksProps> = ({ shelter }) => {
  const { email, phone, websiteUrl } = shelter ?? {};
  const phoneNumber = useMemo(
    () => (phone ? parsePhoneNumberFromString(phone) : undefined),
    [shelter],
  );

  const containerBgDark = useTransparentize("pink.200", 0.16);
  const containerBg = useColorModeValue("pink.100", containerBgDark);
  const headingColor = useColorModeValue("pink.800", "pink.200");

  return (
    <VStack align="stretch" rounded="md" p={3} bg={containerBg}>
      <Heading size="md" fontWeight="semibold" color={headingColor}>
        Quick Links
      </Heading>
      <VStack align="stretch" spacing={1}>
        <ShelterLink
          icon={HiOutlinePhone}
          href={phone ? `tel:${phone}` : undefined}
        >
          {phoneNumber?.formatNational()}
        </ShelterLink>
        <ShelterLink
          icon={HiOutlineMail}
          href={email ? `mailto:${email}` : undefined}
        >
          {email}
        </ShelterLink>
        <ShelterLink
          icon={HiOutlineLink}
          href={websiteUrl ?? undefined}
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          {websiteUrl}
        </ShelterLink>
      </VStack>
    </VStack>
  );
};

interface ShelterLinkProps extends Pick<LinkProps, "href" | "target" | "rel"> {
  icon: IconType;
  children: string | null | undefined;
}

const ShelterLink: FC<ShelterLinkProps> = ({
  icon,
  href,
  target,
  rel,
  children,
}) => {
  const iconColor = useColorModeValue("pink.500", "pink.300");
  const linkBg = useColorModeValue("white", "gray.800");
  const linkColor = useColorModeValue("pink.600", "pink.400");

  if (children === null) return null;
  return (
    <HStack>
      <Icon as={icon} boxSize={5} color={iconColor} />
      <Skeleton isLoaded={!!children}>
        <Box rounded="sm" px={1.5} py="px" bg={linkBg}>
          {children ? (
            <Link color={linkColor} {...{ href, target, rel }}>
              {children}
            </Link>
          ) : (
            <Text w={52}>&nbsp;</Text>
          )}
        </Box>
      </Skeleton>
    </HStack>
  );
};

const SHELTER_META_QUERY = gql`
  query ShelterMetaQuery($slug: String!) {
    shelter: shelterBySlug(slug: $slug) {
      id
      name
      imageUrl
    }
  }
`;

export const getServerSideProps: GetServerSideProps<
  ShelterProps,
  ShelterHomeQueryParams
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
