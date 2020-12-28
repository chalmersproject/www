import React, { FC } from "react";
import { gql, useQuery } from "@apollo/client";

import { BoxProps, Button, HStack, Spacer } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import type { MenuProps } from "@chakra-ui/react";

import { useLogin, useLogout } from "services/auth";

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
  loading: boolean;
}

const HeaderMenu: FC<HeaderMenuProps> = ({
  viewer: user,
  loading,
  ...otherProps
}) => {
  const login = useLogin();
  const logout = useLogout();
  const { name, imageUrl } = user ?? {};
  return (
    <Menu {...otherProps}>
      <MenuButton
        as={Button}
        isDisabled={loading}
        p={1}
        h="inherit"
        borderRadius="full"
        bg="pink.200"
        _active={{ bg: "pink.400" }}
      >
        <Avatar name={name} src={imageUrl ?? undefined} size="sm" />
      </MenuButton>
      <MenuList>
        {user ? (
          <>
            <MenuItem onClick={logout!} isDisabled={!logout}>
              Logout
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem onClick={login!} isDisabled={!login}>
              Login
            </MenuItem>
          </>
        )}
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
      <HeaderMenu viewer={viewer} loading={loading} />
    </HStack>
  );
};
