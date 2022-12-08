import { Component, OnInit } from '@angular/core';
import {LoginService} from "../login/login.service";
import {Router} from "@angular/router";
import {AuthenticationService} from "../authentication.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private router: Router,
    private authService: AuthenticationService
  ) {
  }

  ngOnInit(): void {
    // this.isAuthenticated();
  }

  isAuthenticated() {
    // console.log('*********** Connecté depuis navbar *********');
    return this.authService.isAdmin();
  }

  isAllowed() {
    // console.log(localStorage.getItem('ID_User'));
    return (this.authService.isAdmin()) || (this.authService.isUser() && +localStorage.getItem('ID_User') == 7);
  }

  logOut() {
    this.authService.initCredentials();
    this.loginService.idLogin = undefined;
    this.router.navigateByUrl('/').then(()=>{
      window.location.reload();
    });
    /*this.router.navigate(['/']).then((res)=>{
      window.location.reload();
    });*/
    // console.log('*********** Déconnecté depuis navbar *********');
    // return this.loginService.logout();
  }



}
