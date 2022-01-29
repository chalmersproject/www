import React, { FC } from "react";
// import { gql } from "@apollo/client";

import { BoxProps, Divider } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Skeleton } from "@chakra-ui/react";
import { StatGroup, Stat } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";

// import { ShelterStatQuery, ShelterStatQueryVariables } from "schema";
// import { useApolloClient } from "services/apollo";

export interface ShelterStatProps extends BoxProps {
  // shelterId: string | undefined;
  occupancy: number | undefined;
  capacity: number | undefined;
}

// const SHELTER_STAT_QUERY = gql`
//   query ShelterStatQuery($shelterId: ID!) {
//     shelter(id: $shelterId) {
//       id
//       occupancy {
//         beds
//         spots
//       }
//     }
//   }
// `;

export const ShelterStat: FC<ShelterStatProps> = ({
  // shelterId,
  occupancy,
  capacity,
  ...otherProps
}) => {
  // // Repeatedly load the latest occupancy data, and store it in the Apollo
  // // cache.
  // //
  // // Does not actually return anything that is visibly used anywhere, but
  // // will automatically trigger refreshes across the application for anything
  // // looking at a shelter's occupancy with the same ID.
  // const client = useApolloClient();
  // useEffect(() => {
  //   let stop: () => void | undefined;
  //   const poll = async () => {
  //     if (shelterId) {
  //       const query = await client.watchQuery<
  //         ShelterStatQuery,
  //         ShelterStatQueryVariables
  //       >({
  //         query: SHELTER_STAT_QUERY,
  //         variables: shelterId ? { shelterId } : undefined,
  //         pollInterval: 3000,
  //       });
  //       console.log("asdf");
  //       stop = () => {
  //         console.log("stop this get some help");
  //         query.stopPolling();
  //       };
  //     }
  //   };
  //   poll();
  //   return () => {
  //     if (stop) {
  //       stop();
  //     }
  //   };
  // }, [shelterId]);

  // const { data } = useQuery<ShelterStatQuery, ShelterStatQueryVariables>(
  //   SHELTER_STAT_QUERY,
  //   {
  //     variables: shelterId ? { shelterId } : undefined,
  //     skip: !shelterId,
  //     pollInterval: 500,
  //   },
  // );

  // const labelColor = useColorModeValue("gray.500", "gray.300");
  const valueColor = useColorModeValue("blue.600", "blue.400");
  return (
    <StatGroup
      {...otherProps}
      flexDir="column"
      alignItems="center"
      fontSize="2xl"
      fontWeight="semibold"
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
      <Divider borderWidth={1} borderColor={"blue.400"} />
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
