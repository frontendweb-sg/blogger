import React, {
  createContext,
  useCallback,
  useMemo,
  useState,
  useEffect,
} from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  setTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  setTheme: () => {},
});

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // State initialized by reading from localStorage once on mount
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Handle theme toggle with a callback to update both state and localStorage
  const handleTheme = useCallback(() => {
    const newTheme = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  }, [theme]);

  // Memoize context value to prevent unnecessary re-renders of consuming components
  const value = useMemo(
    () => ({ theme, setTheme: handleTheme }),
    [theme, handleTheme]
  );

  useEffect(() => {
    // Apply the theme class to the <html> element
    if (theme === "dark") {
      document.documentElement.classList.add("dark"); // Add dark mode class to <html>
    } else {
      document.documentElement.classList.remove("dark"); // Remove dark mode class
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
