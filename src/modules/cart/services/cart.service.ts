import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {DEV_URL} from "../../../constants/url";
import {PaginationDto} from "../../../dto/pagination.dto";
import {AddProduct, CartDto, ResAddProduct} from "../../../dto/cart.dto";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartId = ''

  constructor(private http: HttpClient) { }

  getCartData(params: HttpParams | {}): Observable<PaginationDto<CartDto>> {
    return this.http.get<PaginationDto<CartDto>>(`${DEV_URL}carts/`, {
      params
    })
  }

  addProductCart(item: string): Observable<ResAddProduct> {
    const productToCart: AddProduct = {
      product: item,
      quantity: 1,
      cart: this.cartId
    }
    return this.http.post<ResAddProduct>(`${DEV_URL}cart-items/`, productToCart)
  }

  patchProduct(data: {product: string, quantity: number}, id: string): Observable<ResAddProduct> {
    const finalData = {...data, cart: this.cartId}
    return this.http.patch<ResAddProduct>(`${DEV_URL}cart-items/${id}/`, finalData)
  }

  deleteFromCart(id: string): Observable<void> {
    return this.http.delete<void>(`${DEV_URL}cart-items/${id}/`)
  }

  get cart() {
    return this.cartId
  }

  set cart(id: string) {
    this.cartId = id
  }

  setCart(id: string) {
    this.cartId = id
  }
}
