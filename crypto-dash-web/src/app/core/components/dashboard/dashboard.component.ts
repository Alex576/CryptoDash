import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormValues } from '../../models/form-editor/form-values';
import { BaseToolComponent } from '../base-tool/base-tool.component';
import { DashboardPanelComponent } from '../dashboard-panel/dashboard-panel.component';
import { FiltersComponent } from '../filters/filters.component';
import { LoadingComponent } from '../loading/loading.component';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DashboardPanelComponent, LoadingComponent, FiltersComponent],
  providers: [DashboardService]
})
export class DashboardComponent extends BaseToolComponent {
  private readonly service = inject(DashboardService);

  protected readonly filters = this.service.filters;
  protected readonly items = this.service.items;
  protected readonly options = this.service.options;

  onFilterChanged(filterValues: FormValues): void {
    this.service.onFiltersChanged(filterValues);
  }
}
