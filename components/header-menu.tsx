import React, { FC } from "react";
import { gql } from "@apollo/client";
import { useLogin, useLogout } from "utils/auth";

import { HiLogout, HiUser } from "react-icons/hi";
import { HiSun, HiMoon } from "react-icons/hi";

import { HStack } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";
import { Text, Icon } from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { MenuProps } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";

import { HeaderMenu_viewer } from "schema";

export const HEADER_MENU_FRAGMENTS = gql`
  fragment HeaderMenu_viewer on User {
    name
    imageUrl
  }
`;

export interface HeaderMenuProps extends Partial<MenuProps> {
  viewer: HeaderMenu_viewer | null | undefined;
}

export const HeaderMenu: FC<HeaderMenuProps> = ({ viewer, ...otherProps }) => {
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
        rounded="full"
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
