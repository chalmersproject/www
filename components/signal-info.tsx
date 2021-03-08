import React, { FC, ReactNode } from "react";
import take from "lodash/take";
import isEmpty from "lodash/isEmpty";

import { usePlaceholders } from "utils/placeholder";
import { useQuery, gql } from "@apollo/client";

import { DateTime } from "luxon";

import { Box, BoxProps, VStack } from "@chakra-ui/react";
import { Text, Code } from "@chakra-ui/react";
import { Skeleton } from "@chakra-ui/react";
import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import { Table, Tbody, Tr, Td } from "@chakra-ui/react";

import {
  Stat,
  StatNumber,
  StatLabel,
  StatHelpText,
  StatArrow,
} from "@chakra-ui/react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
} from "@chakra-ui/react";

import { EmptyPlaceholder } from "components/placeholder";

import {
  ShelterMeasure,
  SignalInfoQuery,
  SignalInfoQueryVariables,
} from "schema";

export interface SignalInfoProps extends BoxProps {
  readonly signalId: string | undefined;
  readonly children: (disclosure: UseDisclosureReturn) => ReactNode;
}

const SIGNAL_INFO_QUERY = gql`
  query SignalInfoQuery($signalId: ID!) {
    signal(id: $signalId) {
      id
      secret
      name
      measure
      value
      measurements(limit: 4, offset: 0) {
        id
        occupancy {
          beds
          spots
        }
        timestamp
      }
    }
    viewer {
      id
      isAdmin
    }
  }
`;

export const SignalInfo: FC<SignalInfoProps> = ({
  signalId,
  children,
  ...otherProps
}) => {
  const disclosure = useDisclosure();

  const { data } = useQuery<SignalInfoQuery, SignalInfoQueryVariables>(
    SIGNAL_INFO_QUERY,
    {
      variables: signalId ? { signalId } : undefined,
      skip: !signalId,
    },
  );

  const { signal, viewer } = data ?? {};
  const { secret, name, measure, value, measurements } = signal ?? {};
  const { isAdmin } = viewer ?? {};
  const measurementsWithPlaceholders = usePlaceholders(measurements, 3);

  const renderLabelCell = (text: string) => (
    <Td px={2} fontWeight="medium">
      {text}
    </Td>
  );
  const renderValueCell = (text: string | undefined) => (
    <Td px={2}>
      <Skeleton isLoaded={!!text}>
        <Code colorScheme="pink" wordBreak="break-word">
          {text ?? "Placeholder"}
        </Code>
      </Skeleton>
    </Td>
  );

  return (
    <>
      <Box {...otherProps}>{children(disclosure)}</Box>
      <Modal {...disclosure} {...otherProps}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Skeleton isLoaded={!!name} mr={8}>
              {name ?? "Placeholder"}
            </Skeleton>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack align="stretch" spacing={4}>
              <VStack align="stretch" spacing={1}>
                <Text fontSize="lg" fontWeight="semibold">
                  Recent Measurements
                </Text>
                <VStack align="stretch">
                  {!isEmpty(measurementsWithPlaceholders) ? (
                    take(measurementsWithPlaceholders, 3).map(
                      (measurement, index) => {
                        const {
                          id: measurementId,
                          occupancy,
                          timestamp: timestampISO,
                        } = measurement ?? {};

                        const timestamp = timestampISO
                          ? DateTime.fromISO(timestampISO)
                          : undefined;
                        const value =
                          measure === ShelterMeasure.SPOTS
                            ? occupancy?.spots
                            : occupancy?.beds;
                        const units =
                          measure === ShelterMeasure.SPOTS
                            ? "occupants"
                            : "beds";

                        const previousMeasurement = measurements
                          ? measurements[index + 1]
                          : undefined;
                        const previousValue =
                          measure === ShelterMeasure.SPOTS
                            ? previousMeasurement?.occupancy?.spots
                            : previousMeasurement?.occupancy?.beds;
                        const delta =
                          value && previousValue
                            ? value - previousValue
                            : undefined;

                        return (
                          <VStack
                            key={measurementId ?? index}
                            align="stretch"
                            spacing={0}
                            rounded="md"
                            borderColor="blue.500"
                            borderWidth={2}
                            px={3}
                            pt={3}
                          >
                            <Stat>
                              <Skeleton isLoaded={!!timestamp}>
                                <StatLabel color="gray.500">
                                  {timestamp
                                    ? timestamp.toLocaleString(
                                        DateTime.DATETIME_MED_WITH_SECONDS,
                                      )
                                    : "Placeholder"}
                                </StatLabel>
                              </Skeleton>
                              <Skeleton isLoaded={!!(value && units)}>
                                <StatNumber>
                                  {value ? (
                                    <>
                                      {value} {units}
                                    </>
                                  ) : (
                                    "Placeholder"
                                  )}
                                </StatNumber>
                              </Skeleton>
                              {delta && units && (
                                <StatHelpText>
                                  <StatArrow
                                    type={delta >= 0 ? "increase" : "decrease"}
                                  />
                                  {Math.abs(delta)} {units}
                                </StatHelpText>
                              )}
                            </Stat>
                          </VStack>
                        );
                      },
                    )
                  ) : (
                    <EmptyPlaceholder>
                      No measurements recorded.
                    </EmptyPlaceholder>
                  )}
                </VStack>
              </VStack>
              {isAdmin && (
                <VStack align="stretch" spacing={1}>
                  <Text fontSize="lg" fontWeight="semibold">
                    Signal Info
                  </Text>
                  <Box
                    rounded="md"
                    borderColor="pink.500"
                    borderWidth={2}
                    px={2}
                  >
                    <Table colorScheme="pink" mb="-1px">
                      <Tbody>
                        <Tr>
                          {renderLabelCell("ID")}
                          {renderValueCell(signalId)}
                        </Tr>
                        <Tr>
                          {renderLabelCell("Secret")}
                          {renderValueCell(
                            secret !== null ? secret : "(not authorized)",
                          )}
                        </Tr>
                      </Tbody>
                    </Table>
                  </Box>
                </VStack>
              )}
            </VStack>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
};
