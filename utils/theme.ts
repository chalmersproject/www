import { useTheme } from "@chakra-ui/react";
import { transparentize } from "@chakra-ui/theme-tools";

export const useTransparentize = (color: string, opacity: number): string => {
  const theme = useTheme();
  return transparentize(color, opacity)(theme);
};
