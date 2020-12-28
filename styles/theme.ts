import { extendTheme } from "@chakra-ui/react";
// import { mode } from "@chakra-ui/theme-tools";
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
  styles: {
    global: {
      html: {
        WebkitFontSmoothing: "auto",
      },
    },
  },
  components: {
    FormLabel: {
      baseStyle: {
        marginBottom: 1,
      },
    },
    Menu: {},
  },
});

export default THEME;
