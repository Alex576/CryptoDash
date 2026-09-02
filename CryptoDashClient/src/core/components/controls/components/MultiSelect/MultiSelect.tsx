import { useContext, useEffect, useMemo, useState } from "react";

import { CommandEmpty, CommandItem } from "#components/ui/command";
import { cn } from "#lib/utils";
import type {
  ComboSettings,
  FormControl,
} from "@/core/components/Form/models/FormModels";
import { CheckIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { BaseSelect } from "../BaseSelect/BaseSelect";
import { ControlContext } from "../ControlSwitch";

export interface MultiSelectProps {
  control: FormControl;
  settings: ComboSettings;
  value: number[];
}

export function MultiSelect({ control, settings, value }: MultiSelectProps) {
  const { t } = useTranslation();
  const { onValueChanged } = useContext(ControlContext);
  const [currentValue, setValue] = useState<number[]>(value);
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
  const label = useMemo(() => {
    if (!currentValue.length) {
      return t(control.name);
    }
    const selectedItems = currentValue
      .slice(0, 3)
      .map((v) => settings.items.find((item) => item.id === v)?.name)
      .join(", ");
    const otherItemsCount = currentValue.length - 3;
    return (
      // <div>
      selectedItems +
      (otherItemsCount > 0 ? ` +${otherItemsCount.toString()}` : "")
      // </div>
    );
  }, [currentValue, t, control, settings]);

  const toggleOption = (currentValue: number[], id: number) => {
    if (currentValue.includes(id)) {
      setValue(currentValue.filter((x) => x !== id));
    } else {
      setValue([...currentValue, id]);
    }
  };

  const toggleAll = () => {
    if (currentValue.length !== settings.items.length) {
      setValue(settings.items.map((x) => x.id));
    } else {
      setValue([]);
    }
  };
  const items = useMemo(() => {
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
  return (
    <div>
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
        {items}
      </BaseSelect>
      {/* 
      <Popover
        open={isOpened}
        onOpenChange={setOpened}
        modal={false}
        onOpenChangeComplete={() => {
          if (!isOpened) {
            setSearchValue("");
          }
        }}
      >
        <PopoverTrigger
          render={
            <Button className="min-w-16">
              <div>{label}</div>
              <ChevronDown
                className={cn(
                  "h-4 cursor-pointer text-muted transition-transform duration-300",
                  isOpened ? "rotate-180" : "",
                )}
              />
            </Button>
          }
        ></PopoverTrigger>
        <PopoverContent align="start">
          <PopoverHeader>
            <PopoverTitle></PopoverTitle>
          </PopoverHeader>
          <Command shouldFilter={false}>
            <CommandInput
              value={searchValue}
              onValueChange={setSearchValue}
            ></CommandInput>
            <Separator />
            <CommandList>
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
              {items}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover> */}
    </div>
  );
}
