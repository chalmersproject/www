import React, { FC, useMemo } from "react";
import { gql } from "@apollo/client";

import { Box, BoxProps, Flex, HStack, VStack } from "@chakra-ui/react";
import { AspectRatio } from "@chakra-ui/react";
import { Wrap, WrapItem } from "@chakra-ui/react";
import { Tag } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";

import { ShelterForm, ShelterFormProps } from "components/shelter-form";

import { ShelterCard_shelter, ShelterCard_viewer } from "schema";

export const SHELTER_CARD_FRAGMENTS = gql`
  fragment ShelterCard_viewer on User {
    isAdmin
  }

  fragment ShelterCard_shelter on Shelter {
    id
    name
    about
    imageUrl
    food
    tags
  }
`;

export interface ShelterCardProps
  extends BoxProps,
    Pick<ShelterFormProps, "onCreate" | "onUpdate" | "onDelete"> {
  readonly viewer: ShelterCard_viewer | null | undefined;
  readonly shelter: ShelterCard_shelter | undefined;
}

export const ShelterCard: FC<ShelterCardProps> = ({
  viewer,
  shelter,
  onCreate,
  onUpdate,
  onDelete,
  ...otherProps
}) => {
  const { isAdmin } = viewer ?? {};
  const { id, name, about, imageUrl, tags } = shelter ?? {};
  const sortedTags = useMemo(() => (tags ? [...tags].sort() : undefined), [
    tags,
  ]);
  return (
    <ShelterForm
      shelterId={id}
      isReadOnly={!isAdmin}
      {...{ onCreate, onUpdate, onDelete }}
    >
      {({ onOpen }) => (
        <HStack
          onClick={() => onOpen()}
          borderRadius="md"
          cursor="pointer"
          p={4}
          bg="gray.50"
          transition="background-color"
          transitionTimingFunction="ease-in-out"
          transitionDuration="normal"
          _hover={{ bg: "gray.100" }}
          {...otherProps}
        >
          <VStack align="flex-start" flex={1}>
            <Box>
              <Text fontSize="lg" fontWeight="medium" color="gray.900">
                {name}
              </Text>
              <Text noOfLines={3} fontSize="base" color="gray.500">
                {about}
              </Text>
            </Box>
            {sortedTags && (
              <Wrap spacing={1.5} mt={2}>
                {sortedTags.map(tag => (
                  <WrapItem key={tag}>
                    <Tag colorScheme="pink">{tag}</Tag>
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
      )}
    </ShelterForm>
  );
};
