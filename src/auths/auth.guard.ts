import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthenticationService } from '../app/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {

    const token = localStorage.getItem('token');

    if (!token) {
      this.router.navigate(['/auth/login']);
      return of(false);
    }

    return this.authService.getUserInfo(token).pipe(
      map(user => {
        // Permite acesso se for staff ou superuser
        if (user.is_staff || user.is_superuser) {
          return true;
        }

        // Usuário não tem permissão: redireciona
        this.router.navigate(['/reservas']);
        return false;
      }),
      catchError(() => {
        this.router.navigate(['/auth/login']);
        return of(false);
      })
    );
  }
}
