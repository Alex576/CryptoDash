import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl } from '../../models/controls/form-control';
import { DashboardLayout } from '../../models/dashboard-layout';
import { GetDashboardDataModel } from '../../models/dashboard/get-dashboard-data-model';
import { BaseApiService } from '../../services/base-api.service';
import { DashboardItemData } from '../dashboard-panel/models/dashboard-item';

@Injectable({
  providedIn: 'root'
})
export class DashboardApiService extends BaseApiService {
  private readonly GET_DASHBOARD_LAYOUT = 'Dashboard/GetDashboardLayout';
  private readonly GET_DASHBOARD_FILTERS = 'Dashboard/GetDashboardFilters';
  private readonly GET_DASHBOARD_DATA = 'Dashboard/GetDashboardData';

  getDashboardLayout(): Observable<DashboardLayout> {
    return this.get(this.GET_DASHBOARD_LAYOUT);
  }

  getDashboardFilters(): Observable<FormControl[]> {
    return this.post(this.GET_DASHBOARD_FILTERS, {});
  }

  getDashboardData(model: GetDashboardDataModel): Observable<DashboardItemData> {
    return this.post(this.GET_DASHBOARD_DATA, model);
  }
}
