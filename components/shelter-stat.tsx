import React, { FC } from "react";

import { BoxProps } from "@chakra-ui/react";
import { Skeleton } from "@chakra-ui/react";
import { StatGroup, Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";

export interface ShelterStatProps extends BoxProps {
  occupancy: number | undefined;
  capacity: number | undefined;
}

export const ShelterStat: FC<ShelterStatProps> = ({
  occupancy,
  capacity,
  ...otherProps
}) => {
  const labelColor = useColorModeValue("gray.500", "gray.300");
  const valueColor = useColorModeValue("blue.600", "blue.400");
  return (
    <StatGroup {...otherProps}>
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
