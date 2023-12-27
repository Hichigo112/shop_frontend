import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import { Observable} from "rxjs";
import {PaginationDto} from "../../../dto/pagination.dto";
import {ProductsDto} from "../../../dto/products.dto";
import {DEV_URL} from "../../../constants/url";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProducts(params: HttpParams | {}): Observable<PaginationDto<ProductsDto>> {
    return this.http.get<PaginationDto<ProductsDto>>(`${DEV_URL}products/`, {
      params
    })
  }

  createProduct(productData: ProductsDto): Observable<void> {
    return this.http.post<void>(`${DEV_URL}products/`, productData)
  }
}
