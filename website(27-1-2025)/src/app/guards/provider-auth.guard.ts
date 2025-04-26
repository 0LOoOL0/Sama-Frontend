import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { ProviderAuthService } from '../services/provider-auth.service';

export const providerAuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const router = inject(Router);
  const authService = inject(ProviderAuthService);

  if (localStorage.getItem('provider_token')) {
    if (authService.isEmailVerified()) {
      return true;
    } else {
      router.navigate(['/provider/email-verification/verify-email']);
      return false;
    }
  } else {
    router.navigate(['/provider/login']);
    return false;
  }
};
