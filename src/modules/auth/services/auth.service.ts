import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { LongUserDto, ShortUserDto, UserToken} from "../../../dto/user.dto";
import {Observable} from "rxjs";
import {DEV_URL} from "../../../constants/url";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  createUser(userData: LongUserDto): Observable<LongUserDto> {
    return this.http.post<LongUserDto>(`${DEV_URL}auth/users/`, userData)
  }

  loginToken(userData: ShortUserDto): Observable<UserToken> {
    return this.http.post<UserToken>(`${DEV_URL}auth/token/login/`, userData)
  }

  logoutToken(): Observable<any> {
    return this.http.post(`${DEV_URL}auth/token/logout/`, {})
  }
}
