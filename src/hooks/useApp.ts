import { AppContext } from "@/providers/app";
import { use } from "react";

export function useApp() {
  const context = use(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
