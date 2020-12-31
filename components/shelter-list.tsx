import React, { FC } from "react";
import { gql } from "@apollo/client";
import isEmpty from "lodash/isEmpty";

import { Box, BoxProps, VStack } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";

import {
  ShelterCard,
  ShelterCardProps,
  SHELTER_CARD_FRAGMENTS,
} from "components/shelter-card";

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
  const sheltersOrPlaceholders: (ShelterList_shelter | undefined)[] =
    shelters === undefined ? [...new Array(3)] : shelters ?? [];
  return (
    <VStack align="stretch" {...otherProps}>
      <Text fontSize="2xl" fontWeight="semibold">
        Shelters
      </Text>
      {!isEmpty(sheltersOrPlaceholders) ? (
        <VStack align="stretch" spacing={3}>
          {sheltersOrPlaceholders.map((shelter, index) => (
            <ShelterCard
              key={shelter?.id ?? index}
              shelter={shelter}
              onClick={shelter ? onItemClick : undefined}
            />
          ))}
        </VStack>
      ) : (
        <Box
          p={4}
          borderRadius="md"
          bg={useColorModeValue("gray.100", "gray.600")}
        >
          <Text
            fontWeight="medium"
            color={useColorModeValue("gray.500", "gray.300")}
          >
            No shelters registered.
          </Text>
        </Box>
      )}
    </VStack>
  );
};
