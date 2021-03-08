import { useToast as useChakraToast } from "@chakra-ui/react";
import { UseToastOptions as UseChakraToastOptions } from "@chakra-ui/react";

export type UseToastOptions = UseChakraToastOptions;

export const useToast = (
  options?: UseToastOptions,
): ReturnType<typeof useChakraToast> => {
  return useChakraToast({
    position: "bottom",
    duration: 3500,
    isClosable: true,
    ...options,
  });
};
