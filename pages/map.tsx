import React, { FC, useEffect, useMemo, useState } from "react";
import NextLink from "next/link";
import { gql, useQuery } from "@apollo/client";

import { BoxProps, VStack, HStack, Center } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import { Text, Link } from "@chakra-ui/react";
import { Wrap, WrapItem } from "@chakra-ui/react";
import { Tag } from "@chakra-ui/react";
import { useToken, useColorModeValue } from "@chakra-ui/react";

import { Map as _Map, Layer, Feature, Popup } from "components/mapbox";
import { Geocoder, GeolocateControl } from "components/mapbox";
import { MapMouseEvent, SymbolLayout, SymbolPaint } from "mapbox-gl";
import { ShelterStat } from "components/shelter-stat";

import { MapQuery } from "schema";

import {
  ShelterPopupQuery,
  ShelterPopupQueryVariables,
  ShelterPopupQuery_shelter,
} from "schema";
import Shelters from "pages";

const MAP_QUERY = gql`
  query MapQuery {
    shelters {
      id
      location
      occupancy {
        spots
        beds
      }
      capacity {
        spots
        beds
      }
    }
  }
`;

const MAP_ZOOM: [number] = [13];
const MAP_CENTER: [number, number] = [-79.39555984248707, 43.662375544140225];

const Map: FC = () => {
  const [, setIsStyleLoaded] = useState(false); // TODO: Figure out why this is necessary for markers to show up.

  const { data } = useQuery<MapQuery>(MAP_QUERY);
  const shelters = data?.shelters ?? [];

  useEffect(() => {
    console.log("shelters: ", shelters);
  }, [data]);

  const [selectedShelterIndex, setSelectedShelterIndex] = useState<
    number | null
  >(null);
  const selectedShelter = useMemo(
    () =>
      selectedShelterIndex !== null ? shelters[selectedShelterIndex] : null,
    [shelters, selectedShelterIndex],
  );

  const symbolLayout: SymbolLayout = {
    "symbol-sort-key": ["to-number", ["get", "order"]],
    "icon-image": "marker",
    "icon-anchor": "bottom",
    "icon-size": ["get", "size"],
    "icon-allow-overlap": true,
    "icon-offset": ["get", "offset"],
  };
  // const symbolColor = useToken("colors", "blue.500");
  const symbolPaint: SymbolPaint = { "icon-color": ["get", "color"] };
  function scale(
    number: number,
    inMin: number,
    inMax: number,
    outMin: number,
    outMax: number,
  ) {
    return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  }
  return (
    <_Map
      containerStyle={{ width: "100vw", height: "100vh" }}
      style="mapbox://styles/mapbox/dark-v10"
      zoom={MAP_ZOOM}
      center={MAP_CENTER}
      onClick={() => setSelectedShelterIndex(null)}
      onStyleLoad={mapbox =>
        mapbox.loadImage("/assets/marker.png", (error, result) => {
          if (error) {
            console.error("Failed to load map icons", error);
            return;
          }
          if (result) {
            mapbox.addImage("marker", result, { sdf: true });
            setIsStyleLoaded(true);
            return;
          }
        })
      }
    >
      <Geocoder />
      <GeolocateControl />
      <Layer
        type="symbol"
        layout={symbolLayout}
        paint={symbolPaint}
        onMouseEnter={({ target }: MapMouseEvent) => {
          target.getCanvas().style.cursor = "pointer";
        }}
        onMouseLeave={({ target }: MapMouseEvent) => {
          target.getCanvas().style.cursor = "";
        }}
      >
        {shelters.map((shelter, index) => {
          const { id, location, occupancy, capacity } = shelter;
          const fullnessRed = scale(occupancy.beds, 0, capacity.beds, 0, 255);
          const fullnessGreen = scale(occupancy.beds, 0, capacity.beds, 255, 0);
          return (
            <Feature
              key={id + "background"}
              coordinates={location}
              properties={{
                order: index * 2,
                size: 0.6,
                color: `rgb(fullnessRed, fullnessGreen, 0)`,
              }}
            />
          );
        })}
        {shelters.map((shelter, index) => {
          const { id, location, occupancy, capacity } = shelter;
          const fullnessRed = scale(occupancy.beds, 0, capacity.beds, 0, 255);
          const fullnessGreen = scale(occupancy.beds, 0, capacity.beds, 255, 0);
          return (
            <Feature
              key={id}
              coordinates={location}
              onClick={() => setSelectedShelterIndex(index)}
              properties={{
                order: index,
                size: 0.4,
                color: `rgb(fullnessRed, fullnessGreen, 0)`,
                offset: [0, -23],
              }}
            />
          );
        })}
      </Layer>
      {selectedShelter !== null ? (
        <Popup
          anchor="bottom"
          offset={10}
          coordinates={selectedShelter.location}
        >
          <ShelterPopupContent shelterId={selectedShelter.id} />
        </Popup>
      ) : undefined}
    </_Map>
  );
};

export default Map;

const SHELTER_POPUP_QUERY = gql`
  query ShelterPopupQuery($shelterId: ID!) {
    shelter(id: $shelterId) {
      id
      name
      slug
      tags
      about
      occupancy {
        beds
        spots
      }
      capacity {
        beds
        spots
      }
    }
  }
`;

interface ShelterPopupProps extends BoxProps {
  shelterId: string;
}

const ShelterPopupContent: FC<ShelterPopupProps> = ({
  shelterId,
  ...otherProps
}) => {
  const { data, loading: isLoading } = useQuery<
    ShelterPopupQuery,
    ShelterPopupQueryVariables
  >(SHELTER_POPUP_QUERY, {
    variables: {
      shelterId,
    },
    pollInterval: 500,
  });

  const { shelter } = data ?? {};
  const { name, slug, tags, about } = shelter ?? {};

  return (
    <VStack
      align="stretch"
      spacing={5}
      p={2}
      w={72}
      maxH={96}
      overflowY="auto"
      fontSize="md"
      lineHeight="normal"
      {...otherProps}
    >
      {!isLoading ? (
        <>
          <VStack align="stretch" spacing={2}>
            <NextLink href={`/shelter/${slug}`} passHref>
              <Link fontSize="lg" fontWeight="semibold">
                {name}
              </Link>
            </NextLink>
            <Wrap spacing={1}>
              {tags?.map(text => (
                <WrapItem key={text}>
                  <Tag size="sm" colorScheme="blue">
                    {text}
                  </Tag>
                </WrapItem>
              ))}
            </Wrap>
            <Text fontSize="sm" color="gray.600">
              {about}
            </Text>
          </VStack>
          <ShelterStats shelter={shelter} />
          {/* <ShelterStat shelter={shelter} /> */}
          {/* <VStack align="stretch" spacing={1}>
            <Text>Heading 1</Text>
            <Text>Child 1</Text>
          </VStack>
          <VStack align="stretch" spacing={1}>
            <Text>Heading 1</Text>
            <Text>Child 1</Text>
          </VStack>
          <VStack align="stretch" spacing={1}>
            <Text>Heading 1</Text>
            <Text>Child 1</Text>
          </VStack> */}
        </>
      ) : (
        <Center flex={1}>
          <Spinner />
        </Center>
      )}
    </VStack>
  );
};

interface ShelterStatsProps extends BoxProps {
  shelter: ShelterPopupQuery_shelter | undefined | null;
}

const ShelterStats: FC<ShelterStatsProps> = ({ shelter, ...otherProps }) => {
  const { occupancy, capacity } = shelter ?? {};
  const labelColor = useColorModeValue("blue.500", "blue.300");
  return (
    <HStack
      justify="space-evenly"
      bg="gray.200"
      p="3"
      rounded="md"
      {...otherProps}
    >
      <HStack>
        <Text fontWeight="medium" color={labelColor}>
          Spots
        </Text>
        <ShelterStat occupancy={occupancy?.spots} capacity={capacity?.spots} />
      </HStack>
      <HStack>
        <Text fontWeight="medium" color={labelColor}>
          Beds
        </Text>
        <ShelterStat occupancy={occupancy?.beds} capacity={capacity?.beds} />
      </HStack>
    </HStack>
  );
};

type ShelterStatus2Props = {
  shelterId: string;
};

// Map
// render:
// <VStack>
//  {shelters.map(shelter => <ShelterStatus2 shelterId={shelter.id} />)}
// </VStack>
//
// <ShelterStatus2 shelterId="1234" />

// const ShelterStatus2:FC = ({ shelterId }: ShelterStatus2Props) => {
//   const { data } = useQuery(gql`
//     query ShelterStatus2($shelterId: ID!) {
//       shelter(id: $shelterId) {
//         id
//         occupancy {
//           spots
//           beds
//         }
//       }
//     }
//   `, {
//     variables: {
//       shelterId
//     },
//     pollInterval: 500
//   });
//   return 2;
//   // return (
//   //   <VStack>
//   //     <Text>lmao shelter status</Text>
//   //     <Text>lmao shelter status</Text>
//   //     <Text>lmao shelter status</Text>
//   //   </VStack>
//   // );
// };

// type ShelterStatus = {
//   shelterId: string;
// }

// const ShelterStatus = () => {
//   return (
//     <VStack>
//       <ShelterStats />
//     </VStack>,
//   );
// };
