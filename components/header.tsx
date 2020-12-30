import React, { FC } from "react";
import { gql, useQuery } from "@apollo/client";

import { HiLogout, HiUser } from "react-icons/hi";
import { HiSun, HiMoon } from "react-icons/hi";

import { BoxProps, HStack, Icon, Spacer } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { MenuProps } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";

import { useLogin, useLogout } from "utils/auth";

import { HeaderQuery } from "schema";
import { HeaderMenu_viewer } from "schema";

const HEADER_MENU_FRAGMENTS = gql`
  fragment HeaderMenu_viewer on User {
    name
    imageUrl
  }
`;

interface HeaderMenuProps extends Partial<MenuProps> {
  viewer: HeaderMenu_viewer | null | undefined;
  isLoading: boolean;
}

const HeaderMenu: FC<HeaderMenuProps> = ({
  viewer,
  isLoading,
  ...otherProps
}) => {
  const { name, imageUrl } = viewer ?? {};
  const login = useLogin();
  const logout = useLogout();

  const { colorMode, toggleColorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";

  return (
    <Menu {...otherProps}>
      <MenuButton
        as={Button}
        isDisabled={isLoading}
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

export interface HeaderProps extends BoxProps {}

export const Header: FC<HeaderProps> = ({ ...otherProps }) => {
  const { data, loading } = useQuery<HeaderQuery>(HEADER_QUERY, {});
  const { viewer } = data ?? {};
  return (
    <HStack p={4} {...otherProps}>
      <Spacer />
      <HeaderMenu viewer={viewer} isLoading={loading} />
    </HStack>
  );
};
