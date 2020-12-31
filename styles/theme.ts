import { extendTheme } from "@chakra-ui/react";
import { getColor, mode } from "@chakra-ui/theme-tools";
import {
  coolGray,
  amber,
  emerald,
  teal,
  blue,
  indigo,
  violet,
  pink,
  rose,
} from "tailwindcss/colors";

const THEME = extendTheme({
  colors: {
    gray: coolGray,
    red: rose,
    yellow: amber,
    green: emerald,
    teal,
    blue,
    indigo,
    purple: violet,
    pink,
  },
  fonts: {
    body:
      "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif",
    heading:
      "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif",
  },
  space: {
    0.5: "0.125rem",
    1.5: "0.375rem",
    2.5: "0.625rem",
    3.5: "0.875rem",
  },
  sizes: {
    0.5: "0.125rem",
    1.5: "0.375rem",
    2.5: "0.625rem",
    3.5: "0.875rem",
  },
  styles: {
    global: {
      html: {
        WebkitFontSmoothing: "auto",
      },
    },
  },
  components: {
    Checkbox: {
      defaultProps: {
        colorScheme: "pink",
      },
    },
    FormLabel: {
      baseStyle: {
        mb: 1,
      },
    },
    Input: {
      variants: {
        outline: (props: Record<string, any>) => {
          const { focusBorderColor, theme } = props;
          const color = focusBorderColor || mode("pink.500", "pink.300")(props);
          return {
            field: {
              _focus: {
                borderColor: getColor(theme, color),
                boxShadow: `0 0 0 1px ${getColor(theme, color)}`,
              },
            },
          };
        },
      },
    },
    NumberInput: {
      variants: {
        outline: (props: Record<string, any>) => {
          const { focusBorderColor, theme } = props;
          const color = focusBorderColor || mode("pink.500", "pink.300")(props);
          return {
            field: {
              _focus: {
                borderColor: getColor(theme, color),
                boxShadow: `0 0 0 1px ${getColor(theme, color)}`,
              },
            },
          };
        },
      },
    },
    Radio: {
      defaultProps: {
        colorScheme: "pink",
      },
    },
    Textarea: {
      variants: {
        outline: (props: Record<string, any>) => {
          const { focusBorderColor, theme } = props;
          const color = focusBorderColor || mode("pink.500", "pink.300")(props);
          return {
            _focus: {
              borderColor: getColor(theme, color),
              boxShadow: `0 0 0 1px ${getColor(theme, color)}`,
            },
          };
        },
      },
    },
  },
});

export default THEME;
