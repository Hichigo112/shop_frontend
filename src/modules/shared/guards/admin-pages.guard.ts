import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../../auth/services/auth.service";

export const adminPagesGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router)
  const isAdmin = authService.isAdmin.getValue() || false
  if (!isAdmin) {
    router.navigate(['products'])
  }
  return true;
};
