import React, { FC } from "react";
import { gql } from "@apollo/client";

import { Box, BoxProps, HStack, VStack } from "@chakra-ui/react";
import { Skeleton, SkeletonText } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
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
  readonly onClick?: (shelter: ShelterCard_shelter) => void;
}

export const ShelterCard: FC<ShelterCardProps> = ({
  shelter,
  onClick,
  ...otherProps
}) => {
  const { name, about, imageUrl } = shelter ?? {};

  const cardBg = useColorModeValue("gray.100", "gray.700");
  const cardHoverBg = useColorModeValue("blue.50", "gray.600");

  const nameColor = useColorModeValue("gray.900", "gray.100");
  const aboutColor = useColorModeValue("gray.500", "gray.400");
  const imageShown = useBreakpointValue([false, true]);

  return (
    <HStack
      spacing={3}
      onClick={() => {
        if (onClick && shelter) {
          onClick(shelter);
        }
      }}
      rounded="lg"
      cursor="pointer"
      p={4}
      bg={cardBg}
      transition="background-color"
      transitionTimingFunction="ease-in-out"
      transitionDuration="normal"
      _hover={{ bg: cardHoverBg }}
      {...otherProps}
    >
      <VStack align="stretch" flex={1}>
        <Box>
          {name ? (
            <Text fontSize="lg" fontWeight="semibold" color={nameColor}>
              {name}
            </Text>
          ) : (
            <Skeleton mb={2}>
              <Text fontSize="lg">&nbsp;</Text>
            </Skeleton>
          )}
          {about ? (
            <Text noOfLines={3} fontSize="base" color={aboutColor}>
              {about}
            </Text>
          ) : (
            <SkeletonText
              noOfLines={3}
              spacing={2}
              my={2}
              alignSelf="stretch"
            />
          )}
        </Box>
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
  );
};
