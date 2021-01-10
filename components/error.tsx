import React, { Component, FC, ReactNode } from "react";
import { formatError } from "utils/error";

import { Box, BoxProps, Text } from "@chakra-ui/react";

export interface ErrorBoxProps extends BoxProps {
  children: Error | string;
}

export const ErrorBox: FC<ErrorBoxProps> = ({ children, ...otherProps }) => (
  <Box px={3} py={2} bg="red.200" rounded="md" {...otherProps}>
    <Text fontSize="sm" color="red.900">
      {typeof children === "string" ? children : formatError(children as Error)}
    </Text>
  </Box>
);

export interface ErrorGuardProps extends BoxProps {
  renderError?: (error: ReactNode) => ReactNode;
}

interface ErrorGuardState {
  error: Error | null;
}

export class ErrorGuard extends Component<ErrorGuardProps, ErrorGuardState> {
  state: ErrorGuardState = {
    error: null,
  };

  static getDerivedStateFromError(error: Error): ErrorGuardState {
    return { error };
  }

  componentDidCatch(error: Error): void {
    console.error(error);
  }

  render(): ReactNode {
    const { children, renderError, ...otherProps } = this.props;
    const { error } = this.state;
    const errorBox = error ? <ErrorBox>{error}</ErrorBox> : null;
    return (
      <Box {...otherProps}>
        {error ? (renderError ? renderError(errorBox) : errorBox) : children}
      </Box>
    );
  }
}
