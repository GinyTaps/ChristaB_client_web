import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthenticationService} from "../authentication.service";
import {Urls} from "../urls";
import {Depense, FilterDates} from "./depense.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DepenseService {

  urlAll = this.urls.urlUsedPaie+'api/findDecomptes';
  urlAllByUser = this.urls.urlUsedPaie+'api/findDecompteByUtilisateur';
  urlAllDates = this.urls.urlUsedPaie+'api/findDecomptesBetweenDates';
  urlAllByDateAsc = this.urls.urlUsedPaie+'api/findDecomptesByDAsc';
  urlAllByDateDesc = this.urls.urlUsedPaie+'api/findDecomptesByDDesc';
  urlAllByMtntAsc = this.urls.urlUsedPaie+'api/findDecomptesByMAsc';
  urlAllByMtntDesc = this.urls.urlUsedPaie+'api/findDecomptesByMDesc';
  urlOne = this.urls.urlUsedPaie+'api/findDecompte';
  urlCreate = this.urls.urlUsedPaie+'api/createDecompteD';
  urlUpdate = this.urls.urlUsedPaie+'api/updateDecompte';
  urlDelete = this.urls.urlUsedPaie+'api/deleteDecompte';

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService,
    private urls: Urls
  ) { }

  /* ======================= Adding ==================== */
  create(d: Depense) : Observable<Depense> {
    // console.log(e);
    const copy = this.convert(d);
    return this.http.post<Depense>(this.urlCreate, copy, {headers:this.authService.getHeader()});
  }

  /* ======================= Updating ==================== */
  update(d:Depense): Observable<Depense> {
    const copy = this.convert(d);
    return this.http.post<Depense>(this.urlUpdate, copy, {headers:this.authService.getHeader()});
  }

  /* ======================= Getting one ==================== */
  getOne(id: number): Observable<Depense> {
    return this.http.post<Depense>(this.urlOne, +id, {headers:this.authService.getHeader()});
  }

  /* ======================= Reading ==================== */
  getAll() {
    return this.http.get<Depense>(this.urlAll, {headers:this.authService.getHeader()});
  }

  /* ======================= Getting All with user and itineraire ==================== */
  getAllBetweenDates(fd: FilterDates) {
    return this.http.post<Depense>(this.urlAllDates, fd,{headers:this.authService.getHeader()});
  }

  /* ======================= Getting All by date ascendant ==================== */
  getAllByPaiementDateAsc() {
    return this.http.get<any>(this.urlAllByDateAsc, {headers:this.authService.getHeader()});
  }

  /* ======================= Getting All by date descendant ==================== */
  getAllByPaiementDateDesc() {
    return this.http.get<any>(this.urlAllByDateDesc, {headers:this.authService.getHeader()});
  }

  /* ======================= Getting All by price ascendant ==================== */
  getAllByPaiementPriceAsc() {
    return this.http.get<any>(this.urlAllByMtntAsc, {headers:this.authService.getHeader()});
  }

  /* ======================= Getting All by price descendant ==================== */
  getAllByPaiementPriceDesc() {
    return this.http.get<any>(this.urlAllByMtntDesc, {headers:this.authService.getHeader()});
  }

  /* ======================= Reading ==================== */
  getAllByUser(id: number) {
    return this.http.post<Depense>(this.urlAllByUser, +id, {headers:this.authService.getHeader()});
  }

  /* ======================= Deleting ==================== */
  delete(id:number): Observable<Depense> {
    return this.http.post<Depense>(this.urlDelete, +id, {headers:this.authService.getHeader()});
  }

  /* ======================= Converting ====================== */
  private convert(e: Depense): Depense {
    const copy: Depense = Object.assign({}, e);
    return copy;
  }

  /* =============================== Concat strings(photo engin, carte grise...) ========================= */
  private concatFile(s1: string, s2: string, s3?: string) { // '?' signifie que ce paramètre n'est pas obligatoire
    let sResult: string = null;
    if(s3 != null) {
      return sResult = s1.concat('-', s2, '-', s3);
    } else {
      return sResult = s1.concat('-', s2);
    }
  }

}
