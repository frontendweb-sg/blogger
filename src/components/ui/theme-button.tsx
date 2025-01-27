"use client";

import { useTheme } from "@/hooks/useTheme";
import { MoonIcon, Sun } from "lucide-react";

export function ThemeButton() {
  const { theme, setTheme } = useTheme();
  return (
    <button onClick={setTheme}>
      {theme === "dark" ? <MoonIcon size={24} /> : <Sun size={24} />}
    </button>
  );
}
