import React, { FC } from "react";
import NextLink from "next/link";

import { gql } from "@apollo/client";

import { Box, BoxProps, VStack } from "@chakra-ui/react";
import { Skeleton, SkeletonText } from "@chakra-ui/react";
import { Text, LinkOverlay, LinkBox } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";

import { ShelterMeasure, SignalCard_signal } from "schema";

export const SIGNAL_CARD_FRAGMENTS = gql`
  fragment SignalCard_signal on Signal {
    id
    name
    slug
    measure
    shelter {
      id
      name
    }
    measurements(limit: 1) {
      id
      timestamp
    }
  }
`;

export interface SignalCardProps extends Omit<BoxProps, "onClick"> {
  readonly signal: SignalCard_signal | undefined;
  readonly href?: string;
  readonly onClick?: (signal: SignalCard_signal) => void;
}

export const SignalCard: FC<SignalCardProps> = ({
  signal,
  href,
  onClick,
  ...otherProps
}) => {
  const { name, measure, shelter } = signal ?? {};

  const cardBg = useColorModeValue("gray.100", "gray.700");
  const cardHoverBg = useColorModeValue("blue.50", "gray.600");

  const nameColor = useColorModeValue("gray.900", "gray.100");
  const spanColor = useColorModeValue("gray.600", "gray.300");
  const aboutColor = useColorModeValue("gray.500", "gray.400");

  const renderName = () => {
    if (!name) {
      return (
        <Skeleton>
          <Text fontSize="lg">&nbsp;</Text>
        </Skeleton>
      );
    }
    const element = (
      <Text fontSize="lg" fontWeight="semibold" color={nameColor}>
        {name}
      </Text>
    );
    if (href) {
      return (
        <NextLink href={href} passHref>
          <LinkOverlay>{element}</LinkOverlay>
        </NextLink>
      );
    }
    return element;
  };

  const renderAbout = () => {
    if (!signal || !shelter) {
      return (
        <Box py={1}>
          <SkeletonText noOfLines={1} />
        </Box>
      );
    }
    return (
      <Text color={aboutColor}>
        This signal tracks the{" "}
        <Text as="span" fontWeight="medium" color={spanColor}>
          {measure === ShelterMeasure.BEDS ? "number of beds" : "heacount"}
        </Text>{" "}
        at {shelter.name}.
      </Text>
    );
  };

  return (
    <LinkBox
      href={href}
      onClick={() => {
        if (onClick && signal) {
          onClick(signal);
        }
      }}
      rounded="lg"
      cursor={onClick ? "pointer" : undefined}
      p={4}
      bg={cardBg}
      transition="background-color"
      transitionTimingFunction="ease-in-out"
      transitionDuration="normal"
      _hover={onClick ? { bg: cardHoverBg } : undefined}
      {...otherProps}
    >
      <VStack align="stretch" spacing={signal ? 0 : 1}>
        {renderName()}
        {renderAbout()}
      </VStack>
    </LinkBox>
  );
};
