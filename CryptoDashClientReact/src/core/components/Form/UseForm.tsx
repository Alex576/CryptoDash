import { useCallback, useMemo, useState } from "react";
import type { FormControl, FormValues } from "./models/FormModels";

export interface FormState {
  controls: FormControl[];
}

export function useForm(controls: FormControl[]) {
  const [formState, setFormState] = useState<FormState>(() => {
    const state: FormState = {
      controls: controls,
    };
    return state;
  });

  const setControlValue = useCallback(
    (control: FormControl, newValue: unknown) => {
      setFormState((prev) => {
        const controlIndex = prev.controls.findIndex(
          (c) => c.id === control.id,
        );
        if (controlIndex < 0) {
          return prev;
        }
        const updatedControl: FormControl = {
          ...control,
          value: newValue,
          settings: {
            ...control.settings,
            isChanged: newValue !== control.value,
          },
        };
        const copy = [...prev.controls];
        copy[controlIndex] = updatedControl;
        return { controls: copy };
      });
    },
    [],
  );

  const getFormValues = useCallback((): FormValues => {
    const values: FormValues = {
      controlsValue: formState.controls.map((c) => {
        return { id: c.id, value: c.value };
      }),
    };
    return values;
  }, [formState]);

  const isFormChanged = useMemo(
    () => formState.controls.some((c) => c.settings.isChanged),
    [formState],
  );

  const isFormValid = useMemo(
    () => !formState.controls.some((c) => c.settings.isInvalid),
    [formState],
  );

  return {
    formState,
    setControlValue,
    getFormValues,
    isFormChanged,
    isFormValid,
  };
}
