import React, { FC } from "react";

import { Title } from "components/head";
import { Header, HeaderProps } from "components/header";

import { Flex, BoxProps, VStack } from "@chakra-ui/react";

export interface LayoutProps extends BoxProps, Pick<HeaderProps, "crumbs"> {
  title?: string;
}

export const Layout: FC<LayoutProps> = ({
  title,
  crumbs,
  children,
  ...otherProps
}) => (
  <>
    <Title>{title}</Title>
    <Flex direction="column" minH="100vh">
      <Header crumbs={crumbs} />
      <VStack as="main" align="stretch" {...otherProps}>
        {children}
      </VStack>
    </Flex>
  </>
);
