import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DEV_URL} from "../../../constants/url";
import {PaginationDto} from "../../../dto/pagination.dto";
import {WarehousesDto} from "../../../dto/warehouses.dto";

@Injectable({
  providedIn: 'root'
})
export class WarehousesService {

  constructor(private http: HttpClient) { }

  getWarehouses(): Observable<PaginationDto<WarehousesDto>> {
    return this.http.get<PaginationDto<WarehousesDto>>(`${DEV_URL}warehouses/`)
  }
}
