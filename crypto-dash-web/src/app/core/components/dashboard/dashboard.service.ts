import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError, from, map, mergeMap, Observable, of, tap, toArray } from 'rxjs';
import { FormControl } from '../../models/controls/form-control';
import { DashboardLayout } from '../../models/dashboard-layout';
import { FormValues, getFormValues } from '../../models/form-editor/form-values';
import { SettingsCode } from '../../models/settings-code';
import { DashboardLayoutUserSettings } from '../../models/user-settings/dashboard-layout-user-settings';
import { FiltersUserSettings } from '../../models/user-settings/filters-user-settings';
import { PreloadDataService } from '../../services/preload-data.service';
import { UserSettingsService } from '../../services/user-settings.service';
import { getFiltersData } from '../../utils/helper';
import { DashboardItem, DashboardItemChanges, DashboardItemData, DashboardItemOptions } from '../dashboard-panel/models/dashboard-item';
import { DashboardApiService } from './dashboard-api.service';

@Injectable()
export class DashboardService extends PreloadDataService {
  private readonly api = inject(DashboardApiService);
  private readonly userSettingsService = inject(UserSettingsService);

  private readonly filtersSource = rxResource({
    params: ({ chain }) => chain(this.preloadFiltersSource),
    stream: () => this.getDashboardFilters()
  });

  private readonly layoutSource = rxResource<DashboardLayout, FormControl[]>({
    params: ({ chain }) => chain(this.filtersSource),
    stream: ({ params }) => {
      //todo add filters values in layout req
      return this.getDashboardLayout();
    }
  });

  private readonly dashboardUserSettingsSource = rxResource({
    params: ({ chain }) => chain(this.toolCodeSource),
    stream: ({ params }) => this.userSettingsService.getSettings<DashboardLayoutUserSettings>({ settingsCode: SettingsCode.DashboardLayout, toolCode: params })
  });

  readonly dashboardItems = rxResource<DashboardItem[], { filters: FormControl[], layout: DashboardLayout; userSettings: DashboardLayoutUserSettings; }>({
    params: ({ chain }) => ({ filters: chain(this.filtersSource), layout: chain(this.layoutSource), userSettings: chain(this.dashboardUserSettingsSource) }),
    stream: ({ params }) => {
      const { layout, filters, userSettings } = params;
      if (!layout?.items?.length) {
        return from([]);
      }
      return from(layout.items)
        .pipe(
          tap({
            next: (item) => {
              const savedOptions = userSettings.items[item.id];
              if (savedOptions) {
                item.options.x = savedOptions.x;
                item.options.y = savedOptions.y;
                item.options.cols = savedOptions.cols;
                item.options.rows = savedOptions.rows;
              }
            }
          }),
          mergeMap((item) => {
            return this.getDashboardData(item.id, filters)
              .pipe(
                map(data => ({ ...item, data })),
                catchError(() => of({ ...item, data: null })),
              );
          },
            3
          ),
          toArray(),
        );
    }
  });

  readonly items = signal<DashboardItem[]>([]);
  readonly options = computed(() => this.layoutSource.value()?.options);
  readonly filters = computed(() => this.filtersSource.value());

  constructor() {
    super();
    effect(() => this.items.set(this.dashboardItems.value()));
  }

  onFiltersChanged(_filterValues: FormValues): void {
    const filtersModel: FiltersUserSettings = { filtersValues: getFiltersData(this.filters()) };
    this.userSettingsService.saveUserSettingAsync({
      settingsCode: SettingsCode.DashboardFilters,
      toolCode: this.toolCode(),
    },
      filtersModel
    );
    this.items.update(items => items.map(x => ({ ...x, isLoading: true })));
    this.dashboardItems.reload();
  }

  onItemSizeChange(_item: DashboardItemChanges): void {
    const dashboardSettings: DashboardLayoutUserSettings = {
      items: this.items().reduce((acc, item) => {
        acc[item.id] = item.options;
        return acc;
      }, {} as { [itemId: string]: DashboardItemOptions; })
    };
    this.userSettingsService.saveUserSettingAsync({
      settingsCode: SettingsCode.DashboardLayout,
      toolCode: this.toolCode(),
    },
      dashboardSettings
    );
  }

  getDashboardLayout(): Observable<DashboardLayout> {
    return this.api.getDashboardLayout();
  }

  getDashboardFilters(): Observable<FormControl[]> {
    return this.api.getDashboardFilters();
  }

  getDashboardData(itemId: string, filters: FormControl[]): Observable<DashboardItemData> {
    return this.api.getDashboardData({ itemId, filtersValues: getFormValues(filters) });
  }
}
