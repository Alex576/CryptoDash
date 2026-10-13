import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError, from, map, mergeMap, Observable, of, toArray } from 'rxjs';
import { FormControl } from '../../models/controls/form-control';
import { DashboardLayout } from '../../models/dashboard-layout';
import { FormValues, getFormValues } from '../../models/form-editor/form-values';
import { DashboardItem, DashboardItemData } from '../dashboard-panel/models/dashboard-item';
import { DashboardApiService } from './dashboard-api.service';

@Injectable()
export class DashboardService {
  private readonly api = inject(DashboardApiService);

  private readonly filtersSource = rxResource(
    { stream: () => this.getDashboardFilters() }
  );

  private readonly layoutSource = rxResource<DashboardLayout, FormControl[]>({
    params: ({ chain }) => chain(this.filtersSource),
    stream: ({ params }) => {
      //todo add filters values in layout req
      return this.getDashboardLayout();
    }
  });


  readonly dashboardItems = rxResource<DashboardItem[], { filters: FormControl[], layout: DashboardLayout; }>({
    params: ({ chain }) => ({ filters: chain(this.filtersSource), layout: chain(this.layoutSource) }),
    stream: ({ params }) => {
      if (!params.layout?.items?.length) {
        return from([]);
      }
      return from(params.layout.items)
        .pipe(
          mergeMap((item) => {
            return this.getDashboardData(item.id, params.filters)
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
    effect(() => this.items.set(this.dashboardItems.value()));
  }
  onFiltersChanged(_filterValues: FormValues): void {
    this.items.update(items => items.map(x => ({ ...x, isLoading: true })));
    this.dashboardItems.reload();
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
