import { Routes } from "@angular/router";
import { WorkplaceComponent } from "../components/workplace/workplace.component";
import { RouteData } from "../models/route-data";
import { ToolCode } from "../models/tool-code";

export const routes: Routes = [
    {
        path: '',
        component: WorkplaceComponent,

        children: [
            {
                path: '',
                redirectTo: '/dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                data: { [RouteData.ToolCode]: ToolCode.Dashboard },
                loadComponent: () => import('../components/dashboard/dashboard.component').then(c => c.DashboardComponent)
            },
            {
                path: 'translations',
                data: { [RouteData.ToolCode]: ToolCode.Translation },
                loadComponent: () => import('../components/translations/translations.component').then(c => c.TranslationsComponent)
            },
            {
                path: 'layout',
                data: { [RouteData.ToolCode]: ToolCode.Layout },
                loadComponent: () => import('../components/layout-editor/layout-editor.component').then(c => c.LayoutEditorComponent)
            },
        ]
    },
    // {
    //     path: '',
    //     redirectTo: '/workplace',
    //     pathMatch: 'full'
    // },
];
