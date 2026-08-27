import { Select } from "#components/ui/select";
import { ControlType, type FormControl } from "./models/FormModels";

export interface FormProps {
  onValidateChange?: () => boolean;
  controls: FormControl[];
}

export function Form({ onValidateChange, controls }: FormProps) {
  return (
    <div className="flex flex-col gap-1 flex-nowrap h-full w-full">
      {controls.map((control) => {
        if (control.type === ControlType.Combo) {
          return (
            <Select
            // items={(control.settings as ComboSettings)?.items ?? []}
            ></Select>
          );
        }
      })}
    </div>
  );
}
