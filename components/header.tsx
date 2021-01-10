import React, { FC, ReactNode } from "react";
import { useQuery, gql } from "@apollo/client";
import { useFirebaseUser } from "services/firebase";

import isEmpty from "lodash/isEmpty";
import flattenChildren from "react-flatten-children";

import { BoxProps, HStack, Spacer } from "@chakra-ui/react";
// import { Image } from "@chakra-ui/react";
import { Breadcrumb } from "@chakra-ui/react";
import { useBreakpointValue, useColorModeValue } from "@chakra-ui/react";

import { HeaderMenu } from "components/header-menu";
import { HEADER_MENU_FRAGMENTS } from "components/header-menu";

import { HeaderQuery } from "schema";
import { useTransparentize } from "utils/theme";

const HEADER_QUERY = gql`
  query HeaderQuery {
    viewer {
      id
      ...HeaderMenu_viewer
    }
  }

  ${HEADER_MENU_FRAGMENTS}
`;

export interface HeaderProps extends BoxProps {
  breadcrumbs?: ReactNode;
}

export const Header: FC<HeaderProps> = ({ breadcrumbs, ...otherProps }) => {
  const user = useFirebaseUser();

  const { data } = useQuery<HeaderQuery>(HEADER_QUERY, {
    skip: user === undefined,
  });
  const { viewer } = data ?? {};

  const breadcrumbBgDark = useTransparentize("pink.200", 0.16);
  const breadcrumbBg = useColorModeValue("pink.100", breadcrumbBgDark);
  const breadcrumbHidden = useBreakpointValue([true, false]);

  return (
    <HStack as="header" spacing={3} h={20} px={[4, null, 8]} {...otherProps}>
      {/* <Logo /> */}
      {!isEmpty(breadcrumbs) && !breadcrumbHidden && (
        <Breadcrumb py={0.5} px={2} rounded="md" bg={breadcrumbBg}>
          {flattenChildren(breadcrumbs)}
        </Breadcrumb>
      )}
      <Spacer />
      <HeaderMenu viewer={viewer} />
    </HStack>
  );
};

// export const Logo: FC = () => (
//   <Image src="/assets/logo.svg" alt="Logo" boxSize={9} rounded="full" />
// );
