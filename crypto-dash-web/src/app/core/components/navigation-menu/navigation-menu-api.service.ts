import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MenuCode, MenuCodeIcon, MenuItem } from '../../models/menu-item';
import { ToolCode } from '../../models/tool-code';
import { BaseApiService } from '../../services/base-api.service';

@Injectable({
  providedIn: 'root'
})
export class NavigationMenuApiService extends BaseApiService {
  private readonly GET_MENU_ITEMS = 'Menu/GetMenuItems';

  private readonly menuItems: MenuItem[] = [
    {
      toolCode: ToolCode.Dashboard,
      name: 'Dashboard',
      icon: MenuCodeIcon.get(MenuCode.Dashboard),
      id: MenuCode.Dashboard,
    },
    {
      toolCode: ToolCode.Settings,
      name: 'Settings',
      icon: MenuCodeIcon.get(MenuCode.Settings),
      id: MenuCode.Settings,
    },
    {
      toolCode: ToolCode.Layout,
      name: 'Layout',
      icon: MenuCodeIcon.get(MenuCode.Layout),
      id: MenuCode.Layout,
      parentId: MenuCode.Settings,
    }
  ];
  public getMenuItems(): Observable<MenuItem[]> {
    return of(this.menuItems); // this.http.get<MenuItem[]>(`${this.baseUrl}${this.GET_MENU_ITEMS}`);
  }
}
