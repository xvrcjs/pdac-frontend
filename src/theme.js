import { createContext, useState, useMemo} from "react";
import { createTheme } from "@mui/material/styles";
import Cookies from 'js-cookie';

// color design tokens export
export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        primary: {
          500: "#1a2132",
        },
      }
    : {
        primary: {
          500: "#41edf7",
        },
      }),
});

// mui theme settings
export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              main: colors.primary[500],
            }
          }
        : {
            // palette values for light mode
            primary: {
              main: colors.primary[500],
            }
          }),
    },
  };
};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});


export const useMode = () => {
    const [mode, setMode] = useState(Cookies.get("theme"));
    const colorMode = useMemo(
      () => ({
        toggleColorMode: () => {
          const newMode = mode === "light" ? "dark" : "light";
          setMode(newMode);
          Cookies.set("theme", newMode,{ expires: 365, sameSite: "Lax" });
        },
      }),
      [mode]
    );

  
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
    return [theme, colorMode];
  };