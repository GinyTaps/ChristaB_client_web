import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../authentication.service";
import {ActivatedRoute, Router} from "@angular/router";
import {LoginService} from "../login/login.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
  }

  isAuthenticated() {
    return this.authService.isAdmin();
  }

  isAllowed() {
    return (this.authService.isAdmin()) || (this.authService.isUser() && +localStorage.getItem('ID_User') == 7);
  }

}
