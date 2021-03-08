import React, { FC } from "react";

import { Box, BoxProps } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";

export interface EmptyPlaceholderProps extends BoxProps {}

export const EmptyPlaceholder: FC<EmptyPlaceholderProps> = ({
  children,
  ...otherProps
}) => {
  const bg = useColorModeValue("gray.100", "gray.600");
  const color = useColorModeValue("gray.500", "gray.300");
  const renderContent = () => {
    if (!children) {
      children = "No items.";
    }
    if (typeof children === "string") {
      return (
        <Text color={color} fontWeight="medium">
          {children}
        </Text>
      );
    }
    return children;
  };
  return (
    <Box rounded="md" p={4} bg={bg} {...otherProps}>
      {renderContent()}
    </Box>
  );
};
