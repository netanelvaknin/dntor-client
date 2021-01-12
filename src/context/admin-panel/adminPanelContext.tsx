import { createContext } from "react";

type adminPanelContextType =
  | {
      activeNavItem: "יומן תורים" | "קביעת תור" | "חסימת תור";
      setActiveNavItem: (
        string: "יומן תורים" | "קביעת תור" | "חסימת תור"
      ) => void;
    }
  | undefined;

export default createContext<adminPanelContextType>(undefined);
