import React, { FC, useMemo, useState } from "react";
import NextLink from "next/link";
import isEmpty from "lodash/isEmpty";
import { gql, useQuery } from "@apollo/client";

import {
  Box,
  BoxProps,
  VStack,
  HStack,
  Center,
  Spacer,
} from "@chakra-ui/react";
import { SimpleGrid } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import { Text, Link } from "@chakra-ui/react";
import { Wrap, WrapItem } from "@chakra-ui/react";
import { Tag } from "@chakra-ui/react";
import { useToken, useColorModeValue } from "@chakra-ui/react";

import { Map as _Map, Layer, Feature, Popup } from "components/mapbox";
import { Geocoder, GeolocateControl } from "components/mapbox";
import { MapMouseEvent, SymbolLayout, SymbolPaint } from "mapbox-gl";
import { MapLayerMouseEvent } from "mapbox-gl";
import { ShelterStat } from "components/shelter-stat";

import { MapQuery, MapQuery_shelters } from "schema";

import {
  ShelterPopupQuery,
  ShelterPopupQueryVariables,
  ShelterPopupQuery_shelter,
} from "schema";

const MAP_QUERY = gql`
  query MapQuery {
    shelters {
      id
      location
    }
  }
`;

const MAP_ZOOM: [number] = [13];
const MAP_CENTER: [number, number] = [-79.39555984248707, 43.662375544140225];

const Map: FC = () => {
  const [, setIsStyleLoaded] = useState(false); // TODO: Figure out why this is necessary for markers to show up.

  const { data } = useQuery<MapQuery>(MAP_QUERY);
  const shelters = data?.shelters ?? [];

  const [selectedShelterIndex, setSelectedShelterIndex] = useState<
    number | null
  >(null);
  const selectedShelter = useMemo(
    () =>
      selectedShelterIndex !== null ? shelters[selectedShelterIndex] : null,
    [shelters, selectedShelterIndex],
  );

  const symbolLayout: SymbolLayout = {
    "icon-image": "marker",
    "icon-anchor": "bottom",
    "icon-size": 0.25,
  };
  const symbolColor = useToken("colors", "red.500");
  const symbolPaint: SymbolPaint = { "icon-color": symbolColor };

  return (
    <_Map
      containerStyle={{ width: "100vw", height: "100vh" }}
      style="mapbox://styles/mapbox/dark-v10"
      zoom={MAP_ZOOM}
      center={MAP_CENTER}
      onClick={() => setSelectedShelterIndex(null)}
      onStyleLoad={map =>
        map.loadImage("/assets/marker.png", (error, result) => {
          if (error) {
            console.error("Failed to load map icons", error);
            return;
          }
          if (result) {
            map.addImage("marker", result, { sdf: true });
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
        {shelters.map(({ id, location }, index) => (
          <Feature
            key={id}
            coordinates={location}
            onClick={() => setSelectedShelterIndex(index)}
          />
        ))}
      </Layer>
      {selectedShelter !== null ? (
        <Popup
          anchor="bottom"
          offset={10}
          coordinates={selectedShelter.location}
        >
          <ShelterPopup shelterId={selectedShelter.id} />
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

const ShelterPopup: FC<ShelterPopupProps> = ({ shelterId, ...otherProps }) => {
  const { data, loading: isLoading } = useQuery<
    ShelterPopupQuery,
    ShelterPopupQueryVariables
  >(SHELTER_POPUP_QUERY, {
    variables: {
      shelterId,
    },
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

  const headingColor = useColorModeValue("gray.800", "gray.200");
  const labelColor = useColorModeValue("blue.500", "blue.300");

  return (
    <HStack
      columns={2}
      spacingX={5}
      spacingY={2}
      templateColumns="auto 10rem"
      bg={"gray.200"}
      p={"3"}
      rounded={"md"}
      {...otherProps}
    >
      <Text fontWeight="medium" color={labelColor}>
        Spots
      </Text>
      <ShelterStat occupancy={occupancy?.spots} capacity={capacity?.spots} />
      <Spacer />
      <Text fontWeight="medium" color={labelColor}>
        Beds
      </Text>
      <ShelterStat occupancy={occupancy?.beds} capacity={capacity?.beds} />
    </HStack>
  );
};
