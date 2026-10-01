import {
  ControlType,
  type ComboSettings,
  type FormControl,
} from "@/core/components/Form/models/FormModels";
import { ControlContext } from ".";
import { InputField } from "../InputField";
import { MultiSelect } from "../MultiSelect";
import { SingleSelect } from "../SingleSelect";

export interface ControlSwitchProps {
  control: FormControl;
  onControlValueChanged: (_control: FormControl, _value: unknown) => void;
  onStateChanged: (
    _control: FormControl,
    _state: { isValid: boolean; isChanged: boolean },
  ) => void;
}

export function ControlSwitch({
  control,
  onControlValueChanged,
  onStateChanged: onControlStateChanged,
}: ControlSwitchProps) {
  const controlSwitch = () => {
    switch (control.type) {
      case ControlType.Combo: {
        const settings = control.settings as ComboSettings;
        if (settings.allowMultiple) {
          return (
            <MultiSelect
              control={control}
              value={control.value as number[]}
              {...settings}
            />
          );
        } else {
          return (
            <SingleSelect
              control={control}
              value={control.value as number}
              {...settings}
            />
          );
        }
      }
      case ControlType.Input:
        return (
          <InputField
            control={control}
            settings={control.settings}
            value={control.value as string}
          />
        );
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
        onStateChanged: (control, state) => {
          onControlStateChanged(control, state);
        },
      }}
    >
      {controlSwitch()}
    </ControlContext>
  );
}
