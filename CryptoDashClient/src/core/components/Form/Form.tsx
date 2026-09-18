import { useEffect } from "react";
import { ControlSwitch } from "../controls/components";
import { useForm } from "./UseForm";
import { type FormControl, type FormValues } from "./models/FormModels";

export interface FormProps {
  onFormStateChange?: (_state: { isChanged: boolean }) => void;
  onCanSaveForm: (_canSave: boolean) => void;
  onFormValueChanged: (_formValues: FormValues) => void;
  controls: FormControl[];
  isLoading?: boolean;
}

export function Form({
  onFormStateChange,
  onCanSaveForm,
  onFormValueChanged,
  controls,
  isLoading,
}: FormProps) {
  const {
    formState,
    setControlValue,
    getFormValues,
    isFormChanged,
    isFormValid,
  } = useForm(controls);

  useEffect(() => {
    if (onFormStateChange) onFormStateChange({ isChanged: isFormChanged });
  }, [isFormChanged, onFormStateChange]);

  useEffect(
    () => onCanSaveForm(isFormValid && isFormChanged),
    [isFormChanged, isFormValid, onCanSaveForm],
  );
  useEffect(() => {
    if (isFormChanged && isFormValid) {
      onFormValueChanged(getFormValues());
    }
  }, [getFormValues, isFormChanged, isFormValid, onFormValueChanged]);

  return (
    <div className="flex flex-col gap-3 flex-nowrap h-full w-full group/form px-5">
      {/* {isLoading && <Loading />} */}
      {formState.controls.map((control) => {
        return (
          <ControlSwitch
            key={control.id}
            control={control}
            onControlValueChanged={(control: FormControl, value: unknown) => {
              setControlValue(control, value);
            }}
            onStateChanged={(
              _control: FormControl,
              _state: { isValid: boolean; isChanged: boolean },
            ) => {}}
          />
        );
      })}
    </div>
  );
}
