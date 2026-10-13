import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl } from '../../models/controls/form-control';
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
  // protected readonly items$: Observable<DashboardItem[]> = this.service.items$;
  // protected readonly options$: Observable<DashboardOptions> = this.service.options$;

  // protected readonly filters = toSignal(this.service.filters$);

  protected readonly filters = this.service.filters;
  protected readonly items = this.service.items;
  protected readonly options = this.service.options;
  constructor() {
    super();
    this.service.init();

  }


  onFilterChanged(filter: FormControl): void {
    this.service.onFiltersChanged();
  }
}
