import { createContext } from "react";
import type { Theme } from "./Theme";

export type ThemeProviderState = {
  theme: Theme;
  setTheme: (_theme: Theme) => void;
  nextTheme: (_theme: Theme) => Theme;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
  nextTheme: (): Theme => "system",
};
export const ThemeProviderContext =
  createContext<ThemeProviderState>(initialState);
