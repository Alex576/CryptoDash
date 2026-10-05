import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "#components/ui/sidebar";
import { useAppSelector } from "@/core/store";
import {
  BriefcaseBusiness,
  LayoutDashboard,
  ScanBox,
  Settings,
  type LucideProps,
} from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { Account } from "../Account";
import { ThemeSwitcher } from "../ThemeSwitcher";

export interface SidebarProps {
  prop?: string;
}
const sidebarItems: {
  id: number;
  name: string;
  url: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}[] = [
  {
    id: 1,
    name: "SideBar.Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    id: 2,
    name: "SideBar.Protfolio",
    url: "portfolio",
    icon: BriefcaseBusiness,
  },
  {
    id: 3,
    name: "SideBar.Settings",
    url: "/settings",
    icon: Settings,
  },
  {
    id: 4,
    name: "SideBar.Subjects",
    url: "/subjects",
    icon: ScanBox,
  },
];
export function AppSidebar({ prop = "default value" }: SidebarProps) {
  const {
    state,
    open,
    setOpen,
    openMobile,
    setOpenMobile,
    isMobile,
    toggleSidebar,
  } = useSidebar();
  const { t } = useTranslation();
  const location = useLocation();
  const user = useAppSelector((state) => state.auth.user);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <ThemeSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarGroup>
            {sidebarItems.map((item) => {
              const isActive = location.pathname === item.url;
              return (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={isActive}
                    tooltip={t(item.name)}
                    render={<Link to={item.url} />}
                  >
                    {item.icon && <item.icon />}
                    <span>{t(item.name)}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarGroup>
        </SidebarMenu>
        {/* <SidebarGroup />
        <SidebarGroup /> */}
      </SidebarContent>
      <SidebarFooter>
        <Account
          avatar={""}
          name={user?.email ?? ""}
          email={user?.email ?? ""}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
