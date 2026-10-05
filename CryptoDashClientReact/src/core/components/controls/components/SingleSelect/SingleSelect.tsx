import { CommandEmpty, CommandItem } from "#components/ui/command";
import { Field, FieldLabel } from "#components/ui/field";
import { cn } from "#lib/utils";
import type {
  FormControl,
  Item,
} from "@/core/components/Form/models/FormModels";
import { cva, type VariantProps } from "class-variance-authority";
import { CheckIcon } from "lucide-react";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { BaseSelect } from "../BaseSelect/BaseSelect";
import { ControlContext } from "../ControlSwitch";

const fieldVariants = cva("", {
  variants: {
    isChanged: {
      true: "text-orange-400",
      false: "",
    },
  },
});

export interface SingleSelectProps extends VariantProps<typeof fieldVariants> {
  control: FormControl;
  items: Item[];
  isRequired?: boolean;
  isChanged?: boolean;
  value: number;
}

export function SingleSelect({
  control,
  items,
  value,
  isChanged,
}: SingleSelectProps) {
  const { t } = useTranslation();
  const { onValueChanged, onStateChanged } = useContext(ControlContext);
  const [currentValue, setValue] = useState<number>(value);
  const [searchValue, setSearchValue] = useState<string>("");
  const previousValue = useRef<number>(value);

  const filteredItems = useMemo(() => {
    if (!searchValue) {
      return items;
    }
    return items.filter((item) =>
      item.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()),
    );
  }, [items, searchValue]);
  const label = useMemo<string | null>(() => {
    if (!currentValue) {
      return null;
    }
    return items.find((item) => item.id === currentValue)?.name ?? "ERROR";
  }, [currentValue, items]);

  const selectableItems = useMemo(() => {
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

  useEffect(() => {
    if (previousValue.current !== currentValue) {
      onValueChanged(control, currentValue);
      previousValue.current = currentValue;
      onStateChanged(control, { isValid: true, isChanged: true });
    }
  }, [previousValue, currentValue, onValueChanged, control, onStateChanged]);
  return (
    // <div>
    <Field>
      <FieldLabel className={cn(fieldVariants({ isChanged }))}>
        {t(control.name)}
      </FieldLabel>
      <BaseSelect
        label={label}
        onSearchValue={(searchValue: string) => setSearchValue(searchValue)}
      >
        {!filteredItems.length && (
          <CommandEmpty>{t("Control.Combo.NoItems")}</CommandEmpty>
        )}
        {selectableItems}
      </BaseSelect>
    </Field>
    // </div>
  );
}
