import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from "@angular/material/icon";
import { ComboControl } from '../../models/controls/combo-control';
import { FormValues } from '../../models/form-editor/form-values';
import { TileCode } from '../../models/tile-code';
import { BaseToolComponent } from '../base-tool/base-tool.component';
import { FiltersComponent } from "../filters/filters.component";
import { LoadingComponent } from "../loading/loading.component";
import { DashboardEditorComponent } from "./dashboard-editor/dashboard-editor.component";
import { FiltersEditorComponent } from "./filters-editor/filters-editor.component";
import { LayoutEditorService } from './layout-editor.service';
import { LayoutItemEntity } from './models/layout-editable-item';
import { TileTypeCode } from './models/tile-type-code';

@Component({
  selector: 'app-layout-editor',
  templateUrl: './layout-editor.component.html',
  styleUrls: ['./layout-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FiltersComponent, LoadingComponent, FiltersEditorComponent, DashboardEditorComponent, MatIconModule, MatButtonModule],
  providers: [LayoutEditorService],
})
export class LayoutEditorComponent extends BaseToolComponent {
  private readonly service = inject(LayoutEditorService);

  protected readonly itemType = TileTypeCode;

  protected readonly layout = this.service.layout;
  protected readonly layoutEditor = this.service.layoutEditor;
  protected readonly filters = computed<ComboControl[]>(() => this.service.filters());

  constructor() {
    super();

    this.service.loadLayout(this.toolCode);
  }

  onFilterValueChanged(filterValues: FormValues): void {
    // if (control.id == 'ToolFilter') {
    this.service.loadLayoutAsync(filterValues);
    // }
  }

  onEditForm(tileCode: TileCode, data: LayoutItemEntity): void {
    // this.service.editForm(tileCode, data);
  }
}
