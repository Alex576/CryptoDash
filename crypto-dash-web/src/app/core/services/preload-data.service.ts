import { computed, inject, Injectable } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { FormControl } from '../models/controls/form-control';
import { RouteData } from '../models/route-data';
import { ToolCode } from '../models/tool-code';
import { UserPreviewModel } from '../models/user-preview-model';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root'
})
export abstract class PreloadDataService extends BaseApiService {
  private readonly GET_FILTERS_PREVIEW = "UserPreviewLayout/GetFiltersPreview";
  private readonly activatedRoute = inject(ActivatedRoute);

  private preloadFiltersData(data: UserPreviewModel): Observable<FormControl[]> {
    return this.post(this.GET_FILTERS_PREVIEW, data);
  };

  private readonly toolCodeSource = rxResource<ToolCode, unknown>({
    stream: () => this.activatedRoute.data
      .pipe(
        map((data) => data[RouteData.ToolCode])
      )
  });

  protected readonly preloadFiltersSource = rxResource<FormControl[], ToolCode>({
    params: ({ chain }) => chain(this.toolCodeSource),
    stream: ({ params: toolCode }) => this.preloadFiltersData({ toolCode })
  });

  protected readonly toolCode = computed<ToolCode>(() => this.toolCodeSource.value());
}
