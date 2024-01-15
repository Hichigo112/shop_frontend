import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {PromocodeDto} from "../../../dto/promocode.dto";
import {HttpClient} from "@angular/common/http";
import {PaginationDto} from "../../../dto/pagination.dto";
import {DEV_URL} from "../../../constants/url";

@Injectable({
  providedIn: 'root'
})
export class PromocodeService {

  promocodeData$ = new BehaviorSubject<PromocodeDto[]>([])
  constructor(private http: HttpClient) { }

  getPromocodes(): Observable<PaginationDto<PromocodeDto>> {
    return this.http.get<PaginationDto<PromocodeDto>>(`${DEV_URL}promocodes/`)
  }

  createPromocode(code: Omit<PromocodeDto, 'id'>): Observable<PromocodeDto> {
    return this.http.post<PromocodeDto>(`${DEV_URL}promocodes/`, code)
  }

  updatePromocode(code: Omit<PromocodeDto, 'id'>, id: string): Observable<PromocodeDto> {
    return this.http.patch<PromocodeDto>(`${DEV_URL}promocodes/${id}/`, code)
  }

  deletePromocode(id: string): Observable<void> {
    return this.http.delete<void>(`${DEV_URL}promocodes/${id}/`)
  }

  set promocode(data: PromocodeDto[]) {
    this.promocodeData$.next(data)
  }
}
