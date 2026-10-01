import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, EMPTY, filter, Observable, Subject, switchMap, take, takeUntil } from 'rxjs';
import { AuthorizationApiService } from '../api/authorization-api.service';
import { LocalStorageKeys } from '../models/local-storage-keys';
import { NavigationService } from './navigation.service';
import { NotificationService } from './notification.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private readonly api = inject(AuthorizationApiService);
  private readonly storageService = inject(StorageService);
  private readonly navigationService = inject(NavigationService);
  private readonly notificationService = inject(NotificationService);

  public isRefreshingToken = false;
  public readonly refreshTokenSub$ = new BehaviorSubject<string | null>(null);

  private readonly cancelSub$ = new Subject<void>();

  constructor() { }

  handleRequestWhileRefreshingToken(
    req: HttpRequest<unknown>,
    next: HttpHandlerFn
  ): Observable<HttpEvent<unknown>> {
    return this.refreshTokenSub$
      .pipe(
        filter(token => !!token),
        take(1),
        switchMap((newToken) =>
          next(
            req.clone({
              headers: req.headers.set('Authorization', `Bearer ${newToken}`)
            })
          )
        ),
        takeUntil(this.cancelSub$)
      );
  }

  refreshToken(
    req: HttpRequest<unknown>,
    next: HttpHandlerFn
  ): Observable<HttpEvent<unknown>> {
    this.refreshTokenSub$.next(null);
    this.isRefreshingToken = true;
    return this.api.refreshToken()
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === HttpStatusCode.BadRequest) {
            this.storageService.remove(LocalStorageKeys.Token);
            this.storageService.remove(LocalStorageKeys.UserId);
            this.notificationService.notifyError("Session is over");
            this.cancelSub$.next();
            this.navigationService.navigateToLoginPage();
          }
          return EMPTY;
        }),
        switchMap(({ accessToken: access }) => {
          this.isRefreshingToken = false;
          this.storageService.saveValue(LocalStorageKeys.Token, access);
          this.refreshTokenSub$.next(access);
          return next(req.clone({
            headers: req.headers.set('Authorization', `Bearer ${access}`)
          }));

        })

      );
  }
}
