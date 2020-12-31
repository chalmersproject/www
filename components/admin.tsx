import React, { FC } from "react";
import { gql } from "@apollo/client";

import { Box, BoxProps } from "@chakra-ui/react";
import { ErrorBox } from "components/error";

import { AdminGuard_viewer } from "schema";

export const ADMIN_GUARD_FRAGMENTS = gql`
  fragment AdminGuard_viewer on User {
    isAdmin
  }
`;

export interface AdminGuardProps extends BoxProps {
  viewer: AdminGuard_viewer | null | undefined;
}

export const AdminGuard: FC<AdminGuardProps> = ({
  viewer,
  children,
  ...otherProps
}) => {
  const renderContent = () => {
    if (viewer === undefined) {
      return children;
    }
    if (viewer === null) {
      return <ErrorBox>Not authenticated.</ErrorBox>;
    }
    if (viewer.isAdmin) {
      return children;
    }
    return <ErrorBox>Not authorized.</ErrorBox>;
  };
  return <Box {...otherProps}>{renderContent()}</Box>;
};
