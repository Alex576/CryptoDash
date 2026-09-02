import React, { useState } from "react";

import { Button } from "#components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "#components/ui/sheet";
import { ToolCode } from "@/core/share/tool-code";
import { useTranslation } from "react-i18next";

export interface SidePanelProps {
  toolCode: ToolCode;
  trigger?: React.ReactElement;
}

export function SidePanel({ trigger, toolCode }: SidePanelProps) {
  const { t } = useTranslation();
  const [isLoaded, setLoaded] = useState<boolean>(false);
  const loadForm = () => {};
  return (
    <div>
      <Sheet>
        <SheetTrigger
          onClick={loadForm}
          render={trigger ?? <Button>Add New Item</Button>}
        />
        <SheetContent className="min-w-1/3">
          <SheetHeader>
            <SheetTitle>{t(`Form.Title.${+toolCode}`)}</SheetTitle>
          </SheetHeader>

          <SheetFooter className="flex-row justify-between">
            <SheetClose
              render={<Button variant={"destructive"}>Close</Button>}
            ></SheetClose>
            <Button>Save</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
