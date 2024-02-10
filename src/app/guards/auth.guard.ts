import { CanActivateFn } from '@angular/router';
import { UserAuthService } from '../service/user-auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  let userAuthService = inject(UserAuthService);
  if (userAuthService.isLogedIn()) {
    return true;
  } else {
    alert('Please login first');
    return false;
  }
};
