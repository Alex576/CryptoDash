import {
  ControlType,
  type ComboSettings,
  type FormControl,
} from "@/core/components/Form/models/FormModels";
import { ControlContext } from ".";
import { MultiSelect } from "../MultiSelect";
import { SingleSelect } from "../SingleSelect";

export interface ControlSwitchProps {
  control: FormControl;
  onControlValueChanged: (_control: FormControl, _value: unknown) => void;
}

export function ControlSwitch({
  control,
  onControlValueChanged,
}: ControlSwitchProps) {
  const controlSwitch = () => {
    switch (control.type) {
      case ControlType.Combo: {
        const settings = control.settings as ComboSettings;
        if (settings.isMultiple) {
          return (
            <MultiSelect
              control={control}
              settings={settings}
              value={control.value as number[]}
            />
          );
        } else {
          return (
            <SingleSelect
              control={control}
              settings={settings}
              value={control.value as number}
            />
          );
        }
      }
      case ControlType.Input:
      case ControlType.Toggle:
      default:
        console.error(`Not implemented switch case for type ${control.type}`);
        break;
    }
  };
  return (
    <ControlContext
      value={{
        onValueChanged: onControlValueChanged,
      }}
    >
      {controlSwitch()}
    </ControlContext>
  );
}
