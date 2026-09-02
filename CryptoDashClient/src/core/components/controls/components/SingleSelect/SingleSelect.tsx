import { CommandEmpty, CommandItem } from "#components/ui/command";
import type {
  ComboSettings,
  FormControl,
} from "@/core/components/Form/models/FormModels";
import { CheckIcon } from "lucide-react";
import { useContext, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { BaseSelect } from "../BaseSelect/BaseSelect";
import { ControlContext } from "../ControlSwitch";

export interface SingleSelectProps {
  control: FormControl;
  settings: ComboSettings;
  value: number;
}

export function SingleSelect({ control, settings, value }: SingleSelectProps) {
  const { t } = useTranslation();
  const { onValueChanged } = useContext(ControlContext);
  const [currentValue, setValue] = useState<number>(value);
  const [searchValue, setSearchValue] = useState<string>("");
  useEffect(
    () => onValueChanged(control, currentValue),
    [control, currentValue, onValueChanged],
  );

  const filteredItems = useMemo(() => {
    if (!searchValue) {
      return settings.items;
    }
    return settings.items.filter((item) =>
      item.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()),
    );
  }, [searchValue, settings]);
  const label = useMemo<string>(() => {
    if (!currentValue) {
      return t(control.name);
    }
    return (
      settings.items.find((item) => item.id === currentValue)?.name ?? "ERROR"
    );
  }, [currentValue, t, control, settings]);

  const items = useMemo(() => {
    return filteredItems.map((item) => (
      <CommandItem key={item.id} onSelect={() => setValue(item.id)}>
        {currentValue === item.id && (
          <div className="mr-2 flex h-4 w-4 items-center justify-center">
            <CheckIcon />
          </div>
        )}
        <span>{item.name}</span>
      </CommandItem>
    ));
  }, [currentValue, filteredItems]);

  return (
    <div>
      <BaseSelect
        label={label}
        onSearchValue={(searchValue: string) => setSearchValue(searchValue)}
      >
        {!filteredItems.length && (
          <CommandEmpty>{t("Control.Combo.NoItems")}</CommandEmpty>
        )}
        {items}
      </BaseSelect>
    </div>
  );
}
