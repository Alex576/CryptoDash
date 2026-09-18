import { createContext } from "react";

export const SidePanelContext = createContext<{
  setCloseState: (_canClose: boolean) => void;
  requestClose: () => void;
  actionsRef: HTMLDivElement | null;
}>({
  setCloseState: function (_canClose: boolean): void {
    throw new Error("Function not implemented.");
  },
  requestClose: function (): void {
    throw new Error("Function not implemented.");
  },
  actionsRef: null,
});
