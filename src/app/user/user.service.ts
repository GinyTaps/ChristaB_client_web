import { Injectable } from '@angular/core';
import {User} from "./user.model";
import {Observable} from "rxjs";
import {AuthenticationService} from "../authentication.service";
import {HttpClient} from "@angular/common/http";
import {Urls} from "../urls";
import {TypeFonction} from "./typeFonction.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlAll = this.urls.urlUsedRes+'api/findUtilisateurs';
  private urlOne = this.urls.urlUsedRes+'api/findUtilisateur';
  private urlOneByEmail = this.urls.urlUsedRes+'api/findUtilisateurByEmail';
  private urlCreate = this.urls.urlUsedRes+'api/createUtilisateur';
  private urlUpdate = this.urls.urlUsedRes+'api/updateUtilisateur';
  private resourceUpdateUrl = this.urls.urlUsedSec+'api/users/updateUser';
  private validateAccountUrl = this.urls.urlUsedSec+'api/users/validateAccount';
  private disableAccountUrl = this.urls.urlUsedSec+'api/users/deactivateAccount';
  public  fileUrl = this.urls.urlUsedResIm;
  // fileUrl = this.urls.urlUsedRes+'api/findPath/';
  private resourceEmailUrl = this.urls.urlUsedSec+'api/findUserByEmail';
  private resourceEmailRappelE = this.urls.urlUsedRes+'api/rappelEvalT';
  private resourceEmailRappelPr = this.urls.urlUsedRes+'api/rappelPromo';

  private urlAllTF = this.urls.urlUsedRes+'api/findTypeFonctions';
  private urlOneTF = this.urls.urlUsedRes+'api/findTypeFonction';



  user: User;

  constructor(
    private authService: AuthenticationService,
    private http: HttpClient,
    private urls: Urls
  ) { }

  ngOnInit() {
  }

  create(user: User){ // : Observable<User> {
    const copy = this.convert(user);
    return this.http.post(this.urlCreate, copy, {observe: 'response'}); // , {headers:this.authService.getHeader()});
  }

  update(user: User): Observable<User> {
    const copy = this.convert(user);
    return this.http.post<User>(this.resourceUpdateUrl, copy, {headers:this.authService.getHeader()});
  }

  editUser(user: User): Observable<User> {
    const copy = this.convert(user);
    return this.http.post<User>(this.urlUpdate, copy, {headers:this.authService.getHeader()});
  }

  getAll() {
    return this.http.get<any>(this.urlAll, {headers:this.authService.getHeader()});
  }

  getAllFonctions() {
    return this.http.get<TypeFonction>(this.urlAllTF); // pas besoin d'entête car cette ressource est accessible à tous, {headers:this.authService.getHeader()});
  }

  findFonction(id: number): Observable<TypeFonction> {
      return this.http.post<TypeFonction>(this.urlOneTF, +id, {headers:this.authService.getHeader()});
  }

  getOne(user: User): Observable<User> {
    const copy = this.convert(user);
    return this.http.post<User>(this.urlOne, copy, {headers:this.authService.getHeader()});
  }

  getById(id: number) {
    return this.http.get<User>(this.urlOne+'/'+id, {headers:this.authService.getHeader()});
  }

  getUser(email: string): Observable<User> {
    return this.http.post<User>(this.resourceEmailUrl, email, {headers:this.authService.getHeader()});
  }

  getByEmail(name: string): Observable<User> {
    return this.http.post<User>(`${this.urlOneByEmail}`, name, {headers:this.authService.getHeader()});
  }

  validated(user): Observable<User> {
    const copy = this.convert(user);
    return this.http.post<User>(this.validateAccountUrl, copy, {headers:this.authService.getHeader()});
  }

  disable(user): Observable<User> {
    const copy = this.convert(user);
    return this.http.post<User>(this.disableAccountUrl, copy, {headers:this.authService.getHeader()});
  }

  /******************** Rappel d'évaluer le dernier trajet ******************/
  sendEvalMail(messageEval: string): Observable<User> {
    return this.http.post<User>(this.resourceEmailRappelE, messageEval, {headers:this.authService.getHeader()});
  }
  /******************** Mail promotionnel ******************/
  sendPromoMail(messagePromo:string): Observable<User> {
    return this.http.post<User>(this.resourceEmailRappelPr, messagePromo, {headers:this.authService.getHeader()});
  }

  /*delete(id: number): Observable<User> {
      return this.http.delete(`${this.resourceDeleteUrl}/${Number(id)}`,{headers:this.authService.getHeader()});
  }*/

  search(motCle: string, page: number, size: number) {
    console.log(motCle);
    return this.http.get('http://localhost:8087/chercherUsers?mot =' + motCle);
  }

  private convert(user: User): User {
    const copy: User = Object.assign({}, user);
    return copy;
  }
}
