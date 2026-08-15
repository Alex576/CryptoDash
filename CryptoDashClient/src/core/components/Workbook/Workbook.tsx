import { SidebarInset, SidebarProvider } from "#components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "../AppSidebar";
import styles from "./Workbook.module.scss";

export interface workbookProps {
  prop?: string;
}

export function Workbook({ prop = "default value" }: workbookProps) {
  return (
    <div className={styles.workbook}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <div className={styles.workbook__main}>
            <Outlet />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
