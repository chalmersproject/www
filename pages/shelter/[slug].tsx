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

import { Box, Container, HStack, VStack, SimpleGrid } from "@chakra-ui/react";
import { Skeleton } from "@chakra-ui/react";
import { Heading, Text, Link, LinkProps } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { Icon, IconButton } from "@chakra-ui/react";
import { Stat, StatGroup, StatLabel, StatNumber } from "@chakra-ui/react";
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
      occupancy {
        beds
        spots
      }
      capacity {
        beds
        spots
      }
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
          <Box h={[60, 80, 96]} rounded="lg" overflow="hidden">
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
        <VStack align="stretch">
          <ShelterLinks shelter={shelter} />
          <ShelterStats shelter={shelter} />
        </VStack>
      </VStack>
    </Layout>
  );
};

export default Shelter;

interface ShelterStatsProps {
  shelter: ShelterHomeQuery_shelter | undefined;
}

const ShelterStats: FC<ShelterStatsProps> = ({ shelter }) => {
  const { occupancy, capacity } = shelter ?? {};

  const headingColor = useColorModeValue("gray.800", "gray.200");
  const labelColor = useColorModeValue("blue.600", "blue.300");

  return (
    <VStack align="stretch" spacing={1} rounded="lg" p={4}>
      <Heading size="md" fontWeight="semibold" color={headingColor}>
        Occupancy
      </Heading>
      <SimpleGrid
        columns={2}
        spacingX={3}
        spacingY={1.5}
        templateColumns="auto 10rem"
      >
        <Text fontWeight="medium" color={labelColor}>
          Spots
        </Text>
        <ShelterStat occupancy={occupancy?.spots} capacity={capacity?.spots} />
        <Text fontWeight="medium" color={labelColor}>
          Beds
        </Text>
        <ShelterStat occupancy={occupancy?.beds} capacity={capacity?.beds} />
      </SimpleGrid>
    </VStack>
  );
};

interface ShelterStatProps {
  occupancy: number | undefined;
  capacity: number | undefined;
}

const ShelterStat: FC<ShelterStatProps> = ({ occupancy, capacity }) => {
  const labelColor = useColorModeValue("gray.500", "gray.300");
  const valueColor = useColorModeValue("blue.600", "blue.400");
  return (
    <StatGroup>
      <Stat minW={12}>
        <StatLabel color={labelColor}>Available</StatLabel>
        {occupancy !== undefined && capacity !== undefined ? (
          <StatNumber color={valueColor}>{capacity - occupancy}</StatNumber>
        ) : (
          <Skeleton>
            <StatNumber>10</StatNumber>
          </Skeleton>
        )}
      </Stat>
      <Stat minW={12}>
        <StatLabel color={labelColor}>Capacity</StatLabel>
        {capacity ? (
          <StatNumber color={valueColor}>{capacity}</StatNumber>
        ) : (
          <Skeleton>
            <StatNumber>10</StatNumber>
          </Skeleton>
        )}
      </Stat>
    </StatGroup>
  );
};

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
    <VStack align="stretch" rounded="lg" p={4} bg={containerBg}>
      <Heading size="md" fontWeight="semibold" color={headingColor}>
        Quick Links
      </Heading>
      <VStack align="stretch" spacing={1.5}>
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
        <Box rounded="md" px={2} py={0.5} bg={linkBg}>
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
