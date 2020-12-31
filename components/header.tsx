import React, { FC, ReactNode } from "react";
import { useQuery, gql } from "@apollo/client";
import { useLogin, useLogout } from "utils/auth";

import isEmpty from "lodash/isEmpty";
import flattenChildren from "react-flatten-children";

import { HiLogout, HiUser } from "react-icons/hi";
import { HiSun, HiMoon } from "react-icons/hi";

import { BoxProps, HStack, Spacer } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";
import { Text, Icon } from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { MenuProps } from "@chakra-ui/react";
import { Breadcrumb } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";

import { HeaderQuery } from "schema";
import { HeaderMenu_viewer } from "schema";
import { useFirebaseUser } from "services/firebase";

const HEADER_MENU_FRAGMENTS = gql`
  fragment HeaderMenu_viewer on User {
    name
    imageUrl
  }
`;

interface HeaderMenuProps extends Partial<MenuProps> {
  viewer: HeaderMenu_viewer | null | undefined;
}

const HeaderMenu: FC<HeaderMenuProps> = ({ viewer, ...otherProps }) => {
  const { name, imageUrl } = viewer ?? {};
  const login = useLogin();
  const logout = useLogout();

  const { colorMode, toggleColorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";

  return (
    <Menu {...otherProps}>
      <MenuButton
        as={Button}
        isDisabled={viewer === undefined}
        p={1}
        borderRadius="full"
        bg="pink.300"
        _hover={{ bg: "pink.400" }}
        _active={{ bg: "pink.400" }}
      >
        <Avatar name={name} src={imageUrl ?? undefined} size="sm" />
      </MenuButton>
      <MenuList>
        {viewer ? (
          <>
            <MenuItem
              onClick={logout!}
              isDisabled={!logout}
              fontWeight="medium"
            >
              <HStack>
                <Icon as={HiLogout} />
                <Text fontWeight="medium">Logout</Text>
              </HStack>
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem onClick={login!} isDisabled={!login}>
              <HStack>
                <Icon as={HiUser} />
                <Text fontWeight="medium">Login</Text>
              </HStack>
            </MenuItem>
          </>
        )}
        <MenuItem onClick={toggleColorMode} fontWeight="medium">
          <HStack>
            <Icon as={isDarkMode ? HiSun : HiMoon} />
            <Text fontWeight="medium">
              {isDarkMode ? "Light" : "Dark"} Mode
            </Text>
          </HStack>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

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
  crumbs?: ReactNode;
}

export const Header: FC<HeaderProps> = ({ crumbs, ...otherProps }) => {
  const user = useFirebaseUser();

  const { data } = useQuery<HeaderQuery>(HEADER_QUERY, {
    skip: user === undefined,
  });
  const { viewer } = data ?? {};

  return (
    <HStack py={4} px={8} {...otherProps}>
      {!isEmpty(crumbs) && (
        <Breadcrumb py={0.5} px={2} borderRadius="md" bg="pink.50">
          {flattenChildren(crumbs)}
        </Breadcrumb>
      )}
      <Spacer />
      <HeaderMenu viewer={viewer} />
    </HStack>
  );
};
