import { computed, DestroyRef, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { mergeMap, tap } from 'rxjs';
import { FormControl } from '../../models/controls/form-control';
import { FormValues, getFormValues } from '../../models/form-editor/form-values';
import { TileCode } from '../../models/tile-code';
import { ToolCode } from '../../models/tool-code';
import { SidePanelService } from '../../services/side-panel.service';
import { AgGridActionService } from '../ag-grid/ag-grid-action.service';
import { DashboardItemChanges } from '../dashboard-panel/models/dashboard-item';
import { LayoutEditorApiService } from './layout-editor-api.service';
import { LayoutEditorModel } from './models/layout-editor-model';
import { LayoutsModel } from './models/layouts-model';

@Injectable()
export class LayoutEditorService {
  private readonly sidePanelService = inject(SidePanelService);
  private readonly api = inject(LayoutEditorApiService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly gridService = inject(AgGridActionService);

  readonly layout = signal<LayoutsModel>(null);
  readonly layoutEditor = signal<LayoutEditorModel>(null, { equal: () => false });
  readonly filters = signal<FormControl[]>([]);
  private readonly toolFilter = computed<FormControl>(() => this.filters().find(x => x.id === 'ToolFilter'));

  loadLayout(toolCode: ToolCode): void {
    this.api.getFilters(toolCode)
      .pipe(
        tap({ next: (model) => this.filters.set(model.filters) }),
        mergeMap(() => this.api.getLayout({ filterValues: getFormValues(this.filters()) })),
        tap({ next: (layout) => this.layout.set(layout) }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  loadLayoutAsync(filterValues: FormValues): void {
    this.api.getLayout({ filterValues })
      .pipe(
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({ next: (layout) => this.layout.set(layout) });
  }

  reloadLayoutAsync(): void {
    this.loadLayoutAsync(getFormValues(this.filters()));
  }

  applyEditorLayout(result: LayoutEditorModel): void {
    this.layoutEditor.set(result);
  }

  saveDashboardItemAsync(tileCode: TileCode, item: DashboardItemChanges): void {
    this.api.saveDashboardItem(tileCode, item)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  // removeLayoutItemAsync(model: RemoveLayoutItemModel): void {
  //   this.api.removeLayoutItem(model)
  //     .pipe(
  //       takeUntilDestroyed(this.destroyRef),
  //     )
  //     .subscribe({
  //       next: (result: OperationResult) => {
  //         if (isSuccess(result.code)) {
  //           this.removeLayoutElement(model.tileCode, model.itemId);
  //         }
  //       }
  //     });
  // }

  removeLayoutElement(tileCode: TileCode, elementId: string): void {
    this.layoutEditor.update((layout) => {
      const item = layout.layoutItems.find(x => x.tileCode == tileCode);
      // if (item) {
      //   switch (item.data.tileType) {
      //     case TileTypeCode.Filter:
      //       item.data.filters = item.data.filters.filter((filter) => filter.id !== elementId);
      //       break;
      //     case TileTypeCode.Grid:
      //       this.gridService.applyTransition(new UpdateGridModel([], [], [elementId]));
      //       break;
      //     case TileTypeCode.Dashboard:
      //       item.data.dashboardLayout = { ...item.data.dashboardLayout, items: item.data.dashboardLayout.items.filter(x => x.id !== elementId) };
      //       break;
      //     default:
      //       console.error('Not implemented');
      //       break;
      //   }
      // }
      return layout;
    });
  }
}
