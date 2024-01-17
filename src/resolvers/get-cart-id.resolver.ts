import { ResolveFn } from '@angular/router';
import {inject} from "@angular/core";
import {CartService} from "../modules/cart/services/cart.service";
import {catchError} from "rxjs";

export const getCartIdResolver: ResolveFn<void> = (route, state): void => {
  const cartService = inject(CartService)
  cartService.getCartData({}).pipe(
    catchError(err => {
      return ''
    })
  ).subscribe(res => {
    if (typeof res !== "string") {
      cartService.cart = res.results[0].id
    } else {
      cartService.cart = res
    }
  })
};
