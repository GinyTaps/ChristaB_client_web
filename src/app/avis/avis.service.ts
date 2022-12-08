import { Injectable } from '@angular/core';
import {AuthenticationService} from "../authentication.service";
import {HttpClient} from "@angular/common/http";
import {Avis} from "./avis.model";
import {Observable} from "rxjs";
import {Urls} from "../urls";

@Injectable({
  providedIn: 'root'
})
export class AvisService {

  urlAll = this.urls.urlUsedAvis+'api/findAllAvis'; //this.urls.urlUsedRes+'api/findAllAvis';
  urlOne = this.urls.urlUsedAvis+'api/findAvis';

  constructor(
    private authService: AuthenticationService,
    private http: HttpClient,
    private urls: Urls
  ) { }

  /* ======================= Getting one ==================== */
  getOne(id: number): Observable<Avis> {
    return this.http.post<Avis>(this.urlOne, +id, {headers:this.authService.getHeader()});
  }

  /* ======================= Reading ==================== */
  getAll() {
    return this.http.get<Avis>(this.urlAll, {headers:this.authService.getHeader()});
  }

}
