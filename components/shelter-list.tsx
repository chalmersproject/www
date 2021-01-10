import React, { FC } from "react";
import isEmpty from "lodash/isEmpty";
import { fill } from "utils/placeholder";
import { gql } from "@apollo/client";

import { Box, BoxProps, VStack } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";

import { ShelterCard, ShelterCardProps } from "components/shelter-card";
import { SHELTER_CARD_FRAGMENTS } from "components/shelter-card";

import { ShelterList_shelter } from "schema";

export const SHELTER_LIST_FRAGMENTS = gql`
  fragment ShelterList_shelter on Shelter {
    id
    ...ShelterCard_shelter
  }

  ${SHELTER_CARD_FRAGMENTS}
`;

export interface ShelterListProps extends BoxProps {
  readonly shelters: ShelterList_shelter[] | undefined;
  readonly onItemClick?: ShelterCardProps["onClick"];
}

export const ShelterList: FC<ShelterListProps> = ({
  shelters,
  onItemClick,
  ...otherProps
}) => {
  const items = fill(shelters, 3);

  const placeholderBg = useColorModeValue("gray.100", "gray.600");
  const placeholderColor = useColorModeValue("gray.500", "gray.300");

  return (
    <VStack align="stretch" {...otherProps}>
      <Text fontSize="2xl" fontWeight="semibold">
        Shelters
      </Text>
      {!isEmpty(items) ? (
        <VStack align="stretch" spacing={3}>
          {items.map((shelter, index) => {
            const { id: shelterId } = shelter ?? {};
            return (
              <ShelterCard
                key={shelterId ?? index}
                shelter={shelter}
                onClick={onItemClick}
              />
            );
          })}
        </VStack>
      ) : (
        <Box p={4} rounded="md" bg={placeholderBg}>
          <Text fontWeight="medium" color={placeholderColor}>
            No shelters registered.
          </Text>
        </Box>
      )}
    </VStack>
  );
};
