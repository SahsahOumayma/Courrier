import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    const isLoggedIn = this.auth.isLoggedIn();
    const expectedRole = route.data['role'];
    const currentRole = this.auth.getUserRole();

    const isLoginPage = route.routeConfig?.path === '' || route.routeConfig?.path === 'inscription';

    // 🔒 Blocage des pages de connexion si déjà connecté
    if (isLoggedIn && isLoginPage) {
      return this.router.parseUrl(`/${currentRole.toLowerCase()}/dashboard`);
    }

    // 🔒 Redirection si non connecté
    if (!isLoggedIn && !isLoginPage) {
      return this.router.parseUrl('/');
    }

    // 🔒 Blocage des rôles différents
    if (expectedRole && currentRole !== expectedRole) {
      return this.router.parseUrl(`/${currentRole.toLowerCase()}/dashboard`);
    }

    return true;
  }
}
