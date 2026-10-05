import { Field, FieldLabel } from "#components/ui/field";
import { Input } from "#components/ui/input";
import type {
  FormControl,
  InputSettings,
} from "@/core/components/Form/models/FormModels";

import { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ControlContext } from "../ControlSwitch";
export interface InputProps extends React.ComponentProps<"input"> {
  control: FormControl;
  settings: InputSettings;
  value: string;
}

export function InputField({ control, settings, value, ...props }: InputProps) {
  const { t } = useTranslation();
  const { onValueChanged, onStateChanged } = useContext(ControlContext);
  const [currentValue, setCurrentValue] = useState<string>(value);
  const previousValue = useRef<string>(value);

  useEffect(() => {
    if (previousValue.current !== currentValue) {
      onValueChanged(control, currentValue);
      previousValue.current = currentValue;
      onStateChanged(control, { isValid: true, isChanged: true });
    }
  }, [previousValue, currentValue, onValueChanged, control, onStateChanged]);

  const controlName = t(control.name);
  return (
    <Field>
      <FieldLabel>{controlName}</FieldLabel>
      <Input
        className="placeholder:italic"
        type="text"
        placeholder={controlName}
        value={currentValue}
        onChange={(e) => setCurrentValue(e.target.value)}
        {...props}
      />
    </Field>
  );
}
