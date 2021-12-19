import React, { FC } from "react";

import { BoxProps, Divider } from "@chakra-ui/react";
import { Skeleton } from "@chakra-ui/react";
import { StatGroup, Stat, StatLabel, Text } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
import { pink } from "tailwindcss/colors";

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
    <StatGroup
      {...otherProps}
      flexDir={"column"}
      alignItems={"center"}
      fontSize={"2xl"}
      fontWeight={"semibold"}
    >
      <Stat>
        {/* <StatLabel color={labelColor}>Available</StatLabel> */}
        {occupancy !== undefined && capacity !== undefined ? (
          <Text color={valueColor}>{occupancy}</Text>
        ) : (
          <Skeleton>
            <Text>10</Text>
          </Skeleton>
        )}
      </Stat>
      <Divider my={1} borderWidth={1} borderColor={"blue.400"} />
      <Stat>
        {/* <StatLabel color={labelColor}>Capacity</StatLabel> */}
        {capacity ? (
          <Text color={valueColor}>{capacity}</Text>
        ) : (
          <Skeleton>
            <Text>10</Text>
          </Skeleton>
        )}
      </Stat>
    </StatGroup>
  );
};
