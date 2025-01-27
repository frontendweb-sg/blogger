"use client";
import { createContext } from "react";
import ThemeProvider from "./theme";
import { SessionProvider } from "@/auth";
interface AppContextType {}

export const AppContext = createContext<AppContextType>({});

export default function AppProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider>{children}</ThemeProvider>
    </SessionProvider>
  );
}
