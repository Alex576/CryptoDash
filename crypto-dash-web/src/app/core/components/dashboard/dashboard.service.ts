import { computed, DestroyRef, inject, Injectable } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError, forkJoin, from, map, Observable, of } from 'rxjs';
import { DateRange } from '../../models/controls/date-range';
import { FormControl } from '../../models/controls/form-control';
import { DashboardLayout } from '../../models/dashboard-layout';
import { DashboardItem, DashboardItemData } from '../dashboard-panel/models/dashboard-item';
import { DashboardApiService } from './dashboard-api.service';

@Injectable()
export class DashboardService {
  private readonly api = inject(DashboardApiService);
  private readonly destroyRef = inject(DestroyRef);

  // private readonly filtersChangedSub$ = new Subject<void>();
  // private readonly filtersSub$ = new BehaviorSubject<FormControl[]>(null);
  // readonly filters$ = this.filtersSub$.asObservable()
  //   .pipe(
  //     shareLazy(),
  //     distinctUntilChanged(),
  //   );

  // private readonly optionsSub$ = new Subject<DashboardOptions>();
  // readonly options$ = this.optionsSub$.asObservable();

  // private readonly itemsSub$ = new BehaviorSubject<DashboardItem[]>([]);
  // private readonly dashboardItems$ = this.itemsSub$.asObservable()
  //   .pipe(
  //     tap({ next: (qwe) => console.log(qwe) }),
  //     shareLazy(),
  //     distinctUntilChanged(),
  //   );

  // readonly items$ = combineLatest([this.filters$, this.dashboardItems$])
  //   .pipe(
  //     filter(([filters, items]) => !!filters && !!items?.length),
  //     switchMap(([filters, items]) =>
  //       this.filtersChangedSub$
  //         .pipe(
  //           switchMap()
  //         )),
  //     // mergeMap(([filters, items]) => {
  //     //   const requests = items.map(item => {
  //     //     return this.getDashboardData(item.id, filters)
  //     //       .pipe(
  //     //         map(data => {
  //     //           return [...items.filter(x => x.id !== item.id), { ...item, data }];
  //     //         })
  //     //       );
  //     //   });
  //     //   return forkJoin(requests);
  //     // },
  //     //   5
  //     // ),
  //     map(([_, items]) => items)
  //   );

  private readonly filtersSource = rxResource(
    { stream: () => this.getDashboardFilters() }
  );

  private readonly layoutSource = rxResource<DashboardLayout, FormControl[]>({
    params: () => {
      if (this.filtersSource.status() === 'loading')
        return undefined;
      return this.filtersSource.value();
    },
    stream: ({ params }) => {
      // if (!params.params?.length) {
      //   return of({ items: [], options: null });
      // }
      //todo add filters values in layout req
      return this.getDashboardLayout();
    }
  });


  readonly dashboardItems = rxResource<DashboardItem[], { filters: FormControl[], layout: DashboardLayout; }>(
    {
      params: () => {
        if (this.filtersSource.status() === 'loading' || this.layoutSource.status() === 'loading')
          return undefined;
        return { filters: this.filtersSource.value(), layout: this.layoutSource.value() };
      },
      stream: ({ params }) => {
        if (!params.layout?.items?.length) {
          return from([]);
        }
        const additionalDataRequests = params.layout.items.map(item => {
          return this.getDashboardData(item.id, params.filters)
            .pipe(
              map(data => ({ ...item, data })),
              catchError(() => of({ ...item, data: null })),
            );
        });
        return forkJoin(additionalDataRequests);
      }
    }
  );

  readonly items = computed(() => this.dashboardItems.value());
  readonly options = computed(() => this.layoutSource.value()?.options);
  readonly filters = computed(() => this.filtersSource.value());

  init(): void {
    // this.getDashboardFilters()
    //   .pipe(
    //     tap({ next: (filters) => this.filtersSub$.next(filters) }),
    //     mergeMap(() => this.getDashboardLayout()),
    //     tap({
    //       next: ({ items, options }: DashboardLayout) => {
    //         this.itemsSub$.next(items);
    //         this.optionsSub$.next(options);
    //       }
    //     }),
    //     // mergeMap(({ items }: DashboardLayout) => {
    //     //   return from(items)
    //     //     .pipe(
    //     //       mergeMap(i => this.getDashboardData(i.id)
    //     //         .pipe(
    //     //           tap({
    //     //             next: (data) => {
    //     //               this.items.update(oldItems => {
    //     //                 return [...oldItems.filter(x => x.id !== i.id), { ...i, data }];
    //     //               });
    //     //             }
    //     //           })
    //     //         ),
    //     //         5
    //     //       ),
    //     //       toArray()
    //     //     );
    //     // }),
    //     takeUntilDestroyed(this.destroyRef),
    //   )
    //   .subscribe();
  }

  onFiltersChanged(): void {
    this.dashboardItems.reload();
    // this.filtersChangedSub$.next();
  }

  getDashboardLayout(): Observable<DashboardLayout> {
    return this.api.getDashboardLayout();
  }

  getDashboardFilters(): Observable<FormControl[]> {
    return this.api.getDashboardFilters();
  }

  getDashboardData(itemId: string, filters: FormControl[]): Observable<DashboardItemData> {
    const dateRangeFilter = filters.find(x => x.id === 'DateRangeFilter');
    const range = dateRangeFilter.value as DateRange;
    const dateRange: DateRange = {
      from: new Date(new Date(range.from).toISOString()),
      to: new Date(new Date(range.to).toISOString()),
    };
    return this.api.getDashboardData({ itemId, range: dateRange });
    // return this.filters$
    //   .pipe(
    //     map(x => x.find(x => x.id === 'DateRangeFilter')),
    //     filter((dateRange) => !!dateRange),
    //     map((dateRange) => {
    //       const range = dateRange.value as DateRange;
    //       const res: DateRange = {
    //         from: new Date(new Date(range.from).toISOString()),
    //         to: new Date(new Date(range.to).toISOString()),
    //       };
    //       // debugger;
    //       return res;
    //     }),
    //     mergeMap((dateRange) => this.api.getDashboardData({ itemId, range: dateRange })),
    //     take(1)
    //   );
  }
}
