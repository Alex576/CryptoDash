import * as React from "react";
import { useState } from "react";

import { Button } from "#components/ui/button";
import { Command, CommandInput, CommandList } from "#components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "#components/ui/popover";
import { cn } from "#lib/utils";
import { Separator } from "@/core/components";
import { ChevronDown } from "lucide-react";

export interface BaseSelectProps {
  label: string;
  onSearchValue: (_searchValue: string) => void;
}

export function BaseSelect({
  label,
  children,
  onSearchValue,
}: React.PropsWithChildren<BaseSelectProps>) {
  const [isOpened, setOpened] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearch = (value: string) => {
    setSearchValue(value);
    onSearchValue(value);
  };
  return (
    <div>
      <Popover
        open={isOpened}
        onOpenChange={setOpened}
        modal={false}
        onOpenChangeComplete={() => {
          if (!isOpened) {
            handleSearch("");
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
              onValueChange={handleSearch}
            ></CommandInput>
            <Separator />
            <CommandList>{children}</CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
