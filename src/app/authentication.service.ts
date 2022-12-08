import { Injectable } from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import {HttpHeaders} from "@angular/common/http";

// @ts-ignore
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  jwtToken: string;
  username: string;
  roles: Array<string>;

  constructor(

  ) { }


  saveToken(jwt: string) {
    if(jwt != null) {
      localStorage.setItem('Token', jwt);
      // console.log(jwt);
      this.jwtToken = jwt;
      this.parseJWT();
    }
  }


  parseJWT() {
    let jwtHelper = new JwtHelperService();
    let objWT = jwtHelper.decodeToken(this.jwtToken);
    this.username = objWT.sub; //sub représente withSubject qui est le username récupéré du côté serveur
    // console.log('****** Contenu de username: '+ this.username);
    this.roles = objWT.Roles; // Roles ici est la valeur du Claim définie du côté serveur
    // console.log('Role '+this.roles);
  }

  getHeader() {
    let header = new HttpHeaders({'Authorization': this.jwtToken});
    // console.log(this.jwtToken);
    return header;
  }

  getHeaderForTree() {
    return this.jwtToken;
  }

  getRoles() {
    // console.log(this.roles);
    return this.roles;
  }

  loadCurrentUser() {
    // console.log(this.username);
    return this.username;
  }

  isAdmin() {
    if(this.roles) {
      return this.roles.indexOf('ADMIN') >=0;
    }
  }

  isUser() {
    if(this.roles) {
      return this.roles.indexOf('USER') >= 0;
    }
    // return this.roles.includes('USER');
  }


  isAuthenticated() {
    if(this.roles) {
      return this.roles && (this.isAdmin() || this.isUser());
    }
  }

  loadToken() {
    if(localStorage.getItem('Token')!= null) {
      this.jwtToken = localStorage.getItem('Token');
      this.parseJWT();
    }
  }

  initCredentials() {
    localStorage.clear();
    /*this.jwtToken = undefined;
    this.username = undefined;
    this.roles = undefined;*/
  }
}
