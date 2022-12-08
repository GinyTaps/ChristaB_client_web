import { Injectable } from '@angular/core';
import {AuthenticationService} from "../authentication.service";
import {HttpClient} from "@angular/common/http";
import {Urls} from "../urls";
import {Observable} from "rxjs";
import {Avis} from "../avis/avis.model";
import {Historique} from "./historique.model";

@Injectable({
  providedIn: 'root'
})
export class HistoriqueService {
  urlAll = this.urls.urlUsedhisto+'api/findHistoriques'; //this.urls.urlUsedRes+'api/findAllAvis';
  urlOne = this.urls.urlUsedhisto+'api/findHistorique';

  constructor(
    private authService: AuthenticationService,
    private http: HttpClient,
    private urls: Urls
  ) { }

  getOne(id: number): Observable<Historique> {
    return this.http.post<Historique>(this.urlOne, +id, {headers:this.authService.getHeader()});
  }

  /* ======================= Reading ==================== */
  getAll() {
    return this.http.get<Historique>(this.urlAll, {headers:this.authService.getHeader()});
  }

}
