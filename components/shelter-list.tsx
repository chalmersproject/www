import React, { FC } from "react";
import { gql } from "@apollo/client";
import isEmpty from "lodash/isEmpty";

import { Box, BoxProps, VStack } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Skeleton } from "@chakra-ui/react";
import { Text, Heading } from "@chakra-ui/react";
import { Fade } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";

import { ShelterForm } from "components/shelter-form";
import { ShelterCard, SHELTER_CARD_FRAGMENTS } from "components/shelter-card";

import { ShelterList_shelter, ShelterList_viewer } from "schema";

export const SHELTER_LIST_FRAGMENTS = gql`
  fragment ShelterList_viewer on User {
    isAdmin
    ...ShelterCard_viewer
  }

  fragment ShelterList_shelter on Shelter {
    id
    ...ShelterCard_shelter
  }

  ${SHELTER_CARD_FRAGMENTS}
`;

export interface ShelterListProps extends BoxProps {
  readonly viewer: ShelterList_viewer | null | undefined;
  readonly shelters: ShelterList_shelter[] | undefined;
  readonly refetch: () => Promise<any>;
  readonly loading: boolean;
}

export const ShelterList: FC<ShelterListProps> = ({
  viewer,
  shelters,
  refetch,
  loading,
  ...otherProps
}) => {
  return (
    <VStack align="stretch" {...otherProps}>
      <Heading size="lg" fontSize="2xl" fontWeight="semibold" mb={1}>
        Shelters
      </Heading>
      {!loading ? (
        !isEmpty(shelters) ? (
          <VStack align="stretch" spacing={3}>
            {shelters?.map(shelter => (
              <ShelterCard
                key={shelter.id}
                onDelete={() => refetch()}
                {...{ viewer, shelter }}
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
        )
      ) : (
        [...new Array(3)].map((_, index) => (
          <Skeleton key={index} h={32} borderRadius="md" />
        ))
      )}
      <Fade in={viewer?.isAdmin}>
        <ShelterForm onCreate={() => refetch()}>
          {({ onOpen }) => (
            <Button onClick={onOpen} colorScheme="pink" mt={3}>
              New Shelter
            </Button>
          )}
        </ShelterForm>
      </Fade>
    </VStack>
  );
};
