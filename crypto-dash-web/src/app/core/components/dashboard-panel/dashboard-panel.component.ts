import { ChangeDetectionStrategy, Component, computed, effect, inject, input, output } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatIconModule } from "@angular/material/icon";
import { MatTooltip } from '@angular/material/tooltip';
import { Gridster, GridsterItem } from 'angular-gridster2';
import { DynamicToolTipDirective } from '../../directives/dynamic-tool-tip.directive';
import { DashboardPanelService } from './dashboard-panel.service';
import { DashboardSwitchComponent } from './dashboard-switch/dashboard-switch.component';
import { DashboardItem, DashboardItemChanges } from './models/dashboard-item';
import { DashboardOptions } from './models/dashboard-options';
import { DashboardType } from './models/dashboard-type';

@Component({
  selector: 'app-dashboard-panel',
  templateUrl: './dashboard-panel.component.html',
  styleUrls: ['./dashboard-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Gridster, GridsterItem, MatIconModule, MatIconButton, MatButtonModule, MatTooltip, DynamicToolTipDirective, DashboardSwitchComponent],
  providers: [DashboardPanelService]
})
export class DashboardPanelComponent {
  readonly options = input.required<DashboardOptions>();
  readonly items = input.required<DashboardItem[]>();
  readonly isPreview = input<boolean>(false);

  readonly openItem = output<string>();

  private readonly service = inject(DashboardPanelService);
  readonly onItemSizeChange = outputFromObservable<DashboardItemChanges>(this.service.onItemSizeChanged$);

  protected readonly gridsterConfig = computed(() => this.service.gridsterConfig());
  protected readonly dashboardItems = computed(() => this.service.items());
  constructor() {
    effect(() => this.service.initialize(this.options()));
    effect(() => this.service.initItems(this.items()));
  }

  onOpenItem(id: string): void {
    this.openItem.emit(id);
  }

  getPreviewIcon(type: DashboardType): string {
    switch (type) {
      case DashboardType.Chart: return 'dash:chart';
      case DashboardType.Bars: return 'dash:bars';
      case DashboardType.Table: return 'dash:table';
    }
    return null;
  }
}
