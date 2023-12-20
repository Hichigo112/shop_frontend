import { CanActivateFn } from '@angular/router';

export const notAuthGuard: CanActivateFn = (route, state) => {
  return !localStorage.getItem('token');

};
