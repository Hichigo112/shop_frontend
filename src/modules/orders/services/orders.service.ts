import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {DEV_URL} from "../../../constants/url";
import {OrderDto, ShortOrderDto} from "../../../dto/orders.dto";
import {PaginationDto} from "../../../dto/pagination.dto";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  allOrders$ = new BehaviorSubject<OrderDto[]>([])


  constructor(private http: HttpClient) { }

  getOrders(): Observable<PaginationDto<OrderDto>> {
    return this.http.get<PaginationDto<OrderDto>>(`${DEV_URL}orders/`)
  }

  getOrderById(id: string): Observable<OrderDto> {
    return this.http.get<OrderDto>(`${DEV_URL}orders/${id}`)
  }

  patchOrder(data: ShortOrderDto, id: string) : Observable<OrderDto> {
    return this.http.patch<OrderDto>(`${DEV_URL}orders/${id}/`, data)
  }

  set updateAll(data: OrderDto[]) {
    this.allOrders$.next(data)
  }
}
