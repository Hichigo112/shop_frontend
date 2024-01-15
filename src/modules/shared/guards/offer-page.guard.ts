import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {CartService} from "../../cart/services/cart.service";

export const offerPageGuard: CanActivateFn = (route, state) => {
  const cartService = inject(CartService)
  const router = inject(Router)
  if (!cartService.cartItems.length) {
    router.navigate(['products'])
  }
  return !!cartService.cartItems.length
};
