import React, { FC } from "react";

import { ChakraProvider as Provider } from "@chakra-ui/react";
import THEME from "styles/theme";

export const ChakraProvider: FC = ({ children }) => (
  <Provider theme={THEME}>{children}</Provider>
);
