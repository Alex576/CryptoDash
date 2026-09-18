import type { FormControl } from "@/core/components/Form/models/FormModels";
import { createContext } from "react";

export const ControlContext = createContext<{
  onValueChanged: (_control: FormControl, _value: unknown) => void;
  onStateChanged: (
    _control: FormControl,
    _state: { isValid: boolean; isChanged: boolean },
  ) => void;
}>({
  onValueChanged: function (_control: FormControl, _value: unknown): void {
    throw new Error("Function not implemented.");
  },
  onStateChanged: function (
    _control: FormControl,
    _state: { isValid: boolean; isChanged: boolean },
  ): void {
    throw new Error("Function not implemented.");
  },
});
