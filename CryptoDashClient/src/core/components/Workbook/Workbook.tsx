import { SidebarInset, SidebarProvider } from "#components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "../AppSidebar";

export interface workbookProps {
  prop?: string;
}

export function Workbook({ prop = "default value" }: workbookProps) {
  return (
    <div className="flex h-full w-full">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <div className="flex-1 p-2">
            <Outlet />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
