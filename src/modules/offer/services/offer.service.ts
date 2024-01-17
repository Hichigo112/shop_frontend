import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {AcceptOfferDto, SendOfferDto} from "../../../dto/offer.dto";
import {HttpClient} from "@angular/common/http";
import {DEV_URL} from "../../../constants/url";

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private http: HttpClient) { }

  sendOffer(offer: SendOfferDto): Observable<AcceptOfferDto> {
    return this.http.post<AcceptOfferDto>(`${DEV_URL}offers/`, offer)
  }

  acceptOffer(id: string) : Observable<string> {
    return this.http.post<string>(`${DEV_URL}offers/accept_offer/`, {id})
  }
}
