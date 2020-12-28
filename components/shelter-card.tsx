import React, { FC, useMemo } from "react";
import { gql } from "@apollo/client";

import { Box, BoxProps } from "@chakra-ui/react";
import { Wrap, WrapItem } from "@chakra-ui/react";
import { Tag } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";

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
  const { id, name, about, tags } = shelter ?? {};
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
        <Box
          onClick={() => onOpen()}
          p={4}
          borderRadius="md"
          cursor="pointer"
          bg="gray.50"
          transition="background-color"
          transitionTimingFunction="ease-in-out"
          transitionDuration="normal"
          _hover={{ bg: "gray.100" }}
          {...otherProps}
        >
          <Text fontSize="lg" fontWeight="medium" color="gray.900">
            {name}
          </Text>
          <Text fontSize="base" color="gray.500">
            {about}
          </Text>
          {sortedTags && (
            <Wrap mt={2}>
              {sortedTags.map(tag => (
                <WrapItem key={tag}>
                  <Tag colorScheme="pink">{tag}</Tag>
                </WrapItem>
              ))}
            </Wrap>
          )}
        </Box>
      )}
    </ShelterForm>
  );
};
