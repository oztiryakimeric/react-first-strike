import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import PropTypes from "prop-types";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { brown, red, blue, green, yellow } from "@mui/material/colors";
import Cookies from "js-cookie";

import { getConfig } from "common/firebase/Firebase";

const availableColors = {
  brown,
  red,
  blue,
  green,
  yellow,
};

const darkPalette = {
  mode: "dark",
};

const getLightPalette = () => ({
  mode: "light",
  primary: availableColors[getConfig("themeColor").asString()],
});

const ThemeContext = createContext({
  toggleDarkMode: () => {},
});

export function ThemeContextProvider({ children }) {
  const [themeMode, setThemeMode] = useState(() => Cookies.get("themeMode"));

  useEffect(() => {
    Cookies.set("themeMode", themeMode);
  }, [themeMode]);

  const contextValue = useMemo(
    () => ({
      isDark: themeMode === "dark",
      toggleLighting: () =>
        setThemeMode(themeMode === "dark" ? "light" : "dark"),
    }),
    [themeMode]
  );

  const theme = createTheme({
    palette: contextValue.isDark ? darkPalette : getLightPalette(),
  });

  return (
    <ThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
}

ThemeContextProvider.defaultProps = {
  children: null,
};

ThemeContextProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export const useTheme = () => useContext(ThemeContext);
