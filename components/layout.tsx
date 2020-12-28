import React, { FC } from "react";

import { Title } from "components/head";
import { Header } from "components/header";

import { Box, BoxProps, VStack } from "@chakra-ui/react";

export interface LayoutProps extends BoxProps {
  title?: string;
}

export const Layout: FC<LayoutProps> = ({ title, children, ...otherProps }) => (
  <>
    {title && <Title>{title}</Title>}
    <Box minH="screen" {...otherProps}>
      <Header />
      <VStack as="main" align="stretch">
        {children}
      </VStack>
    </Box>
  </>
);