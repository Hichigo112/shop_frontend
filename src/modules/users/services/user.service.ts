import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {PaginationDto} from "../../../dto/pagination.dto";
import {UserTableDto} from "../../../dto/user.dto";
import {DEV_URL} from "../../../constants/url";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  usersData$ = new BehaviorSubject<UserTableDto[]>([])

  constructor(private http: HttpClient) { }

  getUsersTable(): Observable<PaginationDto<UserTableDto>> {
    return this.http.get<PaginationDto<UserTableDto>>(`${DEV_URL}auth/users/`)
  }

  getMyData(): Observable<UserTableDto> {
   return this.http.get<UserTableDto>(`${DEV_URL}auth/users/me`)
  }

  patchInfo(data: Omit<UserTableDto, 'id'>): Observable<UserTableDto> {
    return this.http.patch<UserTableDto>(`${DEV_URL}auth/users/me/`, data)
  }

  set setData(data: UserTableDto[]) {
    this.usersData$.next(data)
  }
}
