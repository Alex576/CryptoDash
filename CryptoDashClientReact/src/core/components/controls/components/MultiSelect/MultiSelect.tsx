import { useContext, useEffect, useMemo, useRef, useState } from "react";

import { CommandEmpty, CommandItem } from "#components/ui/command";
import { Field, FieldLabel } from "#components/ui/field";
import { cn } from "#lib/utils";
import type {
  FormControl,
  Item,
} from "@/core/components/Form/models/FormModels";
import { isEqualArray } from "@/core/utils";
import { CheckIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { BaseSelect } from "../BaseSelect/BaseSelect";
import { ControlContext } from "../ControlSwitch";

export interface MultiSelectProps {
  control: FormControl;
  items: Item[];
  isRequired?: boolean;
  isChanged?: boolean;
  value: number[];
}

export function MultiSelect({
  control,
  value,
  items,
  isRequired,
  isChanged,
}: MultiSelectProps) {
  const { t } = useTranslation();
  const { onValueChanged, onStateChanged } = useContext(ControlContext);
  const [currentValue, setValue] = useState<number[]>(value);
  const [searchValue, setSearchValue] = useState<string>("");
  const previousValue = useRef<number[]>(value);

  // useEffect(
  //   () => onValueChanged(control, currentValue),
  //   [control, currentValue, onValueChanged],
  // );
  const filteredItems = useMemo(() => {
    if (!searchValue) {
      return items;
    }
    return items.filter((item) =>
      item.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()),
    );
  }, [items, searchValue]);
  const label = useMemo<string | null>(() => {
    if (!currentValue.length) {
      return null;
    }
    const selectedItems = currentValue
      .slice(0, 3)
      .map((v) => items.find((item) => item.id === v)?.name)
      .join(", ");
    const otherItemsCount = currentValue.length - 3;
    return (
      // <div>
      selectedItems +
      (otherItemsCount > 0 ? ` +${otherItemsCount.toString()}` : "")
      // </div>
    );
  }, [currentValue, items]);

  const toggleOption = (currentValue: number[], id: number) => {
    if (currentValue.includes(id)) {
      setValue(currentValue.filter((x) => x !== id));
    } else {
      setValue([...currentValue, id]);
    }
  };

  const toggleAll = () => {
    if (currentValue.length !== items.length) {
      setValue(items.map((x) => x.id));
    } else {
      setValue([]);
    }
  };
  const selectableItems = useMemo(() => {
    return filteredItems.map((item) => (
      <CommandItem
        key={item.id}
        onSelect={() => toggleOption(currentValue, item.id)}
      >
        <div
          className={cn(
            "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
            currentValue.includes(item.id)
              ? "bg-primary text-primary-foreground"
              : "opacity-50 [&_svg]:invisible",
          )}
        >
          <CheckIcon />
        </div>
        <span>{item.name}</span>
      </CommandItem>
    ));
  }, [filteredItems, currentValue]);

  const showSelectAll = !!filteredItems.length;

  useEffect(() => {
    if (!isEqualArray(previousValue.current, currentValue)) {
      onValueChanged(control, currentValue);
      previousValue.current = currentValue;
      onStateChanged(control, { isValid: true, isChanged: true });
    }
  }, [previousValue, currentValue, onValueChanged, control, onStateChanged]);

  return (
    // <div>
    <Field>
      <FieldLabel>{t(control.name)}</FieldLabel>
      <BaseSelect
        label={label}
        onSearchValue={(searchValue: string) => setSearchValue(searchValue)}
      >
        {!filteredItems.length && (
          <CommandEmpty>{t("Control.Combo.NoItems")}</CommandEmpty>
        )}
        {showSelectAll && (
          <CommandItem
            key="all"
            forceMount={showSelectAll}
            onSelect={toggleAll}
          >
            <div
              className={cn(
                "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                currentValue.length === items.length
                  ? "bg-primary text-primary-foreground"
                  : "opacity-50 [&_svg]:invisible",
              )}
            >
              <CheckIcon />
            </div>
            <span>{t("Control.Combo.SelectAll")}</span>
          </CommandItem>
        )}
        {selectableItems}
      </BaseSelect>
    </Field>

    // </div>
  );
}
