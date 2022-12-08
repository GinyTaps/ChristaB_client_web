import { Injectable } from '@angular/core';
import {AuthenticationService} from "../authentication.service";
import {HttpClient} from "@angular/common/http";
import {Urls} from "../urls";
import {Reservation} from "./reservation.model";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private urlAllCancelled = this.urls.urlUsedRes+'api/findReservationsCancelled';

  reservation: Reservation;

  constructor(
    private authService: AuthenticationService,
    private http: HttpClient,
    private urls: Urls
  ) { }

  getAllCancelled() {
    return this.http.get<any>(this.urlAllCancelled, {headers:this.authService.getHeader()});
  }
}
