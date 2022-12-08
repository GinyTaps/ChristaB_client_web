import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {AuthenticationService} from "./authentication.service";

// @ts-ignore
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthenticationService,
    private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.auth.isAdmin() || (this.auth.isUser() && +localStorage.getItem('ID_User') == 7)) { // isAuthenticated()){
      return true;
      // this.router.navigate(['home']);
    } else{
      // this.router.navigate(['login']);
      return false;
    }
  }
}
