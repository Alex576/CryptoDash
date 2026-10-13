import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
  // private readonly REMOVE_ELEMENT = 'Layout/RemoveElement';
  // private readonly GET_FORM = 'Layout/GetForm';
  // private readonly GET_OPTIONS_FORM = 'Layout/GetOptionsForm';
  // private readonly UPDATE_OPTIONS_FORM = 'Layout/UpdateOptionsForm';
  private readonly SAVE_DASHBOARD_ITEM = 'Settings/SaveDashboardItem';

  getFilters(toolCode: ToolCode): Observable<LayoutFilters> {
    return this.get<LayoutFilters>(this.GET_FILTERS, { params: { toolCode: toolCode } });
  }

  getLayout(model: { toolCode: ToolCode; }): Observable<LayoutsModel> {
    return this.post<LayoutsModel>(this.GET_LAYOUT, model);
  }

  // getLayoutEditor(toolCode: ToolCode): Observable<LayoutEditorModel> {
  //   return this.post(this.GET_LAYOUT_EDITOR, { toolCode });
  // }

  // removeLayoutItem(model: RemoveLayoutItemModel): Observable<OperationResult> {
  //   return this.post(this.REMOVE_ELEMENT, model);
  // }

  // getForm(model: FullScreenFormModel): Observable<FullScreenFormEditorModel> {
  //   return this.post(this.GET_FORM, model);
  // }

  // getOptionsForm(model: FullScreenFormModel): Observable<FullScreenUpdateModel> {
  //   return this.post(this.GET_OPTIONS_FORM, model);
  // }

  // updateOptionsForm(model: FullScreenFormModel): Observable<FullScreenUpdateModel> {
  //   return this.post(this.UPDATE_OPTIONS_FORM, model);
  // }

  saveDashboardItem(tileCode: TileCode, changes: DashboardItemChanges): Observable<void> {
    return this.post(this.SAVE_DASHBOARD_ITEM, { tileCode, changes });
  }
}
