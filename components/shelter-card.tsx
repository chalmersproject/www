import React, { FC, useMemo } from "react";
import { gql } from "@apollo/client";
import isEmpty from "lodash/isEmpty";

import { Box, BoxProps, Flex, HStack, VStack } from "@chakra-ui/react";
import { Skeleton, SkeletonText } from "@chakra-ui/react";
import { Wrap, WrapItem } from "@chakra-ui/react";
import { Tag } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";

import { ShelterCard_shelter } from "schema";

export const SHELTER_CARD_FRAGMENTS = gql`
  fragment ShelterCard_shelter on Shelter {
    id
    name
    slug
    about
    imageUrl
    food
    tags
  }
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
  const { name, about, imageUrl, tags } = shelter ?? {};
  const sortedTags = useMemo(() => (tags ? [...tags].sort() : undefined), [
    tags,
  ]);

  const cardBg = useColorModeValue("gray.50", "gray.700");
  const cardHoverBg = useColorModeValue("gray.100", "gray.600");
  const nameColor = useColorModeValue("gray.900", "gray.50");
  const aboutColor = useColorModeValue("gray.500", "gray.400");

  if (!shelter) {
    return <ShelterCardSkeleton cardBg={cardBg} />;
  }
  return (
    <HStack
      onClick={() => {
        if (onClick && shelter) {
          onClick(shelter);
        }
      }}
      borderRadius="md"
      cursor="pointer"
      p={4}
      bg={cardBg}
      transition="background-color"
      transitionTimingFunction="ease-in-out"
      transitionDuration="normal"
      _hover={{ bg: cardHoverBg }}
      {...otherProps}
    >
      <VStack align="flex-start" flex={1} pr={2}>
        <Box>
          <Text fontSize="lg" fontWeight="semibold" color={nameColor}>
            {name}
          </Text>
          <Text noOfLines={3} fontSize="base" color={aboutColor}>
            {about}
          </Text>
        </Box>
        {!isEmpty(sortedTags) && (
          <Wrap spacing={1.5} mt={2}>
            {sortedTags!.map(tag => (
              <WrapItem key={tag}>
                <Tag colorScheme="blue">{tag}</Tag>
              </WrapItem>
            ))}
          </Wrap>
        )}
      </VStack>
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={name}
          fit="cover"
          boxSize="32"
          borderRadius="md"
          bg="gray.200"
        />
      )}
    </HStack>
  );
};

interface ShelterCardSkeletonProps extends BoxProps {
  cardBg: string;
}

const ShelterCardSkeleton: FC<ShelterCardSkeletonProps> = ({
  cardBg,
  ...otherProps
}) => (
  <HStack borderRadius="md" cursor="pointer" p={4} bg={cardBg} {...otherProps}>
    <VStack align="stretch" flex={1} pr={2}>
      <Flex direction="column" align="start">
        <Skeleton mb={2}>
          <Text fontSize="lg">Placeholder Shelter</Text>
        </Skeleton>
        <SkeletonText noOfLines={3} spacing={2} my={2} alignSelf="stretch" />
      </Flex>
      <Wrap spacing={1.5}>
        {[...new Array(3)].map((_, index) => (
          <WrapItem key={index}>
            <Skeleton>
              <Tag w={20} />
            </Skeleton>
          </WrapItem>
        ))}
      </Wrap>
    </VStack>
    <Skeleton boxSize="32" borderRadius="md" />
  </HStack>
);
