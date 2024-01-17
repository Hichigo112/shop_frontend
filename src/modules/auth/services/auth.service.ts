import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { LongUserDto, ShortUserDto, UserToken} from "../../../dto/user.dto";
import {BehaviorSubject, Observable} from "rxjs";
import {DEV_URL} from "../../../constants/url";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userData: Pick<LongUserDto, 'username' | 'email' | 'id'> = {
    username: '',
    email: '',
    id: ''
  }

  isAdmin: BehaviorSubject<boolean | null> = new BehaviorSubject<boolean | null>(null)

  constructor(private http: HttpClient) { }

  createUser(userData: LongUserDto): Observable<LongUserDto> {
    return this.http.post<LongUserDto>(`${DEV_URL}auth/users/`, userData)
  }

  loginToken(userData: ShortUserDto): Observable<UserToken> {
    return this.http.post<UserToken>(`${DEV_URL}auth/token/login/`, userData)
  }

  logoutToken(): Observable<void> {
    return this.http.post<void>(`${DEV_URL}auth/token/logout/`, {})
  }

  getUserInfo(): Observable<Pick<LongUserDto, 'username' | 'email' | 'id'>> {
    return this.http.get<Pick<LongUserDto, 'username' | 'email' | 'id'>>(`${DEV_URL}auth/users/me`)
  }

  setUserInfo(data: Pick<LongUserDto, 'username' | 'email' | 'id'>): void {
    this.isAdmin.next(data.username === 'admin');
    this.userData = {...data}
  }
}
