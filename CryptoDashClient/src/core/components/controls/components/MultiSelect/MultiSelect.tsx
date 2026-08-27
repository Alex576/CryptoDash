import { useMemo, useState } from "react";

import { Button } from "#components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "#components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "#components/ui/popover";
import { cn } from "#lib/utils";
import type {
  ComboSettings,
  FormControl,
} from "@/core/components/Form/models/FormModels";
import { CheckIcon, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

export interface MultiSelectProps {
  control: FormControl;
  settings: ComboSettings;
  value: number[];
}

export function MultiSelect({ control, settings, value }: MultiSelectProps) {
  const { t } = useTranslation();
  const [currentValue, setValue] = useState<number[]>(value);
  const [isOpened, setOpened] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");

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
      </Popover>
    </div>
  );
}
