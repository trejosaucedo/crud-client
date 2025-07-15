import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.fetchMe().pipe(
    map((res) => {
      if (res?.success && res.data?.user) {
        return true;
      } else {
        localStorage.removeItem('access_token');
        return router.parseUrl('/login');
      }
    }),
    catchError(() => {
      localStorage.removeItem('access_token');
      auth.forceLogout();
      return of(router.parseUrl('/login'));
    })
  );
};
