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
import { Separator } from "@/core/components";
import type {
  ComboSettings,
  FormControl,
} from "@/core/components/Form/models/FormModels";
import { CheckIcon, ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

export interface SingleSelectProps {
  control: FormControl;
  settings: ComboSettings;
  value: number;
}

export function SingleSelect({ control, settings, value }: SingleSelectProps) {
  const { t } = useTranslation();
  const [currentValue, setValue] = useState<number>(value);
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
        <div
          className={cn(
            "mr-2 flex h-4 w-4 items-center justify-center",
            currentValue === item.id ? "" : "[&_svg]:invisible",
          )}
        >
          <CheckIcon />
        </div>
        <span>{item.name}</span>
      </CommandItem>
    ));
  }, [currentValue, filteredItems]);

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
            <CommandInput value={searchValue} onValueChange={setSearchValue} />
            <Separator />
            <CommandList className="px-1">
              {!filteredItems.length && (
                <CommandEmpty>{t("Control.Combo.NoItems")}</CommandEmpty>
              )}
              {items}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
