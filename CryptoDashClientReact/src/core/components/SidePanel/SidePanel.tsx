import React, { useCallback, useState, type PropsWithChildren } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
} from "#components/ui/alert-dialog";
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
import { SidePanelContext } from "./SidePanelContext";

export interface SidePanelProps {
  toolCode: ToolCode;
  trigger?: React.ReactElement;
}

export function SidePanel({
  trigger,
  toolCode,
  children,
}: PropsWithChildren<SidePanelProps>) {
  const { t } = useTranslation();
  const [isSidePanelOpen, setSidePaneOpenState] = useState<boolean>(false);
  const [isOpenAlertDialog, setIsOpenAlertDialog] = useState<boolean>(false);
  const [canClose, setCanClose] = useState<boolean>(true);
  const [actionsRef, setActionsRef] = useState<HTMLDivElement | null>(null);

  const setCloseState = useCallback((isChanged: boolean) => {
    setCanClose(!isChanged);
  }, []);

  const handleChangeSidePanelState = useCallback(
    (isOpen: boolean) => {
      if (!isOpen && !canClose) {
        setIsOpenAlertDialog(true);
        return;
      }
      setSidePaneOpenState(isOpen);
    },
    [canClose],
  );

  const requestClose = useCallback(() => {
    handleChangeSidePanelState(false);
  }, [handleChangeSidePanelState]);

  const handleContinueWithoutSave = useCallback(() => {
    setIsOpenAlertDialog(false);
    setSidePaneOpenState(false);
  }, []);
  const handleSave = useCallback(() => {
    setIsOpenAlertDialog(false);
    setSidePaneOpenState(false);
  }, []);
  return (
    <div>
      <SidePanelContext value={{ setCloseState, requestClose, actionsRef }}>
        <Sheet open={isSidePanelOpen} onOpenChange={handleChangeSidePanelState}>
          <SheetTrigger render={trigger ?? <Button>Add New Item</Button>} />
          <AlertDialog
            open={isOpenAlertDialog}
            onOpenChange={setIsOpenAlertDialog}
          >
            <AlertDialogContent>
              Confirm the action
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleContinueWithoutSave}>
                  Continue without save
                </AlertDialogAction>
                <AlertDialogAction onClick={handleSave}>Save</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <SheetContent className="min-w-1/3">
            <SheetHeader>
              <SheetTitle>{t(`Form.Title.${+toolCode}`)}</SheetTitle>
            </SheetHeader>
            {children}
            <SheetFooter className="flex-row justify-between bg-secondary">
              <SheetClose
                render={
                  <Button variant={"destructive"}>
                    {t("Form.Button.Close")}
                  </Button>
                }
              ></SheetClose>
              <div className="flex gap-1" ref={setActionsRef}></div>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </SidePanelContext>
    </div>
  );
}
