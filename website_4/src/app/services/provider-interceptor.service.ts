import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProviderAuthService } from './provider-auth.service';
import { inject } from '@angular/core';

export const providerAuthInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const authService = inject(ProviderAuthService);
  const providerToken = authService.getProviderToken();

  if (providerToken) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${providerToken}`
      }
    });
    return next(clonedReq);
  }

  return next(req);
};