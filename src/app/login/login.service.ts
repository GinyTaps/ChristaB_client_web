import { Injectable } from '@angular/core';
import {AuthenticationService} from "../authentication.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {User} from "../user/user.model";
import {Observable} from "rxjs";
import {Urls} from "../urls";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private resourceUrl = this.urls.urlUsedSec+'login';
  private resourceRecupPassUrl = this.urls.urlUsedSec+'api/recupPassword';
  private resourceVerifCUrl = this.urls.urlUsedSec+'api/verifCode';
  private resourceReInitPassUrl = this.urls.urlUsedSec+'api/reInitPassword';

  username: string;
  user: User;
  role: Array<number> = [];
  idLogin: number;

  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthenticationService,
    private urls: Urls
    ) {

  }

  login(data) {
    return this.http.post(this.resourceUrl, data, {observe: 'response'}) ;// permet de récupérer toute la réponse à savoir l'entête, le corps
  }

  loadCurrentUserId(id: number) {
    if(id != null) {
      localStorage.setItem('ID_User', id.toString());
      this.idLogin = +localStorage.setItem('ID_User', id.toString());
    }
    return this.idLogin;
  }

  loadCurrentUserF(f: number) {
    if(f != null) {
      this.role.push(f);
      localStorage.setItem('Role', f.toString());
    }
    return this.role;
  }


  isConductor() {
    if(this.role) {
      return this.role.indexOf(1)>=0;
    }
  }
  isPassager() {
    if(this.role) {
      return this.role.indexOf(2)>=0;
    }
  }

  recupPass(email: string) {
    return this.http.post(this.resourceRecupPassUrl, email, {observe: 'response'});
  }

  verifCode(email: string, code: number) {
    return this.http.post(`${this.resourceVerifCUrl}/${code}`, email);
  }

  reInitPass(u: User) { // , c: number): Observable<User> {
    const copy = this.convert(u);
    // console.log(copy);
    return this.http.post(this.resourceReInitPassUrl, copy, {observe: 'response'});
    // return this.http.post<User>(`${this.resourceReInitPassUrl}/${c}`, copy); // , {headers:this.authService.getHeader()});
  }

  logout() {
    this.authService.initCredentials();
    this.idLogin = undefined;
    // console.log('********** Déconnecté ********');
    // this.router.navigateByUrl('/login');
    // this.router.navigate(['login']);
  }

  private convert(user: User): User {
    const copy: User = Object.assign({}, user);
    return copy;
  }

}
