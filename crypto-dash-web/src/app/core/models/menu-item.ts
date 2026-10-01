import { ToolCode } from "./tool-code";
import { FlatTreeEntity } from "./tree-flat-item-model";

export interface MenuItem extends FlatTreeEntity {
    // code: MenuCode;
    toolCode: ToolCode;
    name: string;
    // parentId?: MenuCode;
    icon: string;
}

export enum MenuCode {
    Dashboard = 1,
    Finances = 2,
    Settings = 3,
    Roles = 4,
    Users = 5,
    Translation = 6,
    Layout = 7,

}

export const MenuCodeIcon = new Map<MenuCode, string>([
    [MenuCode.Dashboard, 'dashboard'],
    [MenuCode.Layout, 'responsive_layout'],
    [MenuCode.Settings, 'settings'],
]);

export const ToolCodeUrlMap = new Map<ToolCode, string>([
    [ToolCode.Dashboard, '/dashboard'],
    [ToolCode.Layout, '/layout'],

]);