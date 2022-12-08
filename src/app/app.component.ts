import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "./authentication.service";
import {ActivatedRoute, Router} from "@angular/router";
import {LoginService} from "./login/login.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'ChristaB';
  isNavbarCollapsed: boolean;
  role: any;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService
  ) {
    // this.isNavbarCollapsed = true;
  }

  ngOnInit() {
    this.authService.loadToken();

  }

  isAuthenticated() {
    // console.log('*********** Connecté depuis app *********');
    return this.authService.isAdmin();
  }

  isAllowed() {
    return (this.authService.isAdmin()) || (this.authService.isUser() && +localStorage.getItem('ID_User') == 7);
  }



}
