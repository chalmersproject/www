import React, { FC } from "react";
import NextLink from "next/link";
import { gql } from "@apollo/client";

import { Box, BoxProps, HStack, VStack } from "@chakra-ui/react";
import { Skeleton, SkeletonText } from "@chakra-ui/react";
import { Text, LinkOverlay, LinkBox } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { useColorModeValue, useBreakpointValue } from "@chakra-ui/react";

import { ShelterTags } from "components/shelter-tags";
import { SHELTER_TAGS_FRAGMENTS } from "components/shelter-tags";

import { ShelterCard_shelter } from "schema";

export const SHELTER_CARD_FRAGMENTS = gql`
  fragment ShelterCard_shelter on Shelter {
    id
    name
    slug
    about
    imageUrl
    food
    ...ShelterTags_shelter
  }

  ${SHELTER_TAGS_FRAGMENTS}
`;

export interface ShelterCardProps extends Omit<BoxProps, "onClick"> {
  readonly shelter: ShelterCard_shelter | undefined;
  readonly href?: string;
  readonly onClick?: (shelter: ShelterCard_shelter) => void;
}

export const ShelterCard: FC<ShelterCardProps> = ({
  shelter,
  href,
  onClick,
  ...otherProps
}) => {
  const { name, about, imageUrl } = shelter ?? {};

  const cardBg = useColorModeValue("gray.100", "gray.700");
  const cardHoverBg = useColorModeValue("blue.50", "gray.600");

  const nameColor = useColorModeValue("gray.900", "gray.100");
  const aboutColor = useColorModeValue("gray.500", "gray.400");
  const imageShown = useBreakpointValue([false, true]);

  const renderName = () => {
    if (!name) {
      return (
        <Skeleton>
          <Text fontSize="lg">&nbsp;</Text>
        </Skeleton>
      );
    }
    const element = (
      <Text fontSize="lg" fontWeight="semibold" color={nameColor}>
        {name}
      </Text>
    );
    if (href) {
      return (
        <NextLink href={href} passHref>
          <LinkOverlay>{element}</LinkOverlay>
        </NextLink>
      );
    }
    return element;
  };

  const renderAbout = () => {
    if (!about) {
      return (
        <Box py={1}>
          <SkeletonText spacing={2} />
        </Box>
      );
    }
    return (
      <Text noOfLines={3} fontSize="base" color={aboutColor}>
        {about}
      </Text>
    );
  };

  return (
    <LinkBox
      href={href}
      onClick={() => {
        if (onClick && shelter) {
          onClick(shelter);
        }
      }}
      rounded="lg"
      p={4}
      bg={cardBg}
      transition="background-color"
      transitionTimingFunction="ease-in-out"
      transitionDuration="normal"
      _hover={{ bg: cardHoverBg }}
      {...otherProps}
    >
      <HStack spacing={3}>
        <VStack align="stretch" flex={1}>
          <VStack align="stretch" spacing={shelter ? 0 : 2}>
            {renderName()}
            {renderAbout()}
          </VStack>
          <ShelterTags shelter={shelter} />
        </VStack>
        {imageUrl !== null && imageShown && (
          <Box boxSize={32} rounded="md" overflow="hidden">
            <Image
              src={imageUrl}
              alt={name}
              fit="cover"
              fallback={<Skeleton boxSize="full" />}
              boxSize="full"
            />
          </Box>
        )}
      </HStack>
    </LinkBox>
  );
};
