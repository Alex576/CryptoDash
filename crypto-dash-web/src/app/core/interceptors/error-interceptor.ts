import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest, HttpStatusCode } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { LocalStorageKeys } from "../models/local-storage-keys";
import { AuthorizationService } from "../services/authorization.service";
import { NavigationService } from "../services/navigation.service";
import { NotificationService } from "../services/notification.service";
import { StorageService } from "../services/storage.service";

export function errorInterceptor(
    req: HttpRequest<unknown>,
    next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
    if (req.url.includes('/i18n/'))
        return next(req);

    const navigationService = inject(NavigationService);
    const notificationService = inject(NotificationService);
    const storageService = inject(StorageService);
    const authService = inject(AuthorizationService);

    return handleRequestErrors(req, next);

    function handleRequestErrors(
        req: HttpRequest<unknown>,
        next: HttpHandlerFn,
    ): Observable<HttpEvent<unknown>> {
        return next(req)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    if (error.status === HttpStatusCode.Unauthorized && !(req.url.includes('api/Authentication/Login') || req.url.includes('api/Authorization/RefreshToken'))) {
                        return handle401Error(req, next);
                    }
                    if (error.status === HttpStatusCode.BadRequest && !req.url.includes('api/Authorization/RefreshToken')) {
                        notificationService.notifyError("Unknown Error");
                        console.error(error.message);
                    }
                    else {
                        notificationService.notifyError("Server Internal Error");
                    }

                    return throwError(() => error);
                })
            );
    }

    function handle401Error(
        req: HttpRequest<unknown>,
        next: HttpHandlerFn,
    ): Observable<HttpEvent<unknown>> {
        if (!storageService.getValue(LocalStorageKeys.Token) || !storageService.getValue(LocalStorageKeys.UserId)) {
            notificationService.notifyError("Session is over");
            navigationService.navigateToLoginPage();
            return throwError(() => new Error("Refresh token is missing"));
        }

        if (authService.isRefreshingToken) {
            return authService.handleRequestWhileRefreshingToken(req, next);

        } else {
            return authService.refreshToken(req, next);
        }
    }
}
