import { useEffect, useState } from "react";

export const useColorScheme = () => {
  const [colorScheme, setColorScheme] = useState<"dark" | "light">("light");

  const toggleColorScheme = () => {
    setColorScheme((prev) => (prev === "dark" ? "light" : "dark"));
  };
  const systemColorScheme = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches
    ? "dark"
    : "light";

  useEffect(() => {
    const savedColorScheme = localStorage.getItem("color-scheme") as
      | "dark"
      | "light"
      | null;
    if (systemColorScheme || savedColorScheme) {
      setColorScheme(systemColorScheme || savedColorScheme);
    }
  }, [systemColorScheme]);

  useEffect(() => {
    localStorage.setItem("color-scheme", colorScheme);
  }, [colorScheme]);

  return { colorScheme, toggleColorScheme };
};
