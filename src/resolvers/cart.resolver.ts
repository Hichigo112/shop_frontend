import { ResolveFn } from '@angular/router';
import {catchError, Observable, of} from "rxjs";
import {inject} from "@angular/core";
import {CartService} from "../modules/cart/services/cart.service";
import {PaginationDto} from "../dto/pagination.dto";
import {CartDto} from "../dto/cart.dto";

export const cartResolver: ResolveFn<PaginationDto<CartDto> | string> = (route, state): Observable<PaginationDto<CartDto> | string> => {
  const cartService = inject(CartService)
  if (!!localStorage.getItem('token')) {
    return cartService.getCartData(route.queryParams).pipe(
      catchError(err => {
        return of('Произошла ошибка во время запроса на сервер')
      })
    )
  } else {
    return of('Надо зарегистрироваться чтобы получить доступ к корзине')
  }
};
