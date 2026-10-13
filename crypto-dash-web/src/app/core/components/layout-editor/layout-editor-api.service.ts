import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormValues } from '../../models/form-editor/form-values';
import { TileCode } from '../../models/tile-code';
import { ToolCode } from '../../models/tool-code';
import { BaseApiService } from '../../services/base-api.service';
import { DashboardItemChanges } from '../dashboard-panel/models/dashboard-item';
import { LayoutFilters } from './models/layout-filters';
import { LayoutsModel } from './models/layouts-model';

@Injectable({
  providedIn: 'root'
})
export class LayoutEditorApiService extends BaseApiService {
  private readonly GET_LAYOUT = 'Settings/GetLayout';
  private readonly GET_FILTERS = 'Settings/GetFilters';
  private readonly SAVE_DASHBOARD_ITEM = 'Settings/SaveDashboardItem';

  getFilters(toolCode: ToolCode): Observable<LayoutFilters> {
    return this.get<LayoutFilters>(this.GET_FILTERS, { params: { toolCode: toolCode } });
  }

  getLayout(model: { filterValues: FormValues; }): Observable<LayoutsModel> {
    return this.post<LayoutsModel>(this.GET_LAYOUT, model);
  }

  saveDashboardItem(tileCode: TileCode, changes: DashboardItemChanges): Observable<void> {
    return this.post(this.SAVE_DASHBOARD_ITEM, { tileCode, changes });
  }
}
