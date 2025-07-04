import React, { createContext, useContext, useState, useMemo } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const value = useMemo(
    () => ({
      isDarkMode,
      toggleTheme,
      themeStyles: {
        backgroundColor: isDarkMode ? "#0e1628" : "#f4f4f4",
        textColor: isDarkMode ? "#fff" : "#000",
        cardBg: isDarkMode ? "#2e3a59" : "#fff",
      },
    }),
    [isDarkMode]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useThemeMode = () => useContext(ThemeContext);
