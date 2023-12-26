import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BrandDto} from "../../../dto/brand.dto";
import {DEV_URL} from "../../../constants/url";
import {PaginationDto} from "../../../dto/pagination.dto";

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private http: HttpClient) { }

  getBrands() : Observable<PaginationDto<Pick<BrandDto, 'id' | 'name' | 'icon'>>> {
    return this.http.get<PaginationDto<Pick<BrandDto, 'id' | 'name' | 'icon'>>>(`${DEV_URL}brands/`)
  }

  createBrand(brand: Omit<BrandDto, 'id'>): Observable<void> {
    return this.http.post<void>(`${DEV_URL}brands/`, brand)
  }
}
